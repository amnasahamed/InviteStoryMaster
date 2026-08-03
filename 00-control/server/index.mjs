import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  API_PORT,
  CLIENTS_DIR,
  TEMPLATES,
  getTemplate,
  templatePath,
  REPO_ROOT,
} from "./registry.mjs";
import { createDefaultClient, slugify } from "./client-model.mjs";
import { applyAdapter } from "./adapters/index.mjs";
import { getEditorSchema } from "./editor-schemas.mjs";

const execFileAsync = promisify(execFile);
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 12 * 1024 * 1024 } });

/** @type {Map<string, { port: number, child: import('node:child_process').ChildProcess }>} */
const previews = new Map();
let nextPreviewPort = 5200;

async function ensureClientsDir() {
  await fs.mkdir(CLIENTS_DIR, { recursive: true });
}

function clientDir(slug) {
  return path.join(CLIENTS_DIR, slug);
}

async function readClient(slug) {
  const file = path.join(clientDir(slug), "client.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

async function writeClient(slug, data) {
  const dir = clientDir(slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "client.json"), JSON.stringify(data, null, 2), "utf8");
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".git") continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(from, to);
    else await fs.copyFile(from, to);
  }
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "4mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, repoRoot: REPO_ROOT });
});

app.get("/api/templates", (_req, res) => {
  res.json({ templates: TEMPLATES });
});

app.get("/api/clients", async (_req, res) => {
  try {
    await ensureClientsDir();
    const names = await fs.readdir(CLIENTS_DIR);
    const clients = [];
    for (const name of names) {
      const jsonPath = path.join(CLIENTS_DIR, name, "client.json");
      if (!(await pathExists(jsonPath))) continue;
      try {
        const data = JSON.parse(await fs.readFile(jsonPath, "utf8"));
        const template = getTemplate(data.meta?.templateId);
        clients.push({
          slug: name,
          templateId: data.meta?.templateId,
          templateName: template?.name || data.meta?.templateId,
          bride: data.couple?.bride?.first,
          groom: data.couple?.groom?.first,
          dateLabel: data.timing?.dateLabel,
          lastBuild: data.lastBuild || { status: "never" },
          deferred: Boolean(template?.deferred),
        });
      } catch {
        /* skip broken */
      }
    }
    clients.sort((a, b) => a.slug.localeCompare(b.slug));
    res.json({ clients });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients", async (req, res) => {
  try {
    const { templateId, slug: rawSlug, bride, groom } = req.body || {};
    const template = getTemplate(templateId);
    if (!template) return res.status(400).json({ error: "Unknown template" });
    if (template.deferred) {
      return res.status(400).json({
        error: `${template.name} is not editable yet (hardcoded content — extract config first).`,
      });
    }

    const slug = slugify(rawSlug || `${groom}-weds-${bride}`);
    if (!slug) return res.status(400).json({ error: "Invalid slug" });

    const dest = clientDir(slug);
    if (await pathExists(dest)) {
      return res.status(409).json({ error: `Client "${slug}" already exists` });
    }

    const src = templatePath(template.folder);
    if (!(await pathExists(src))) {
      return res.status(404).json({ error: `Template folder missing: ${template.folder}` });
    }

    await ensureClientsDir();
    await copyDir(src, dest);

    const client = createDefaultClient(template, {
      slug,
      bride: bride || "Bride",
      groom: groom || "Groom",
    });
    // Align section toggles with this template's editor schema only
    const schema = getEditorSchema(template.id);
    const sections = {};
    for (const s of schema) {
      if (s.toggleKey) sections[s.toggleKey] = true;
    }
    client.sections = sections;
    await writeClient(slug, client);

    const pkgPath = path.join(dest, "package.json");
    if (await pathExists(pkgPath)) {
      const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
      pkg.name = `invite-story-${slug}`;
      await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    }

    await applyAdapter(dest, client, template);

    res.status(201).json({ slug, client, template });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.get("/api/clients/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!(await pathExists(path.join(clientDir(slug), "client.json")))) {
      return res.status(404).json({ error: "Client not found" });
    }
    const client = await readClient(slug);
    const template = getTemplate(client.meta.templateId);
    const distExists = await pathExists(path.join(clientDir(slug), "dist"));
    const preview = previews.get(slug);
    res.json({
      slug,
      client,
      template,
      distExists,
      distPath: path.join(clientDir(slug), "dist"),
      projectPath: clientDir(slug),
      previewUrl: preview ? `http://127.0.0.1:${preview.port}` : null,
    });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.put("/api/clients/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const client = req.body?.client;
    if (!client) return res.status(400).json({ error: "Missing client payload" });
    const template = getTemplate(client.meta?.templateId);
    if (!template) return res.status(400).json({ error: "Unknown template on client" });

    client.meta.slug = slug;
    await writeClient(slug, client);
    await applyAdapter(clientDir(slug), client, template);
    res.json({ ok: true, client });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients/:slug/apply", async (req, res) => {
  try {
    const slug = req.params.slug;
    const client = await readClient(slug);
    const template = getTemplate(client.meta.templateId);
    await applyAdapter(clientDir(slug), client, template);
    res.json({ ok: true, configPath: template.configPath });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients/:slug/media", upload.single("file"), async (req, res) => {
  try {
    const slug = req.params.slug;
    const slotId = req.body?.slotId;
    const client = await readClient(slug);
    const template = getTemplate(client.meta.templateId);
    const slot = template?.mediaSlots?.find((s) => s.id === slotId);
    if (!slot) return res.status(400).json({ error: "Unknown media slot" });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const dest = path.join(clientDir(slug), slot.relativePath);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, req.file.buffer);

    client.media = client.media || {};
    client.media[slotId] = slot.relativePath;
    await writeClient(slug, client);

    res.json({ ok: true, relativePath: slot.relativePath });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients/:slug/build", async (req, res) => {
  const slug = req.params.slug;
  const dir = clientDir(slug);
  try {
    const client = await readClient(slug);
    const template = getTemplate(client.meta.templateId);
    await applyAdapter(dir, client, template);

    const logs = [];
    const run = (cmd, args) =>
      new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { cwd: dir, env: process.env, shell: false });
        child.stdout.on("data", (d) => logs.push(d.toString()));
        child.stderr.on("data", (d) => logs.push(d.toString()));
        child.on("error", reject);
        child.on("close", (code) => {
          if (code === 0) resolve();
          else reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`));
        });
      });

    if (!(await pathExists(path.join(dir, "node_modules")))) {
      await run("npm", ["install"]);
    }
    await run("npm", ["run", "build"]);

    const logText = logs.join("");
    client.lastBuild = {
      status: "ok",
      at: new Date().toISOString(),
      log: logText.slice(-12000),
    };
    await writeClient(slug, client);

    res.json({
      ok: true,
      distPath: path.join(dir, "dist"),
      log: client.lastBuild.log,
    });
  } catch (err) {
    try {
      const client = await readClient(slug);
      client.lastBuild = {
        status: "error",
        at: new Date().toISOString(),
        log: String(err.message || err),
      };
      await writeClient(slug, client);
    } catch {
      /* ignore */
    }
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients/:slug/preview", async (req, res) => {
  try {
    const slug = req.params.slug;
    const dir = clientDir(slug);
    if (previews.has(slug)) {
      const existing = previews.get(slug);
      return res.json({ url: `http://127.0.0.1:${existing.port}`, port: existing.port });
    }

    const client = await readClient(slug);
    const template = getTemplate(client.meta.templateId);
    await applyAdapter(dir, client, template);

    if (!(await pathExists(path.join(dir, "node_modules")))) {
      await execFileAsync("npm", ["install"], { cwd: dir });
    }

    const port = nextPreviewPort++;
    const child = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)], {
      cwd: dir,
      env: process.env,
      shell: false,
      detached: false,
    });
    previews.set(slug, { port, child });
    child.on("exit", () => previews.delete(slug));

    // Give Vite a moment to boot
    await new Promise((r) => setTimeout(r, 2500));
    res.json({ url: `http://127.0.0.1:${port}`, port });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients/:slug/preview/stop", async (req, res) => {
  const slug = req.params.slug;
  const existing = previews.get(slug);
  if (existing) {
    existing.child.kill("SIGTERM");
    previews.delete(slug);
  }
  res.json({ ok: true });
});

app.get("/api/clients/:slug/deploy-notes", async (req, res) => {
  try {
    const slug = req.params.slug;
    const dir = clientDir(slug);
    const distPath = path.join(dir, "dist");
    const distExists = await pathExists(distPath);
    res.json({
      distPath,
      distExists,
      netlifyDrop: "https://app.netlify.com/drop",
      checklist: [
        "Names render everywhere (hero, footer, calendar text)",
        "Countdown counts down to the right date/time (+05:30)",
        "Add-to-Calendar opens the correct Google Calendar event",
        "Open-in-Maps opens the right venue",
        "Footer Instagram link opens @invitestory.in",
        "No RSVP section",
        "No separate Mehndi / Haldi / Reception events",
        "Mobile preview on a real phone",
      ],
      steps: [
        "Apply + Build from the Control Centre",
        "Reveal the dist folder in Finder",
        "Drag dist onto Netlify Drop",
        "Share the Netlify URL with the couple",
      ],
    });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.post("/api/clients/:slug/reveal-dist", async (req, res) => {
  try {
    const slug = req.params.slug;
    const distPath = path.join(clientDir(slug), "dist");
    if (!(await pathExists(distPath))) {
      return res.status(404).json({ error: "dist/ not found — build first" });
    }
    if (process.platform === "darwin") {
      spawn("open", [distPath], { detached: true, stdio: "ignore" }).unref();
    } else if (process.platform === "win32") {
      spawn("explorer", [distPath], { detached: true, stdio: "ignore" }).unref();
    } else {
      spawn("xdg-open", [distPath], { detached: true, stdio: "ignore" }).unref();
    }
    res.json({ ok: true, distPath });
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

await ensureClientsDir();
app.listen(API_PORT, "127.0.0.1", () => {
  console.log(`InviteStory Control API → http://127.0.0.1:${API_PORT}`);
  console.log(`Clients folder → ${CLIENTS_DIR}`);
});
