import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlusCircle, WarningCircle } from "@phosphor-icons/react";
import { api } from "../api";
import type { ClientSummary } from "../types";

export default function Dashboard() {
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .clients()
      .then((d) => setClients(d.clients))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Clients</h1>
          <p className="mt-1 text-sm text-muted">
            1. Create → 2. Edit sections → 3. Preview → 4. Build & deploy
          </p>
        </div>
        <Link to="/new" className="btn-primary">
          <PlusCircle weight="bold" className="h-4 w-4" />
          New client
        </Link>
      </header>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-danger/20 bg-danger-soft px-3 py-2 text-sm text-danger">
          <WarningCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : clients.length === 0 ? (
        <div className="card px-6 py-14 text-center">
          <p className="text-lg font-semibold text-ink">No clients yet</p>
          <p className="mt-1 text-sm text-muted">Create a couple project from a template to start.</p>
          <Link to="/new" className="btn-primary mt-6">
            Create client <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-canvas text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Couple</th>
                <th className="hidden px-4 py-3 sm:table-cell">Template</th>
                <th className="hidden px-4 py-3 md:table-cell">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.slug} className="border-b border-line last:border-0 hover:bg-canvas/70">
                  <td className="px-4 py-3">
                    <Link to={`/client/${c.slug}`} className="font-semibold text-ink hover:text-primary">
                      {c.groom} & {c.bride}
                    </Link>
                    <p className="text-xs text-muted">{c.slug}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-muted sm:table-cell">{c.templateName}</td>
                  <td className="hidden px-4 py-3 text-muted md:table-cell">{c.dateLabel || "—"}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={c.lastBuild?.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/client/${c.slug}`} className="btn-secondary !py-1.5 !text-xs">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status?: string }) {
  if (status === "ok") {
    return (
      <span className="inline-flex rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
        Built
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="inline-flex rounded-full bg-danger-soft px-2.5 py-1 text-[11px] font-semibold text-danger">
        Build error
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-canvas px-2.5 py-1 text-[11px] font-semibold text-muted">
      Draft
    </span>
  );
}
