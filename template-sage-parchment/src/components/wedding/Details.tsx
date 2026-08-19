import { CalendarPlus, Clock, MapPin, Shirt } from "lucide-react";
import jaali from "@/assets/jaali.jpg";
import { invitation } from "@/config/invitation";
import { directionsUrl, googleCalendarUrl } from "@/lib/wedding";
import { Reveal } from "./Reveal";

export function Details() {
  const { event, venue } = invitation;

  return (
    <section className="relative overflow-hidden px-5 py-20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: `url(${jaali})`, backgroundSize: "260px" }}
      />
      <div aria-hidden className="absolute inset-0 bg-parchment/70" />

      <Reveal className="relative mx-auto max-w-md">
        <div className="relative rounded-t-[9rem] border border-gold/50 bg-parchment px-7 pt-16 pb-10 text-center shadow-[0_30px_60px_-45px_var(--color-ink)] paper-grain">
          <div className="pointer-events-none absolute inset-x-3 top-3 bottom-3 rounded-t-[8.4rem] border border-gold/30" />

          <p className="text-[0.62rem] tracking-[0.4em] text-ink/60 uppercase">The Engagement</p>
          <p className="mt-4 font-display text-4xl tracking-[0.12em] text-gold">
            {event.dateLabel}
          </p>
          <div className="mx-auto mt-5 w-28 gold-rule" />

          <ul className="mt-7 space-y-4 text-sm text-ink/80">
            <li className="flex items-center justify-center gap-2">
              <Clock className="size-4 text-gold" aria-hidden />
              {event.dayLabel}, {event.timeLabel}
            </li>
            <li className="flex items-center justify-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden />
              <span>
                {venue.name}
                <br />
                <span className="text-ink/60">{venue.address}</span>
              </span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <Shirt className="size-4 text-gold" aria-hidden />
              {event.dressCode}
            </li>
          </ul>

          <p className="mt-6 font-display text-lg italic text-ink/65">{event.note}</p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[0.7rem] tracking-[0.24em] text-parchment uppercase transition-transform duration-200 active:scale-95"
            >
              <CalendarPlus className="size-4 transition-transform group-hover:rotate-6" />
              Add to calendar
            </a>
            <a
              href={directionsUrl()}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/60 py-3 text-[0.65rem] tracking-[0.2em] text-ink/75 uppercase transition-colors hover:bg-gold/10"
            >
              Directions
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
