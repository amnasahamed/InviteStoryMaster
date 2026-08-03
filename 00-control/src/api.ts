import type { ClientConfig, ClientSummary, TemplateInfo } from "./types";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || "Request failed");
  return data as T;
}

export const api = {
  templates: () => req<{ templates: TemplateInfo[] }>("/api/templates"),
  clients: () => req<{ clients: ClientSummary[] }>("/api/clients"),
  createClient: (body: {
    templateId: string;
    slug?: string;
    bride: string;
    groom: string;
  }) =>
    req<{ slug: string; client: ClientConfig; template: TemplateInfo }>("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  getClient: (slug: string) =>
    req<{
      slug: string;
      client: ClientConfig;
      template: TemplateInfo;
      distExists: boolean;
      distPath: string;
      projectPath: string;
      previewUrl: string | null;
    }>(`/api/clients/${slug}`),
  saveClient: (slug: string, client: ClientConfig) =>
    req<{ ok: boolean; client: ClientConfig }>(`/api/clients/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client }),
    }),
  apply: (slug: string) =>
    req<{ ok: boolean }>(`/api/clients/${slug}/apply`, { method: "POST" }),
  build: (slug: string) =>
    req<{ ok: boolean; distPath: string; log: string }>(`/api/clients/${slug}/build`, {
      method: "POST",
    }),
  preview: (slug: string) =>
    req<{ url: string; port: number }>(`/api/clients/${slug}/preview`, { method: "POST" }),
  stopPreview: (slug: string) =>
    req<{ ok: boolean }>(`/api/clients/${slug}/preview/stop`, { method: "POST" }),
  deployNotes: (slug: string) =>
    req<{
      distPath: string;
      distExists: boolean;
      netlifyDrop: string;
      checklist: string[];
      steps: string[];
    }>(`/api/clients/${slug}/deploy-notes`),
  revealDist: (slug: string) =>
    req<{ ok: boolean; distPath: string }>(`/api/clients/${slug}/reveal-dist`, {
      method: "POST",
    }),
  uploadMedia: async (slug: string, slotId: string, file: File) => {
    const form = new FormData();
    form.append("slotId", slotId);
    form.append("file", file);
    const res = await fetch(`/api/clients/${slug}/media`, { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data as { ok: boolean; relativePath: string };
  },
};
