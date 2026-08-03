import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "./data";

const target = new Date(wedding.dateISO).getTime();

function diff() {
  const ms = Math.max(0, target - Date.now());
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
    <div className="relative flex flex-col items-center rounded-2xl border border-ivory/15 bg-ivory/[0.07] px-2 py-4 backdrop-blur-sm">
      <div className="relative h-10 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-display text-[2.1rem] leading-none font-light text-ivory tabular-nums"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-body text-[0.55rem] tracking-[0.28em] text-gold/85 uppercase">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [time, setTime] = useState(() => diff());

  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-royal-deep px-6 py-16">
      <img
        src="/images/mandala-texture.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-royal-deep/85 via-royal/60 to-royal-deep/95" />
      <div className="relative mx-auto w-full max-w-md text-center">
        <Reveal>
          <p className="font-body text-[0.62rem] tracking-[0.45em] text-gold/85 uppercase">
            Counting Down
          </p>
          <h2 className="mt-3 font-script text-4xl text-ivory">Until we say Qubool Hai</h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-9 grid grid-cols-4 gap-2.5">
          {Object.entries(time).map(([label, value]) => (
            <Unit key={label} label={label} value={value} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}