import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import {
  wedding,
  googleCalendarUrl,
  downloadICS,
  mapsDirectionsUrl,
} from "../config";

export default function Venue() {
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <SectionHeading kicker="Where and when" title="The Venue" />

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-glow-gold">
            {wedding.venue.name}
          </h3>
          <p className="flex items-center gap-2 text-[13px] text-pearl/70">
            <MapPin size={14} className="text-glow-warm" />
            {wedding.venue.address}
          </p>
          <p className="font-display mt-1 text-sm tracking-wide text-pearl/60">
            {wedding.dateLabel}, {wedding.timeLabel}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-64 items-end overflow-hidden rounded-[2rem] border border-moon/20 shadow-[0_18px_60px_rgba(0,0,0,0.4)] sm:h-72"
            aria-label={`Open directions to ${wedding.venue.name}`}
          >
            <img
              src={wedding.assets.environment}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="relative flex w-full items-end justify-between gap-4 p-6">
              <div>
                <p className="font-display text-2xl text-pearl">
                  {wedding.venue.landmark}
                </p>
                <p className="mt-1 text-xs text-pearl/60">
                  {wedding.venue.directionHint}
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-moon/30 bg-ink/45 text-lotus-light backdrop-blur-md">
                <Navigation size={16} />
              </span>
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.14} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-glow-gold/40 bg-glow-gold/10 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-glow-gold transition-colors hover:bg-glow-gold/20"
          >
            <CalendarPlus size={14} /> Google Calendar
          </a>
          <button
            type="button"
            onClick={downloadICS}
            className="flex items-center justify-center gap-2 rounded-full border border-glow-gold/40 bg-glow-gold/10 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-glow-gold transition-colors hover:bg-glow-gold/20"
          >
            <CalendarPlus size={14} /> Download .ics
          </button>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-moon/20 bg-night/45 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-pearl/85 transition-colors duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:border-lotus-light/45 hover:text-lotus-light sm:col-span-2"
          >
            <Navigation size={14} /> Open in Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
