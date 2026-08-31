import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SectionTitle } from "./Reveal";
import { Button } from "@/components/ui/button";
import { buildIcs, googleCalendarUrl, mapsUrl, wedding } from "@/lib/wedding-config";
import { Calendar, Clock, MapPin, Navigation, Copy, Check, ExternalLink } from "lucide-react";

function ScrollCard({
  icon: Icon,
  label,
  value,
  sub,
  rotate,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  rotate: number;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        style={{ rotate: `${rotate}deg` }}
        className="parchment-panel relative overflow-hidden rounded-2xl border-[3px] border-[oklch(0.38_0.09_52)] p-4 sm:p-5 text-center shadow-[0_16px_30px_-12px_rgba(0,0,0,0.7)]"
      >
        {/* Top/bottom ornamental binding */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[oklch(0.42_0.1_45)] via-gold to-[oklch(0.42_0.1_45)] opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[oklch(0.42_0.1_45)] via-gold to-[oklch(0.42_0.1_45)] opacity-80" />
        
        <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.38_0.09_52)]/15 text-[oklch(0.38_0.12_40)]">
          <Icon className="h-4 w-4" />
        </div>

        <p className="font-accent text-[0.68rem] font-bold tracking-[0.24em] uppercase text-[oklch(0.42_0.12_40)]">
          {label}
        </p>
        <p className="font-display mt-1 text-xl font-bold text-[oklch(0.24_0.08_45)] leading-snug sm:text-2xl">
          {value}
        </p>
        {sub ? (
          <p className="mt-1 font-sans text-xs text-[oklch(0.35_0.06_45)] font-medium">
            {sub}
          </p>
        ) : null}
      </motion.div>
    </Reveal>
  );
}

export default function EventDetails() {
  const [copied, setCopied] = useState(false);

  function addToCalendarIcs() {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grand-line-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyAddress() {
    navigator.clipboard.writeText(`${wedding.venue.name}, ${wedding.venue.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="event-details-section" className="relative bg-background px-5 py-18">
      <div className="mx-auto max-w-lg">
        <SectionTitle>Log Pose to Our Wedding</SectionTitle>

        <div className="mt-8 space-y-4">
          <ScrollCard
            icon={Calendar}
            label="The Date"
            value={wedding.dateLabel}
            rotate={-1.5}
            delay={0}
          />
          <ScrollCard
            icon={Clock}
            label="The Hour"
            value={wedding.timeLabel}
            rotate={1.5}
            delay={0.08}
          />
          <ScrollCard
            icon={MapPin}
            label="The Island & Venue"
            value={wedding.venue.name}
            sub={wedding.venue.address}
            rotate={-1}
            delay={0.16}
          />
        </div>

        {/* Add to Calendar Section */}
        <Reveal delay={0.2} className="mt-8">
          <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-ocean-deep via-[oklch(0.24_0.08_246)] to-ocean-deep p-5 shadow-[0_16px_36px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="text-center">
              <h3 className="font-display gold-text text-xl uppercase tracking-tight">
                Save the Date to Your Calendar
              </h3>
              <p className="mt-1 font-sans text-xs text-parchment/80 leading-relaxed">
                Set your Log Pose early &mdash; no RSVP needed, just sail in!
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Button
                onClick={addToCalendarIcs}
                className="font-display h-12 gap-2.5 rounded-xl border border-gold/60 bg-gradient-to-b from-[oklch(0.6_0.19_35)] to-[oklch(0.45_0.17_32)] text-xs tracking-wider text-parchment uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:brightness-110 active:scale-95 transition-all"
              >
                <motion.img
                  src="https://media.invitestory.in/grand-line-voyage/op-log-pose.png"
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-6 w-6 drop-shadow"
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                Apple / Outlook (.ics)
              </Button>

              <Button
                asChild
                className="font-display h-12 gap-2 rounded-xl border border-gold/50 bg-ocean-deep/90 text-xs tracking-wider text-gold-soft uppercase hover:bg-ocean hover:text-parchment active:scale-95 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
              >
                <a href={googleCalendarUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4 text-gold" />
                  Google Calendar
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Map and Directions Card */}
        <Reveal delay={0.25} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 shadow-[0_24px_50px_-20px_black] bg-ocean-deep">
            <div className="relative">
              <img
                src="https://media.invitestory.in/grand-line-voyage/op-map-v1.png"
                alt="Grand Line style treasure map showing the route to the wedding venue"
                width={1280}
                height={896}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover"
              />
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ocean-deep/80 to-transparent" />
              
              {/* Destination Pin Pulse */}
              <motion.div
                className="absolute top-[65%] left-[83%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="block h-5 w-5 rounded-full border-2 border-parchment bg-sunset shadow-[0_0_0_8px_oklch(0.55_0.2_32/35%),0_0_15px_oklch(0.55_0.2_32)]" />
              </motion.div>

              <div className="absolute top-3 left-4 rounded-full bg-ocean-deep/80 px-3 py-1 border border-gold/40 backdrop-blur-sm">
                <p className="font-accent text-[0.65rem] font-bold tracking-[0.22em] text-gold uppercase drop-shadow">
                  📍 Destination Marked
                </p>
              </div>
            </div>

            <div className="bg-ocean-deep px-5 pt-4 pb-5 border-t border-gold/30">
              <h4 className="font-display text-xl font-bold text-parchment tracking-tight">
                {wedding.venue.name}
              </h4>
              <p className="mt-0.5 font-sans text-xs text-parchment/70 leading-relaxed">
                {wedding.venue.address}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <Button
                  asChild
                  className="font-display h-12 gap-2 rounded-xl border-2 border-gold/60 bg-gradient-to-b from-ocean to-[oklch(0.38_0.13_235)] text-xs tracking-wider text-parchment uppercase shadow-[0_6px_0_-1px_oklch(0.24_0.09_240)] active:translate-y-0.5 hover:brightness-110"
                >
                  <a href={mapsUrl} target="_blank" rel="noreferrer">
                    <Navigation className="h-4 w-4 text-gold" />
                    Open Google Maps
                  </a>
                </Button>

                <Button
                  type="button"
                  onClick={copyAddress}
                  className="font-display h-12 gap-2 rounded-xl border border-gold/40 bg-ocean-deep/90 text-xs tracking-wider text-parchment uppercase hover:bg-gold/15 active:scale-95 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-gold" />
                      Copy Address
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
