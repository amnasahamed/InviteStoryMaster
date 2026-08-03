import { NavLink, Outlet } from "react-router-dom";
import { House, PlusCircle } from "@phosphor-icons/react";

export default function Layout() {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-line bg-panel md:min-h-screen md:border-b-0 md:border-r">
        <div className="border-b border-line px-4 py-4">
          <p className="text-sm font-bold tracking-tight text-ink">InviteStory</p>
          <p className="text-xs text-muted">Control Centre</p>
        </div>
        <nav className="flex gap-1 p-2 md:flex-col">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-soft text-primary"
                  : "text-muted hover:bg-canvas hover:text-ink"
              }`
            }
          >
            <House weight="bold" className="h-4 w-4" />
            Clients
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-soft text-primary"
                  : "text-muted hover:bg-canvas hover:text-ink"
              }`
            }
          >
            <PlusCircle weight="bold" className="h-4 w-4" />
            New client
          </NavLink>
        </nav>
        <div className="mt-auto hidden px-4 py-4 text-[11px] text-muted md:block">
          Local only · 127.0.0.1
        </div>
      </aside>
      <main className="min-w-0 px-4 py-6 md:px-8 md:py-7">
        <Outlet />
      </main>
    </div>
  );
}
