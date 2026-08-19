import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal from "../components/Reveal";
import {
  wedding,
  googleCalendarUrl,
  downloadICS,
  mapsEmbedUrl,
  mapsDirectionsUrl,
} from "../config";

export default function Venue() {
  return (
    <section className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#f2c4d0]/70">
          Where & when
        </span>
        <h2 className="font-script text-5xl text-[#faf3eb] sm:text-6xl">The Venue</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#c9a86a]/50 to-transparent" />
      </Reveal>

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-[#faf3eb]">{wedding.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-[#e8dcc8]/75">
            <MapPin size={14} className="text-[#c45a7a]" />
            {wedding.venue.address}
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-[#f2c4d0]/15"
        >
          <iframe
            title="Wedding venue map"
            src={mapsEmbedUrl}
            className="h-64 w-full saturate-[0.8] contrast-[1.05] sm:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <Reveal delay={0.12} className="grid grid-cols-1 gap-3">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#c45a7a] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#faf3eb] shadow-[0_14px_36px_rgba(196,90,122,0.35)] transition-transform duration-500 ease-out active:scale-[0.98]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              style={{ animation: "sweep 3.6s ease-in-out infinite" }}
            />
            <Navigation size={15} />
            Get directions
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
              ↗
            </span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#f2c4d0]/20 bg-white/[0.04] px-4 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#faf3eb] transition-colors duration-300 hover:border-[#f2c4d0]/40 hover:bg-white/[0.08]"
            >
              <CalendarPlus size={14} /> Google
            </a>
            <button
              type="button"
              onClick={downloadICS}
              className="flex items-center justify-center gap-2 rounded-full border border-[#f2c4d0]/20 bg-white/[0.04] px-4 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#faf3eb] transition-colors duration-300 hover:border-[#f2c4d0]/40 hover:bg-white/[0.08]"
            >
              <CalendarPlus size={14} /> Apple / ICS
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
