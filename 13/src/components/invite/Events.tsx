import { CalendarPlus, Clock, MapPin } from "lucide-react";
import { invitation } from "@/config/invitation";
import { formatEventDate, formatEventTime, googleCalendarUrl } from "@/lib/invite-utils";
import { Reveal } from "./Reveal";

/** Only the events that happen on the wedding day itself. */
const weddingDay = new Date(invitation.mainEvent.startsAt).toDateString();
const weddingDayEvents = invitation.events.filter(
  (event) => new Date(event.startsAt).toDateString() === weddingDay,
);

export function Events() {
  return (
    <section id="events" className="relative px-5 py-16">
      <Reveal className="mx-auto mb-10 max-w-md text-center">
        <p className="font-kicker text-gold text-[0.68rem] tracking-[0.42em] uppercase">
          The celebration
        </p>
        <h2 className="font-display text-maroon mt-3 text-3xl sm:text-4xl">
          {invitation.mainEvent.dateLabel}
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-lg gap-4">
        {weddingDayEvents.map((event, i) => (
          <Reveal key={event.key} delay={i * 0.04}>
            <article className="border-gold/25 bg-paper/80 rounded-3xl border px-5 py-5 shadow-[0_18px_40px_-34px_var(--shadow-gold)]">
              <p className="font-kicker text-gold text-[0.58rem] tracking-[0.3em] uppercase">
                {formatEventDate(event.startsAt)}
              </p>
              <h3 className="font-display text-maroon mt-2 text-3xl">{event.name}</h3>

              <p className="font-body text-ink/65 mt-3 flex items-center gap-2 text-sm">
                <Clock className="text-gold size-3.5 shrink-0" aria-hidden />
                {formatEventTime(event.startsAt)}
              </p>
              <p className="font-body text-ink/65 mt-1.5 flex items-start gap-2 text-sm">
                <MapPin className="text-gold mt-0.5 size-3.5 shrink-0" aria-hidden />
                <span>
                  {event.venue} · {event.address}
                </span>
              </p>

              {event.note ? (
                <p className="font-body text-ink/55 mt-3 text-xs italic">{event.note}</p>
              ) : null}

              <a
                href={googleCalendarUrl({
                  title: `${event.name} — ${invitation.couple.monogram}`,
                  startsAt: event.startsAt,
                  durationMinutes: event.durationMinutes,
                  location: `${event.venue}, ${event.address}`,
                  description: event.note ?? "",
                })}
                target="_blank"
                rel="noreferrer"
                className="text-gold font-kicker mt-4 inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.24em] uppercase underline-offset-4 hover:underline"
              >
                <CalendarPlus className="size-3.5" aria-hidden />
                Add this event
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
