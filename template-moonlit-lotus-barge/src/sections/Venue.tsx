import { CalendarPlus, Navigation } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import {
  wedding,
  googleCalendarUrl,
  downloadICS,
  mapsDirectionsUrl,
} from "../config";

export default function Venue() {
  return (
    <section className="night-section relative overflow-hidden px-6 py-28 sm:py-40">
      <SectionHeading kicker="Where and when" title="Meet us by the water" />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.78fr_1.22fr] md:items-end">
        <Reveal className="flex flex-col items-start gap-3 text-left md:pb-4">
          <p className="section-kicker">Lake Pichola · Udaipur</p>
          <h3 className="font-display text-5xl leading-none text-pearl sm:text-6xl">
            {wedding.venue.name}
          </h3>
          <p className="max-w-xs text-[13px] leading-relaxed text-pearl/60">
            {wedding.venue.address}
          </p>
          <p className="font-display mt-3 text-lg tracking-wide text-champagne">
            {wedding.dateLabel}, {wedding.timeLabel}
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className="text-link flex items-center gap-2"><CalendarPlus size={13}/> Add to calendar</a>
            <button type="button" onClick={downloadICS} className="text-link">Download .ics</button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-[25rem] items-end overflow-hidden border border-champagne/20 shadow-[0_28px_80px_rgba(0,0,0,0.4)]"
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
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/30 bg-ink/55 text-champagne backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                <Navigation size={16} />
              </span>
            </div>
          </a>
        </Reveal>

      </div>
    </section>
  );
}
