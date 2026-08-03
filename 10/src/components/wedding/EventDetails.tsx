import { motion } from "motion/react";
import { Reveal, SectionTitle } from "./Reveal";
import { Button } from "@/components/ui/button";
import { buildIcs, mapsUrl, wedding } from "@/lib/wedding-config";

function ScrollCard({
  label,
  value,
  sub,
  rotate,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  rotate: number;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        style={{ rotate: `${rotate}deg` }}
        className="parchment-panel relative rounded-lg px-4 py-4 text-center"
      >
        <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-lg bg-[oklch(0.42_0.1_45)]/60" />
        <span className="absolute inset-x-0 bottom-0 h-1.5 rounded-b-lg bg-[oklch(0.42_0.1_45)]/60" />
        <p className="font-accent text-[0.62rem] tracking-[0.24em] uppercase opacity-75">
          {label}
        </p>
        <p className="font-display mt-1 text-lg leading-tight">{value}</p>
        {sub ? <p className="mt-1 text-[0.78rem] opacity-85">{sub}</p> : null}
      </div>
    </Reveal>
  );
}

export default function EventDetails() {
  function addToCalendar() {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grand-line-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="relative bg-background px-5 py-16">
      <div className="mx-auto max-w-md">
        <SectionTitle>Log Pose to Our Wedding</SectionTitle>

        <div className="mt-8 space-y-4">
          <ScrollCard
            label="The Date"
            value={wedding.dateLabel}
            rotate={-1.5}
            delay={0}
          />
          <ScrollCard label="The Hour" value={wedding.timeLabel} rotate={1.5} delay={0.08} />
          <ScrollCard
            label="The Island"
            value={wedding.venue.name}
            sub={wedding.venue.address}
            rotate={-1}
            delay={0.16}
          />
        </div>

        <Reveal delay={0.2} className="mt-6">
          <Button
            onClick={addToCalendar}
            size="lg"
            className="font-display h-14 w-full gap-3 rounded-2xl border-2 border-gold/60 bg-gradient-to-b from-[oklch(0.6_0.19_35)] to-[oklch(0.45_0.17_32)] text-base tracking-wide text-parchment uppercase shadow-[0_8px_0_-1px_oklch(0.3_0.11_30)] hover:brightness-110 active:translate-y-1 active:shadow-[0_4px_0_-1px_oklch(0.3_0.11_30)]"
          >
            <motion.img
              src="/op-log-pose.png"
              alt=""
              width={512}
              height={512}
              loading="lazy"
              className="h-9 w-9 drop-shadow-[0_0_10px_rgba(245,197,66,0.7)]"
              animate={{ rotate: [-12, 12, -12], y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            Set your Log Pose
          </Button>
          <p className="mt-2 text-center text-[0.7rem] text-muted-foreground">
            Adds the muhurat to your calendar &mdash; no RSVP needed, just show up.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border-2 border-gold/40 shadow-[0_20px_45px_-25px_black]">
            <img
              src="/op-map.png"
              alt="Grand Line style treasure map showing the route to the wedding venue"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ocean-deep/70 to-transparent" />
            <motion.div
              className="absolute top-[65%] left-[83%] -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="block h-4 w-4 rounded-full border-2 border-parchment bg-sunset shadow-[0_0_0_8px_oklch(0.55_0.2_32/25%)]" />
            </motion.div>
            <p className="font-accent absolute top-3 left-4 text-[0.68rem] tracking-[0.2em] text-gold-soft uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Destination marked
            </p>
            <div className="bg-ocean-deep px-4 pt-3 pb-4">
              <p className="font-display text-lg text-parchment">
                {wedding.venue.name}
              </p>
              <p className="text-[0.72rem] text-muted-foreground">
                {wedding.venue.address}
              </p>
              <Button
                asChild
                className="font-display mt-3 h-12 w-full gap-2 rounded-xl border-2 border-gold/60 bg-gradient-to-b from-ocean to-[oklch(0.38_0.13_235)] text-sm tracking-wide text-parchment uppercase shadow-[0_6px_0_-1px_oklch(0.24_0.09_240)] active:translate-y-1"
              >
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  <span aria-hidden="true" className="text-lg">
                    &#9973;
                  </span>
                  Get Directions
                </a>
              </Button>
            </div>
          </div>

        </Reveal>
      </div>
    </section>
  );
}
