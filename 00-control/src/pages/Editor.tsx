import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FloppyDisk,
  Hammer,
  Play,
  UploadSimple,
  FolderOpen,
  ArrowSquareOut,
  MapPin,
  CheckCircle,
} from "@phosphor-icons/react";
import { api } from "../api";
import { parseMapsLink } from "../lib/maps";
import type {
  ClientConfig,
  EditorField,
  EditorSection,
  MediaSlot,
  TemplateInfo,
} from "../types";

type TopTab = "edit" | "preview" | "build";

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function setByPath(obj: ClientConfig, path: string, value: unknown): ClientConfig {
  const next = structuredClone(obj);
  const parts = path.split(".");
  let cur: Record<string, unknown> = next as unknown as Record<string, unknown>;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (cur[key] == null || typeof cur[key] !== "object") cur[key] = {};
    cur = cur[key] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
  return next;
}

export default function Editor() {
  const { slug = "" } = useParams();
  const [topTab, setTopTab] = useState<TopTab>("edit");
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [client, setClient] = useState<ClientConfig | null>(null);
  const [template, setTemplate] = useState<TemplateInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [distPath, setDistPath] = useState("");
  const [projectPath, setProjectPath] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [buildLog, setBuildLog] = useState("");
  const [notes, setNotes] = useState<{
    checklist: string[];
    steps: string[];
    netlifyDrop: string;
    distExists: boolean;
  } | null>(null);

  const sections = template?.editorSections || [];

  const load = useCallback(async () => {
    const data = await api.getClient(slug);
    setClient(data.client);
    setTemplate(data.template);
    setPreviewUrl(data.previewUrl);
    setDistPath(data.distPath);
    setProjectPath(data.projectPath);
    setBuildLog(data.client.lastBuild?.log || "");
    const first = data.template.editorSections?.[0]?.id;
    setActiveSectionId((prev) => prev || first || "");
  }, [slug]);

  useEffect(() => {
    load().catch((e) => setError(e.message));
    api.deployNotes(slug).then(setNotes).catch(() => undefined);
  }, [load, slug]);

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId) || sections[0],
    [sections, activeSectionId],
  );

  async function save() {
    if (!client) return;
    setBusy("save");
    setError("");
    setMessage("");
    try {
      const res = await api.saveClient(slug, client);
      setClient(res.client);
      setMessage("Saved and applied to template.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  }

  async function runBuild() {
    setBusy("build");
    setError("");
    setMessage("");
    try {
      if (client) await api.saveClient(slug, client);
      const res = await api.build(slug);
      setBuildLog(res.log || "");
      setDistPath(res.distPath);
      setMessage("Build succeeded — ready for Netlify Drop.");
      setNotes(await api.deployNotes(slug));
      setTopTab("build");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
      load().catch(() => undefined);
    }
  }

  async function startPreview() {
    setBusy("preview");
    setError("");
    try {
      if (client) await api.saveClient(slug, client);
      const res = await api.preview(slug);
      setPreviewUrl(res.url);
      setTopTab("preview");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  }

  if (!client || !template) {
    return <p className="text-sm text-muted">{error || "Loading…"}</p>;
  }

  if (!sections.length) {
    return (
      <div className="card mx-auto max-w-lg p-6">
        <p className="text-lg font-semibold">{template.name}</p>
        <p className="mt-2 text-sm text-muted">No editor schema for this template yet.</p>
        <Link to="/" className="btn-secondary mt-4">
          Back to clients
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/" className="btn-ghost !px-0 !py-0 text-xs">
        <ArrowLeft className="h-3.5 w-3.5" /> Clients
      </Link>

      <div className="mt-2 mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 2–4</p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-ink">
            {client.couple.groom.first} & {client.couple.bride.first}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {template.name} · {sections.length} sections · <code className="text-xs">{slug}</code>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={save} disabled={!!busy} className="btn-primary">
            <FloppyDisk weight="bold" className="h-4 w-4" />
            {busy === "save" ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={startPreview} disabled={!!busy} className="btn-secondary">
            <Play weight="fill" className="h-4 w-4" />
            Preview
          </button>
          <button type="button" onClick={runBuild} disabled={!!busy} className="btn-success">
            <Hammer weight="bold" className="h-4 w-4" />
            {busy === "build" ? "Building…" : "Build"}
          </button>
        </div>
      </div>

      {(message || error) && (
        <div
          className={`mb-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
            error
              ? "border-danger/20 bg-danger-soft text-danger"
              : "border-success/20 bg-success-soft text-success"
          }`}
        >
          {!error && <CheckCircle weight="fill" className="h-4 w-4 shrink-0" />}
          {error || message}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-1 rounded-lg border border-line bg-panel p-1 shadow-card">
        {(
          [
            { id: "edit", label: "1. Edit sections" },
            { id: "preview", label: "2. Preview" },
            { id: "build", label: "3. Build & deploy" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTopTab(t.id)}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              topTab === t.id
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:bg-canvas hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {topTab === "edit" && (
        <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
          <aside className="card h-fit p-2">
            <p className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Template sections
            </p>
            <ul className="space-y-0.5">
              {sections.map((s, idx) => {
                const on = !s.toggleKey || client.sections?.[s.toggleKey] !== false;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActiveSectionId(s.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition ${
                        activeSection?.id === s.id
                          ? "bg-primary-soft text-primary"
                          : "text-ink/80 hover:bg-canvas"
                      }`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-canvas text-[10px] font-bold text-muted">
                        {idx + 1}
                      </span>
                      <span className="flex-1 truncate">{s.label}</span>
                      {s.toggleKey && !s.alwaysOn && (
                        <span
                          className={`h-2 w-2 rounded-full ${on ? "bg-success" : "bg-line"}`}
                          title={on ? "On" : "Off"}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {activeSection && (
            <SectionEditor
              section={activeSection}
              client={client}
              setClient={setClient}
              template={template}
              slug={slug}
              onUploaded={() => setMessage("Image uploaded.")}
              onError={setError}
            />
          )}
        </div>
      )}

      {topTab === "preview" && (
        <div className="card space-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-ink">Live preview</h2>
              <p className="text-sm text-muted">Saves first, then starts a local Vite server.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={startPreview} disabled={!!busy} className="btn-primary">
                <Play weight="fill" className="h-4 w-4" />
                {busy === "preview" ? "Starting…" : previewUrl ? "Restart preview" : "Start preview"}
              </button>
              {previewUrl && (
                <a href={previewUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                  Open in new tab <ArrowSquareOut className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {previewUrl ? (
            <iframe
              title="preview"
              src={previewUrl}
              className="h-[70vh] w-full rounded-lg border border-line bg-white"
            />
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-canvas px-4 py-12 text-center text-sm text-muted">
              Click <strong className="text-ink">Start preview</strong> to open this invite.
            </div>
          )}
        </div>
      )}

      {topTab === "build" && (
        <BuildPanel
          slug={slug}
          distPath={distPath}
          projectPath={projectPath}
          buildLog={buildLog}
          notes={notes}
          busy={busy}
          onBuild={runBuild}
          onReveal={async () => {
            try {
              await api.revealDist(slug);
              setMessage("Opened dist folder.");
            } catch (e) {
              setError(e instanceof Error ? e.message : String(e));
            }
          }}
        />
      )}
    </div>
  );
}

function SectionEditor({
  section,
  client,
  setClient,
  template,
  slug,
  onUploaded,
  onError,
}: {
  section: EditorSection;
  client: ClientConfig;
  setClient: (c: ClientConfig) => void;
  template: TemplateInfo;
  slug: string;
  onUploaded: () => void;
  onError: (m: string) => void;
}) {
  const enabled = !section.toggleKey || client.sections?.[section.toggleKey] !== false;
  const slots = (section.mediaSlotIds || [])
    .map((id) => template.mediaSlots.find((s) => s.id === id))
    .filter(Boolean) as MediaSlot[];

  return (
    <section className="card p-4 md:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
        <div>
          <h2 className="text-lg font-semibold text-ink">{section.label}</h2>
          {section.description && (
            <p className="mt-1 text-sm text-muted">{section.description}</p>
          )}
        </div>
        {section.toggleKey && !section.alwaysOn && (
          <label className="flex items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-sm font-medium">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={enabled}
              onChange={(e) => {
                const next = structuredClone(client);
                next.sections = {
                  ...next.sections,
                  [section.toggleKey!]: e.target.checked,
                };
                setClient(next);
              }}
            />
            Show on invite
          </label>
        )}
      </div>

      {!enabled ? (
        <p className="rounded-lg border border-dashed border-line bg-canvas px-3 py-8 text-center text-sm text-muted">
          Section is hidden. Turn on <strong>Show on invite</strong> to edit it.
        </p>
      ) : (
        <div className="space-y-5">
          {(section.kind === "fields" || !section.kind) && (
            <FieldsBlock fields={section.fields || []} client={client} setClient={setClient} />
          )}
          {section.kind === "story" && <StoryBlock client={client} setClient={setClient} />}
          {section.kind === "events" && (
            <>
              <FieldsBlock fields={section.fields || []} client={client} setClient={setClient} />
              <EventsBlock client={client} setClient={setClient} />
            </>
          )}
          {section.kind === "contacts" && <ContactsBlock client={client} setClient={setClient} />}
          {(section.kind === "media" || slots.length > 0) && (
            <MediaBlock slots={slots} slug={slug} onUploaded={onUploaded} onError={onError} />
          )}
        </div>
      )}
    </section>
  );
}

function MapsPasteField({
  client,
  setClient,
}: {
  client: ClientConfig;
  setClient: (c: ClientConfig) => void;
}) {
  const [draft, setDraft] = useState(client.venue.mapsUrl || client.venue.mapQuery || "");
  const [status, setStatus] = useState("");

  function apply(raw: string) {
    setDraft(raw);
    const parsed = parseMapsLink(raw);
    if (!parsed) {
      setStatus("");
      return;
    }
    const next = structuredClone(client);
    next.venue.mapQuery = parsed.mapQuery;
    next.venue.mapsUrl = parsed.mapsUrl;
    if (parsed.lat != null) next.venue.lat = parsed.lat;
    if (parsed.lng != null) next.venue.lng = parsed.lng;
    setClient(next);
    setStatus(
      parsed.lat != null
        ? `Parsed · ${parsed.mapQuery} · ${parsed.lat.toFixed(5)}, ${parsed.lng!.toFixed(5)}`
        : `Parsed · ${parsed.mapQuery}`,
    );
  }

  return (
    <div className="sm:col-span-2 rounded-lg border border-primary/20 bg-primary-soft/50 p-3">
      <label className="block">
        <span className="field-label inline-flex items-center gap-1.5">
          <MapPin weight="fill" className="h-3.5 w-3.5 text-primary" />
          Google Maps link
        </span>
        <input
          className="field-input"
          value={draft}
          placeholder="Paste Google Maps URL here…"
          onChange={(e) => apply(e.target.value)}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text");
            if (text) {
              e.preventDefault();
              apply(text);
            }
          }}
        />
      </label>
      <p className="mt-1.5 text-xs text-muted">
        Paste a full Maps URL, directions link, or place name. We fill query
        {client.venue.lat != null ? " + coordinates" : ""}.
      </p>
      {status && <p className="mt-1 text-xs font-medium text-primary">{status}</p>}
      {client.venue.mapQuery && (
        <p className="mt-1 truncate text-xs text-muted">
          Stored query: <span className="text-ink">{client.venue.mapQuery}</span>
        </p>
      )}
    </div>
  );
}

function FieldsBlock({
  fields,
  client,
  setClient,
}: {
  fields: EditorField[];
  client: ClientConfig;
  setClient: (c: ClientConfig) => void;
}) {
  if (!fields.length) return null;

  // Avoid duplicate lat/lng when maps paste already handles coords — still show them for fine-tune
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((f) => {
        if (f.type === "maps" || f.path === "venue.mapQuery") {
          return <MapsPasteField key={f.path} client={client} setClient={setClient} />;
        }
        const raw = getByPath(client, f.path);
        const value = raw == null ? "" : String(raw);
        const isArea = f.type === "textarea";
        return (
          <label key={f.path} className={isArea ? "sm:col-span-2 block" : "block"}>
            <span className="field-label">{f.label}</span>
            {isArea ? (
              <textarea
                className="field-input min-h-[80px]"
                value={value}
                onChange={(e) => setClient(setByPath(client, f.path, e.target.value))}
              />
            ) : (
              <input
                className="field-input"
                value={value}
                type={f.type === "number" ? "number" : "text"}
                onChange={(e) =>
                  setClient(
                    setByPath(
                      client,
                      f.path,
                      f.type === "number" ? Number(e.target.value) || 0 : e.target.value,
                    ),
                  )
                }
              />
            )}
            {f.hint && <p className="mt-1 text-xs text-muted">{f.hint}</p>}
          </label>
        );
      })}
    </div>
  );
}

function StoryBlock({
  client,
  setClient,
}: {
  client: ClientConfig;
  setClient: (c: ClientConfig) => void;
}) {
  const items = client.story || [];
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-line bg-canvas/60 p-3">
          <p className="mb-2 text-xs font-semibold text-muted">Milestone {i + 1}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <MiniField
              label="Year / date"
              value={item.year || item.date || ""}
              onChange={(v) => {
                const next = structuredClone(client);
                if (!next.story) next.story = [];
                next.story[i] = { ...next.story[i], year: v, date: v };
                setClient(next);
              }}
            />
            <MiniField
              label="Title"
              value={item.title}
              onChange={(v) => {
                const next = structuredClone(client);
                if (!next.story) next.story = [];
                next.story[i] = { ...next.story[i], title: v };
                setClient(next);
              }}
            />
            <label className="sm:col-span-2 block">
              <span className="field-label">Text</span>
              <textarea
                className="field-input min-h-[72px]"
                value={item.text}
                onChange={(e) => {
                  const next = structuredClone(client);
                  if (!next.story) next.story = [];
                  next.story[i] = { ...next.story[i], text: e.target.value };
                  setClient(next);
                }}
              />
            </label>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn-secondary !text-xs"
        onClick={() => {
          const next = structuredClone(client);
          next.story = [...(next.story || []), { year: "", title: "New chapter", text: "" }];
          setClient(next);
        }}
      >
        Add milestone
      </button>
    </div>
  );
}

function EventsBlock({
  client,
  setClient,
}: {
  client: ClientConfig;
  setClient: (c: ClientConfig) => void;
}) {
  const events = client.events || [];
  return (
    <div className="space-y-3">
      {events.map((ev, i) => (
        <div key={ev.id || i} className="rounded-lg border border-line bg-canvas/60 p-3">
          <p className="mb-2 text-xs font-semibold text-muted">Event {i + 1}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <MiniField
              label="Name"
              value={ev.name}
              onChange={(v) => {
                const next = structuredClone(client);
                if (!next.events) next.events = [];
                next.events[i] = { ...next.events[i], name: v };
                setClient(next);
              }}
            />
            <MiniField
              label="Start ISO"
              value={ev.startISO}
              onChange={(v) => {
                const next = structuredClone(client);
                if (!next.events) next.events = [];
                next.events[i] = { ...next.events[i], startISO: v };
                setClient(next);
              }}
            />
            <MiniField
              label="Dress code"
              value={ev.dressCode || ""}
              onChange={(v) => {
                const next = structuredClone(client);
                if (!next.events) next.events = [];
                next.events[i] = { ...next.events[i], dressCode: v };
                setClient(next);
              }}
            />
            <MiniField
              label="Venue"
              value={ev.venue || ""}
              onChange={(v) => {
                const next = structuredClone(client);
                if (!next.events) next.events = [];
                next.events[i] = { ...next.events[i], venue: v };
                setClient(next);
              }}
            />
            <label className="sm:col-span-2 block">
              <span className="field-label">Note</span>
              <textarea
                className="field-input min-h-[64px]"
                value={ev.note || ""}
                onChange={(e) => {
                  const next = structuredClone(client);
                  if (!next.events) next.events = [];
                  next.events[i] = { ...next.events[i], note: e.target.value };
                  setClient(next);
                }}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactsBlock({
  client,
  setClient,
}: {
  client: ClientConfig;
  setClient: (c: ClientConfig) => void;
}) {
  const contacts = client.contacts || [];
  return (
    <div className="space-y-3">
      {contacts.map((c, i) => (
        <div key={i} className="grid gap-2 rounded-lg border border-line bg-canvas/60 p-3 sm:grid-cols-3">
          <MiniField
            label="Name"
            value={c.name}
            onChange={(v) => {
              const next = structuredClone(client);
              if (!next.contacts) next.contacts = [];
              next.contacts[i] = { ...next.contacts[i], name: v };
              setClient(next);
            }}
          />
          <MiniField
            label="Role"
            value={c.role || ""}
            onChange={(v) => {
              const next = structuredClone(client);
              if (!next.contacts) next.contacts = [];
              next.contacts[i] = { ...next.contacts[i], role: v };
              setClient(next);
            }}
          />
          <MiniField
            label="Phone"
            value={c.phone}
            onChange={(v) => {
              const next = structuredClone(client);
              if (!next.contacts) next.contacts = [];
              next.contacts[i] = { ...next.contacts[i], phone: v };
              setClient(next);
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className="btn-secondary !text-xs"
        onClick={() => {
          const next = structuredClone(client);
          next.contacts = [...(next.contacts || []), { name: "", role: "", phone: "" }];
          setClient(next);
        }}
      >
        Add contact
      </button>
    </div>
  );
}

function MediaBlock({
  slots,
  slug,
  onUploaded,
  onError,
}: {
  slots: MediaSlot[];
  slug: string;
  onUploaded: () => void;
  onError: (m: string) => void;
}) {
  if (!slots.length) {
    return <p className="text-sm text-muted">No image slots on this section.</p>;
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {slots.map((slot) => (
        <li key={slot.id} className="rounded-lg border border-line bg-canvas/60 p-3">
          <p className="text-sm font-semibold text-ink">{slot.label}</p>
          <p className="mt-0.5 truncate text-xs text-muted">{slot.relativePath}</p>
          <label className="btn-secondary mt-3 !text-xs">
            <UploadSimple className="h-4 w-4" />
            Upload image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  await api.uploadMedia(slug, slot.id, file);
                  onUploaded();
                } catch (err) {
                  onError(err instanceof Error ? err.message : String(err));
                }
              }}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}

function BuildPanel({
  slug,
  distPath,
  projectPath,
  buildLog,
  notes,
  busy,
  onBuild,
  onReveal,
}: {
  slug: string;
  distPath: string;
  projectPath: string;
  buildLog: string;
  notes: {
    checklist: string[];
    steps: string[];
    netlifyDrop: string;
    distExists: boolean;
  } | null;
  busy: string;
  onBuild: () => void;
  onReveal: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-ink">Build for deploy</h2>
          <p className="mt-1 text-sm text-muted">
            Applies config, installs if needed, then builds <code className="text-xs">dist/</code>.
          </p>
          <p className="mt-3 break-all text-xs text-muted">{projectPath}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={onBuild} disabled={!!busy} className="btn-success">
              <Hammer weight="bold" className="h-4 w-4" />
              {busy === "build" ? "Building…" : "Build now"}
            </button>
            <button type="button" onClick={onReveal} className="btn-secondary">
              <FolderOpen className="h-4 w-4" />
              Reveal dist
            </button>
            {notes && (
              <a href={notes.netlifyDrop} target="_blank" rel="noreferrer" className="btn-primary">
                Open Netlify Drop <ArrowSquareOut className="h-4 w-4" />
              </a>
            )}
          </div>
          <p className="mt-3 break-all text-xs text-muted">dist → {distPath}</p>
        </div>
        <pre className="max-h-80 overflow-auto rounded-xl border border-line bg-ink p-4 text-[11px] text-gray-300">
          {buildLog || "Build log will appear here."}
        </pre>
      </div>
      <div className="space-y-4">
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-ink">Deploy flow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
            {(notes?.steps || []).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-ink">QA checklist</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {(notes?.checklist || []).map((s) => (
              <li key={s} className="flex gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">Slug: {slug}</p>
        </div>
      </div>
    </div>
  );
}

function MiniField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input className="field-input" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
