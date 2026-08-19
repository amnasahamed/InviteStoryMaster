import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="relative flex flex-col items-center">
      <div className="glass-tile-interactive relative grid h-[4.75rem] w-[4.75rem] place-items-center overflow-hidden border border-gold/40 shadow-[0_8px_25px_rgba(0,0,0,0.4)] sm:h-24 sm:w-24">
        {/* Subtle top gold highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="font-display text-3xl font-semibold tabular-nums text-gold sm:text-4xl drop-shadow-[0_2px_8px_rgba(230,195,110,0.3)]"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-cream/70">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ target }: { target: number }) {
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex items-start justify-center gap-2.5 sm:gap-4">
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hours" />
      <Unit value={time.minutes} label="Mins" />
      <Unit value={time.seconds} label="Secs" />
    </div>
  );
}

export default Countdown;
