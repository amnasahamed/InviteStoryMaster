import { motion } from "motion/react";

/**
 * Aurora — soft animated gradient light field.
 * Purely CSS/transform driven so it stays smooth on mobile devices.
 */
export function Aurora({ className = "" }: { className?: string }) {
  const blobs = [
    {
      color: "var(--aurora-1)",
      size: "72vw",
      top: "-10%",
      left: "-15%",
      duration: 18,
      x: [0, 40, -20, 0],
      y: [0, -30, 20, 0],
    },
    {
      color: "var(--aurora-2)",
      size: "64vw",
      top: "25%",
      left: "45%",
      duration: 22,
      x: [0, -50, 25, 0],
      y: [0, 35, -25, 0],
    },
    {
      color: "var(--aurora-3)",
      size: "80vw",
      top: "55%",
      left: "-20%",
      duration: 26,
      x: [0, 55, -15, 0],
      y: [0, -20, 30, 0],
    },
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[70px] opacity-70 will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle at 50% 50%, ${b.color}, transparent 68%)`,
          }}
          animate={{ x: b.x, y: b.y, scale: [1, 1.12, 0.96, 1] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-[image:var(--gradient-veil)]" />
    </div>
  );
}

export default Aurora;
