import { motion } from "motion/react";
import { CalendarPlus, Clock, MapPin, Navigation } from "lucide-react";
import { WEDDING, calendarUrl, mapsUrl } from "@/lib/wedding";
import { Reveal, SectionTitle } from "./Reveal";

export function EventDetails() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <img
        src="https://media.invitestory.in/noor-e-zahra/images/masjid.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[26rem] opacity-25"
      />

      <div className="relative mx-auto max-w-md">
        <SectionTitle eyebrow="Save the moment" title="Event Details" />

        <Reveal delay={0.06}>
          <div
            className="mt-10 rounded-3xl border border-gold-soft/70 bg-card/80 p-6 text-center backdrop-blur-sm"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <p className="font-body text-[0.6rem] uppercase tracking-[0.38em] text-gold-deep">
              {WEDDING.eventName}
            </p>
            <div className="mt-4 flex items-end justify-center gap-3">
              <span className="font-display text-lg font-light text-muted-foreground">
                {WEDDING.dateLabel}
              </span>
              <span className="font-name text-5xl leading-none text-gold-gradient">
                {WEDDING.day}
              </span>
              <span className="text-left">
                <span className="block font-display text-lg text-foreground">
                  {WEDDING.year}
                </span>
                <span className="block font-body text-[0.55rem] uppercase tracking-[0.3em] text-gold-deep">
                  {WEDDING.weekday}
                </span>
              </span>
            </div>

            <div className="mx-auto mt-5 hairline w-32" />

            <p className="mt-5 flex items-center justify-center gap-2 font-body text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {WEDDING.time}
            </p>
            <p className="mt-3 flex items-start justify-center gap-2 font-display text-xl text-foreground">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span>
                {WEDDING.venue}
                <span className="block font-body text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {WEDDING.venueLine2}
                </span>
              </span>
            </p>

            <motion.a
              href={calendarUrl()}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.97 }}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-shadow"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <CalendarPlus className="h-4 w-4" strokeWidth={1.8} />
              Add to Calendar
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="mt-6 overflow-hidden rounded-3xl border border-gold-soft/70 bg-card/80"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="relative">
              <img
                src="/images/map.jpg"
                alt={`Map preview of ${WEDDING.venue}`}
                loading="lazy"
                width={1200}
                height={800}
                className="h-44 w-full object-cover"
              />
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/40"
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-display text-base text-foreground">
                  {WEDDING.venue}
                </p>
                <p className="truncate font-body text-xs text-muted-foreground">
                  {WEDDING.venueLine2}
                </p>
              </div>
              <motion.a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.96 }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold px-4 py-2.5 font-body text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-deep"
              >
                <Navigation className="h-3.5 w-3.5" strokeWidth={1.8} />
                Directions
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default EventDetails;
