import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
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
      <SectionHeading kicker="Where & When" title="The Venue" />

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-glow-gold">
            {wedding.venue.name}
          </h3>
          <p className="flex items-center gap-2 text-[13px] text-[#f7e9d2]/70">
            <MapPin size={14} className="text-glow-warm" />
            {wedding.venue.address}
          </p>
          <p className="font-display mt-1 text-sm tracking-wide text-[#f7e9d2]/60">
            {wedding.dateLabel} · {wedding.timeLabel}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[1.75rem] border border-glow-gold/30 shadow-[0_10px_50px_rgba(0,0,0,0.45)]">
            <iframe
              title="Wedding venue map"
              src={mapsEmbedUrl}
              className="h-64 w-full grayscale-[20%] contrast-[1.05] sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-[#f7e9d2]/85 transition-colors hover:border-glow-gold/40 hover:text-glow-gold sm:col-span-2"
          >
            <Navigation size={14} /> Open in Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
