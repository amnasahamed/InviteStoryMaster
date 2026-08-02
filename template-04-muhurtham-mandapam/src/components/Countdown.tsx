import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="card-frame flex w-[4.4rem] flex-col items-center rounded-xl px-1 py-3 sm:w-20 sm:py-4">
      <div className="relative h-9 overflow-hidden sm:h-11">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="gold-num font-display block text-3xl font-semibold tabular-nums sm:text-4xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#9a6b1f] sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

/** Live countdown to the muhurtham moment. */
export default function Countdown() {
  const target = new Date(wedding.muhurthamISO).getTime();
  const [t, setT] = useState<Parts>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex items-stretch justify-center gap-2.5 sm:gap-4">
      <Cell value={t.days} label="Days" />
      <Cell value={t.hours} label="Hours" />
      <Cell value={t.minutes} label="Mins" />
      <Cell value={t.seconds} label="Secs" />
    </div>
  );
}
