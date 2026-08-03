import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { api } from "../api";
import type { TemplateInfo } from "../types";

export default function NewClient() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.templates().then((d) => {
      setTemplates(d.templates);
      const first = d.templates.find((t) => !t.deferred);
      if (first) setTemplateId(first.id);
    });
  }, []);

  const selected = useMemo(
    () => templates.find((t) => t.id === templateId),
    [templates, templateId],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await api.createClient({
        templateId,
        bride,
        groom,
        slug: slug || undefined,
      });
      navigate(`/client/${res.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/" className="btn-ghost !px-0">
        <ArrowLeft className="h-4 w-4" /> Back to clients
      </Link>

      <header className="mt-3 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step 1 of 4</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">Create client</h1>
        <p className="mt-1 text-sm text-muted">
          Choose a template and couple names. You can edit every section next.
        </p>
      </header>

      <form onSubmit={onSubmit} className="card space-y-5 p-5 md:p-6">
        <label className="block">
          <span className="field-label">Template</span>
          <select
            className="field-input"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id} disabled={t.deferred}>
                {t.name}
                {t.deferred ? " (coming soon)" : ""}
              </option>
            ))}
          </select>
          {selected && (
            <p className="mt-1.5 text-xs text-muted">
              {selected.highlight}
              {!selected.deferred &&
                ` · ${(selected.editorSections || []).length} sections`}
            </p>
          )}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Groom</span>
            <input className="field-input" value={groom} onChange={(e) => setGroom(e.target.value)} required />
          </label>
          <label className="block">
            <span className="field-label">Bride</span>
            <input className="field-input" value={bride} onChange={(e) => setBride(e.target.value)} required />
          </label>
        </div>

        <label className="block">
          <span className="field-label">Slug (optional)</span>
          <input
            className="field-input"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="arjun-weds-ananya"
          />
          <p className="mt-1 text-xs text-muted">Folder name under clients/. Auto-generated if blank.</p>
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end border-t border-line pt-4">
          <button
            type="submit"
            disabled={busy || !templateId || selected?.deferred}
            className="btn-primary"
          >
            {busy ? "Creating…" : "Create & open editor"}
          </button>
        </div>
      </form>
    </div>
  );
}
