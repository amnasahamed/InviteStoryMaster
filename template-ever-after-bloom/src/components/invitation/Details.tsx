import { motion } from "motion/react";
import { CalendarPlus, Clock, MapPin, Shirt, Sparkles } from "lucide-react";
import mapPlate from "@/assets/map-plate.jpg";
import car from "@/assets/wedding-car.png";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

function buildIcs() {
  const start = new Date(invitation.dateISO);
  const end = new Date(start.getTime() + 5 * 3_600_000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Storybook//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@wedding`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${invitation.couple.bride} & ${invitation.couple.groom} — Wedding`,
    `LOCATION:${invitation.venue.name}, ${invitation.venue.address}`,
    "DESCRIPTION:We would be honoured to have you with us.",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

const cards = [
  { icon: Sparkles, label: "The Day", value: invitation.dateLabel },
  { icon: Clock, label: "The Hour", value: invitation.timeLabel },
  { icon: MapPin, label: "The Place", value: `${invitation.venue.name} · ${invitation.venue.address}` },
  { icon: Shirt, label: "Dress Code", value: invitation.dressCode },
];

export function Details() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    invitation.venue.mapsQuery,
  )}`;

  return (
    <section id="details" className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--peach) 26%, var(--ivory)) 0%, var(--cream) 45%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Chapter Two" title="Where the story gathers" />
        <Ornament className="mt-8" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="plate paper-grain h-full rounded-[1.6rem] px-6 py-7"
              >
                <c.icon className="text-gold-deep" size={20} strokeWidth={1.4} />
                <p className="mt-4 font-sans text-[0.6rem] tracking-[0.36em] text-gold-deep uppercase">
                  {c.label}
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-primary">{c.value}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          <motion.a
            href={buildIcs()}
            download="wedding.ics"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-[0.66rem] tracking-[0.24em] text-primary-foreground uppercase"
          >
            <CalendarPlus size={15} strokeWidth={1.6} /> Add to Calendar
          </motion.a>
          <motion.a
            href={maps}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass-plate inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[0.66rem] tracking-[0.24em] text-primary uppercase"
          >
            <MapPin size={15} strokeWidth={1.6} /> Get Directions
          </motion.a>
        </Reveal>

        {/* Illustrated map plate with the wedding car rolling in */}
        <Reveal delay={0.14} className="mt-12">
          <div className="plate relative overflow-hidden rounded-[2rem]">
            <img
              src={mapPlate}
              alt="Hand-painted illustrated map of the old city with the palace marked"
              loading="lazy"
              width={1280}
              height={1024}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, color-mix(in oklab, var(--cream) 55%, transparent), transparent 55%)",
              }}
            />
            <motion.img
              src={car}
              alt=""
              aria-hidden
              loading="lazy"
              width={1175}
              height={567}
              className="absolute bottom-2 left-0 w-40 sm:w-56"
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 24, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
