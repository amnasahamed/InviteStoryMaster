import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionTitle, Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding-config";
import { Sparkles, Hourglass } from "lucide-react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Digits({ value }: { value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <span className="flex justify-center overflow-hidden">
      {text.split("").map((char, i) => (
        <span key={i} className="relative inline-block h-[2.6rem] w-[0.75em] sm:h-14">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={char}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="font-display absolute inset-0 flex items-center justify-center text-3xl font-bold tracking-tight text-parchment sm:text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

function Chest({
  label,
  value,
  index,
}: {
  label: string;
  value: number;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-2xl border border-gold/50 bg-gradient-to-b from-[oklch(0.32_0.08_250)] via-[oklch(0.24_0.07_246)] to-[oklch(0.18_0.06_240)] p-2.5 sm:p-3.5 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(245,197,66,0.3)] transition-all duration-300 hover:border-gold hover:shadow-[0_16px_32px_-8px_rgba(245,197,66,0.3)]"
      >
        <div className="relative mb-1">
          <img
            src="/op-treasure-chest.png"
            alt=""
            width={768}
            height={768}
            loading="lazy"
            className="mx-auto h-10 w-10 sm:h-11 sm:w-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <Digits value={value} />
        <div className="mt-1 flex items-center justify-center">
          <span className="font-accent rounded-full bg-black/40 px-2 py-0.5 text-center text-[0.62rem] sm:text-[0.7rem] font-bold tracking-[0.2em] text-gold-soft uppercase border border-gold/20">
            {label}
          </span>
        </div>
        <motion.img
          src="/op-coin.png"
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="absolute -top-2 -right-2 h-5 w-5 sm:h-6 sm:w-6 drop-shadow-md pointer-events-none"
          animate={{ y: [0, -5, 0], rotate: [0, 15, 0] }}
          transition={{
            duration: 2.6 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </Reveal>
  );
}

export default function Countdown() {
  const target = new Date(wedding.date).getTime();
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  return (
    <section id="countdown-section" className="relative bg-gradient-to-b from-ocean-deep via-background to-background px-5 py-18">
      <div className="mx-auto max-w-lg">
        <SectionTitle>Countdown to the Grand Line</SectionTitle>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {items.map((item, i) => (
            <Chest key={item.label} {...item} index={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-7 flex items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-ocean-deep/60 px-5 py-3.5 text-center backdrop-blur-sm shadow-md">
            <Hourglass className="h-4 w-4 text-gold shrink-0 animate-pulse" />
            <p className="text-xs sm:text-sm text-parchment/90 font-sans leading-relaxed">
              The Log Pose is locked! The ultimate treasure at the end of this voyage is our wedding &mdash; and you are part of our pirate crew.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
