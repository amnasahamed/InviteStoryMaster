import { motion } from "motion/react";
import Aurora from "@/components/Aurora";
import { wedding } from "@/lib/wedding-config";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden bg-ocean-deep">
      <img
        src="/op-hero-ship.png"
        alt={`Illustration of ${wedding.bride.name} and ${wedding.groom.name} in Indian wedding attire sailing a grand ship`}
        width={1280}
        height={1600}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <Aurora
        amplitude={0.4}
        className="mix-blend-screen"
        colorStops={["#1e6fd9", "#f5c542", "#d94f2b"]}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/10 to-ocean-deep" />

      <div className="relative z-10 w-full max-w-md px-5 pb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-accent text-[0.7rem] tracking-[0.32em] text-gold uppercase"
        >
          {wedding.hashtag}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 1.5, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 70, damping: 12 }}
          className="font-display mt-3 text-[2.1rem] leading-[0.95] tracking-tight text-parchment uppercase drop-shadow-[0_6px_0_rgba(60,20,10,0.85)] sm:text-5xl"
        >
          An Indian Wedding
          <span className="mt-1 block gold-text text-[2.6rem] sm:text-6xl">
            Adventure
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-display mt-2 text-sm tracking-[0.14em] text-sunset uppercase drop-shadow-[0_2px_0_rgba(0,0,0,0.6)] sm:text-base"
        >
          The Grand Line of Marriage!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.95, type: "spring", stiffness: 120, damping: 12 }}
          className="mt-7 inline-flex flex-col items-center gap-1 rounded-2xl border border-gold/40 bg-ocean-deep/60 px-6 py-4 backdrop-blur-sm"
        >
          <span className="font-display text-2xl text-parchment sm:text-3xl">
            {wedding.bride.name}
            <span className="mx-2 text-gold">&</span>
            {wedding.groom.name}
          </span>
          <span className="font-accent text-xs tracking-[0.2em] text-gold-soft uppercase">
            {wedding.dateLabel}
          </span>
          <span className="text-[0.7rem] text-parchment/80">
            {wedding.venue.name} &middot; Goa
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mt-8 flex flex-col items-center gap-1"
        >
          <span className="font-accent text-[0.65rem] tracking-[0.28em] text-gold/80 uppercase">
            Set sail
          </span>
          <span className="text-gold">&#9660;</span>
        </motion.div>
      </div>
    </section>
  );
}
