import { motion } from "motion/react";
import Aurora from "@/components/Aurora";
import { wedding } from "@/lib/wedding-config";
import { Sparkles, Compass, MapPin } from "lucide-react";

export default function Hero() {
  const scrollToNext = () => {
    const nextSec = document.getElementById("countdown-section");
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden bg-ocean-deep select-none">
      {/* Background illustration */}
      <img
        src="/op-hero-ship.png"
        alt={`Illustration of ${wedding.bride.name} and ${wedding.groom.name} in Indian wedding attire sailing a grand ship`}
        width={1280}
        height={1600}
        priority="true"
        className="absolute inset-0 h-full w-full object-cover object-top filter brightness-[0.95]"
      />

      {/* Aurora glow overlay */}
      <Aurora
        amplitude={0.4}
        className="mix-blend-screen opacity-80"
        colorStops={["#1e6fd9", "#f5c542", "#d94f2b"]}
      />

      {/* Deep gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/60 via-ocean-deep/20 to-ocean-deep" />

      {/* Floating Sparkles & Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-8 text-gold/60"
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-28 right-8 text-gold-soft/70"
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-5 pb-10 text-center">
        {/* Hashtag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ocean-deep/80 px-4 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span className="font-accent text-[0.72rem] tracking-[0.28em] text-gold-soft uppercase font-semibold">
            {wedding.hashtag}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4"
        >
          <span className="font-display block text-[1.9rem] leading-[1] tracking-normal text-parchment uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-4xl">
            An Indian Wedding
          </span>
          <h1 className="font-display gold-text mt-1 text-[2.75rem] leading-[0.95] tracking-tight uppercase sm:text-6xl drop-shadow-[0_6px_20px_rgba(245,197,66,0.3)]">
            Adventure
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="font-accent mt-2 text-sm tracking-[0.18em] text-gold-soft uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base font-semibold"
        >
          ⚓ The Grand Line of Marriage ⚓
        </motion.p>

        {/* Couple & Date Plate */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 14 }}
          className="mt-6 inline-flex flex-col items-center gap-1.5 rounded-3xl border border-gold/40 bg-gradient-to-b from-ocean-deep/90 to-[oklch(0.18_0.07_248)]/90 px-7 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(245,197,66,0.3)] backdrop-blur-md"
        >
          <div className="font-display text-2xl tracking-wide text-parchment sm:text-3xl flex items-center justify-center gap-2">
            <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{wedding.bride.name}</span>
            <span className="text-gold font-normal text-xl sm:text-2xl font-serif italic">&amp;</span>
            <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{wedding.groom.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gold-soft font-accent text-xs tracking-[0.22em] uppercase font-semibold">
            <Compass className="h-3.5 w-3.5 text-gold animate-spin" style={{ animationDuration: "12s" }} />
            <span>{wedding.dateLabel}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[0.75rem] text-parchment/80 font-medium">
            <MapPin className="h-3 w-3 text-gold/80" />
            <span>{wedding.venue.name} &middot; Goa</span>
          </div>
        </motion.div>

        {/* Interactive Scroll Down Indicator */}
        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-6 mx-auto flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95 text-gold-soft hover:text-gold"
          aria-label="Scroll to countdown"
        >
          <span className="font-accent text-[0.68rem] tracking-[0.3em] uppercase font-semibold opacity-90">
            Set Sail
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center h-7 w-7 rounded-full border border-gold/40 bg-ocean-deep/60 backdrop-blur-sm shadow-md"
          >
            <span className="text-gold text-xs leading-none">&#9660;</span>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
