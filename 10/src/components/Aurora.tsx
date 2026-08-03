import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

type AuroraProps = {
  /** Ordered color stops for the swirling energy bands. */
  colorStops?: [string, string, string];
  /** 0-1, overall opacity of the effect. */
  amplitude?: number;
  /** Number of drifting energy sparks. */
  sparks?: number;
  className?: string;
};

/**
 * Grand Line Aurora — swirling "New World" energy bands plus drifting
 * sea sparks. Pure CSS/motion so it stays smooth on mid-range phones.
 */
export default function Aurora({
  colorStops = ["#1e6fd9", "#f5c542", "#d94f2b"],
  amplitude = 0.75,
  sparks = 18,
  className = "",
}: AuroraProps) {
  const reduced = useReducedMotion();

  const sparkList = useMemo(
    () =>
      Array.from({ length: sparks }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 3 + ((i * 7) % 6),
        delay: (i % 9) * 0.7,
        duration: 6 + ((i * 3) % 7),
      })),
    [sparks],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: amplitude }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute -inset-[35%] blur-[60px]"
          style={{
            background: `conic-gradient(from ${i * 120}deg at 50% 50%, transparent 0deg, ${
              colorStops[i]
            } 90deg, transparent 200deg, ${colorStops[(i + 1) % 3]} 300deg, transparent 360deg)`,
            mixBlendMode: "screen",
          }}
          animate={
            reduced
              ? {}
              : {
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            rotate: { duration: 44 + i * 13, repeat: Infinity, ease: "linear" },
            scale: { duration: 14 + i * 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Drifting energy sparks */}
      {sparkList.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 12px 3px oklch(0.85 0.15 88 / 70%)",
          }}
          animate={
            reduced
              ? {}
              : { y: [0, -60, 0], opacity: [0, 0.9, 0], scale: [0.6, 1.2, 0.6] }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
