import { motion } from "motion/react";

const PETALS = [
  { left: "6%", delay: 0, dur: 15, size: 14 },
  { left: "22%", delay: 3, dur: 19, size: 9 },
  { left: "41%", delay: 6, dur: 17, size: 12 },
  { left: "58%", delay: 1.5, dur: 21, size: 8 },
  { left: "74%", delay: 8, dur: 16, size: 13 },
  { left: "89%", delay: 4.5, dur: 20, size: 10 },
];

/** Slow drifting petals for ambient depth. */
export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-[-8%] block rounded-[100%_0_100%_0] bg-[image:var(--gradient-petal)] opacity-60"
          style={{ left: p.left, width: p.size, height: p.size * 1.4 }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, 24, -18, 10, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default Petals;
