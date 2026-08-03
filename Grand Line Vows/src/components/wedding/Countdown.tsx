import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionTitle, Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding-config";

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
        <span key={i} className="relative inline-block h-[2.4rem] w-[0.72em] sm:h-12">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={char}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="font-display absolute inset-0 flex items-center justify-center text-3xl text-parchment sm:text-4xl"
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
      <div className="relative rounded-2xl border-2 border-gold/50 bg-gradient-to-b from-[oklch(0.32_0.07_40)] to-[oklch(0.22_0.06_35)] px-2 py-3 shadow-[0_10px_0_-2px_oklch(0.18_0.05_30),0_18px_30px_-16px_black]">
        <img
          src="/op-treasure-chest.png"
          alt=""
          width={768}
          height={768}
          loading="lazy"
          className="mx-auto mb-1 h-9 w-9 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        />
        <Digits value={value} />
        <p className="font-accent mt-1 text-center text-[0.6rem] tracking-[0.18em] text-gold-soft uppercase">
          {label}
        </p>
        <motion.img
          src="/op-coin.png"
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="absolute -top-2 -right-2 h-5 w-5"
          animate={{ y: [0, -6, 0], rotate: [0, 18, 0] }}
          transition={{
            duration: 2.6 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
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
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative bg-background px-5 py-16">
      <div className="mx-auto max-w-md">
        <SectionTitle>Countdown to the Grand Line of Marriage!</SectionTitle>

        <div className="mt-8 grid grid-cols-4 gap-2">
          {items.map((item, i) => (
            <Chest key={item.label} {...item} index={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            The Log Pose is locked. The treasure at the end of this voyage is a
            wedding &mdash; and you are on the crew.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
