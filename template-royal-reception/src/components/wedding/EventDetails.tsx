import { CalendarPlus, Clock, MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { mapsUrl, wedding } from "./data";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(wedding.dateISO)}`,
    `DTEND:${icsStamp(wedding.endISO)}`,
    `SUMMARY:Reception of ${wedding.bride.name} & ${wedding.groom.name}`,
    `LOCATION:${wedding.venue}, ${wedding.venueArea}`,
    "DESCRIPTION:We would be honoured by your presence.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-reception.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetails() {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-20">
      <img
        src="/images/swirl-band.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-10 left-1/2 w-[150%] max-w-none -translate-x-1/2 rotate-180 opacity-30 mix-blend-multiply"
      />
      <div className="relative mx-auto w-full max-w-md">
        <Reveal className="text-center">
          <p className="font-body text-[0.62rem] tracking-[0.45em] text-accent-foreground/70 uppercase">
            The Celebration
          </p>
          <div className="hairline-rule mx-auto mt-4 h-px w-28" />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="relative rounded-[1.75rem] border border-accent/35 bg-gradient-to-b from-card to-secondary/40 px-6 py-9 text-center shadow-[0_24px_60px_-30px_rgba(20,50,140,0.5)]">
            <div className="flex items-center justify-center gap-3">
              <div className="text-right">
                <p className="font-body text-[0.6rem] tracking-[0.22em] whitespace-nowrap text-royal/70 uppercase">
                  {wedding.dateLabel}
                </p>
                <div className="hairline-rule mt-2 h-px w-full" />
              </div>
              <span className="font-display text-[3.6rem] leading-none font-light text-royal">
                {wedding.day}
              </span>
              <div className="text-left">
                <p className="font-body text-[0.6rem] tracking-[0.16em] whitespace-nowrap text-royal/70 uppercase">
                  {wedding.timeLabel}
                </p>
                <div className="hairline-rule mt-2 h-px w-full" />
              </div>
            </div>

            <div className="mt-7 space-y-2">
              <p className="flex items-center justify-center gap-2 font-display text-lg text-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                {wedding.venue}
              </p>
              <p className="font-body text-[0.72rem] tracking-[0.2em] text-muted-foreground uppercase">
                {wedding.venueArea}
              </p>
              <p className="flex items-center justify-center gap-2 pt-1 font-body text-[0.72rem] text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0 text-accent" />
                Doors open at 6:00 PM · Dinner served 8:00 PM
              </p>
            </div>

            <motion.button
              onClick={addToCalendar}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-deep via-royal to-royal-light px-6 py-3.5 font-body text-[0.72rem] tracking-[0.24em] text-ivory uppercase shadow-[0_14px_30px_-12px_rgba(20,50,140,0.75)] transition-shadow"
            >
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </motion.button>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-6">
          <div className="overflow-hidden rounded-[1.75rem] border border-accent/30 bg-card shadow-[0_20px_50px_-28px_rgba(20,50,140,0.45)]">
            <div className="relative">
              <img
                src="/images/map-preview.jpg"
                alt={`Map showing ${wedding.venue}`}
                width={1024}
                height={768}
                loading="lazy"
                className="h-44 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate font-display text-base text-foreground">{wedding.venue}</p>
                <p className="truncate font-body text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {wedding.venueArea}
                </p>
              </div>
              <motion.a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.95 }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-royal/30 bg-secondary/60 px-4 py-2.5 font-body text-[0.64rem] tracking-[0.2em] text-royal uppercase"
              >
                <Navigation className="h-3.5 w-3.5" />
                Directions
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}