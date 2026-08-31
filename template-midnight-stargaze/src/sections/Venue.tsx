import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Navigation, MapPin, Map as MapIcon, Image as ImageIcon } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding, googleCalendarUrl, downloadICS, mapsEmbedUrl, mapsDirectionsUrl } from "../config";

type View = "map" | "photo";

export default function Venue() {
  const [view, setView] = useState<View>("map");

  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Where & When" title="The Venue" />

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-[#f6e2ae]">{wedding.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-[#f5eee2]/70">
            <MapPin size={14} className="text-[#eeb2c0]" />
            {wedding.venue.address}
          </p>
        </Reveal>

        {/* segmented toggle — Map / Venue */}
        <Reveal delay={0.05} className="flex justify-center">
          <div className="relative flex rounded-full border border-[#e2c88f]/30 bg-white/[0.04] p-1 backdrop-blur-md">
            {(
              [
                ["map", "Map", MapIcon],
                ["photo", "Venue", ImageIcon],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  view === key ? "text-[#1c1640]" : "text-[#f5eee2]/70"
                }`}
              >
                {view === key && (
                  <motion.span
                    layoutId="venue-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#e2c88f] to-[#eeb2c0]"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* map / photo panel */}
        <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-[#e2c88f]/30 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait" initial={false}>
            {view === "map" ? (
              <motion.iframe
                key="map"
                title="Wedding venue map"
                src={mapsEmbedUrl}
                className="h-64 w-full grayscale-[35%] contrast-[1.05] sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              />
            ) : (
              <motion.img
                key="photo"
                src="https://media.invitestory.in/midnight-stargaze/assets/venue-palace.webp"
                alt={`${wedding.venue.name} at night`}
                className="h-64 w-full object-cover sm:h-72"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
        </Reveal>

        {/* actions */}
        <Reveal delay={0.15} className="grid grid-cols-1 gap-3">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#e2c88f] via-[#eeb2c0] to-[#e2c88f] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-[#1c1640] shadow-[0_8px_30px_rgba(238,178,192,0.35)] transition-transform active:scale-95"
          >
            {/* light sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{ animation: "sweep 3.4s ease-in-out infinite" }}
            />
            <Navigation size={16} /> Get Directions
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#e2c88f]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#e2c88f]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Google Cal
            </a>
            <button
              onClick={downloadICS}
              className="flex items-center justify-center gap-2 rounded-full border border-[#e2c88f]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#e2c88f]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Apple / ICS
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
