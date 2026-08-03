import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WEDDING } from "@/lib/wedding";
import { Reveal, SectionTitle } from "./Reveal";

const TARGET = new Date(WEDDING.dateISO).getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor((ms / 3600000) % 24),
    Minutes: Math.floor((ms / 60000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

function Unit({ label, value }: { label: string; value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-gold-soft/70 bg-card/70 px-2 py-4 backdrop-blur-sm">
      <div className="relative h-10 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-display text-3xl tabular-nums text-gold-gradient"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 font-body text-[0.55rem] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [t, setT] = useState(() => diff());

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="mx-auto max-w-md">
        <SectionTitle eyebrow="Counting every moment" title="Until We Say Qubool Hai" />
        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-4 gap-2" style={{ boxShadow: "none" }}>
            {Object.entries(t).map(([label, value]) => (
              <Unit key={label} label={label} value={value} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-center font-display text-sm italic text-muted-foreground">
            Your presence is the blessing we look forward to most.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Countdown;
