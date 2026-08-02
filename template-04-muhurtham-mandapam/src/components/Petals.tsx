import { useMemo } from "react";

interface Petal {
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: number;
}

/** Falling marigold petals — pure CSS animation, GPU friendly. */
export default function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97 + 13) % 100,
        delay: ((i * 1.37) % 9) * -1,
        duration: 9 + ((i * 2.13) % 7),
        size: 9 + ((i * 5) % 9),
        hue: i % 3,
      })),
    [count],
  );

  const colors = ["#e8961c", "#d97706", "#e5b32c"];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.25,
            background: `radial-gradient(circle at 35% 30%, ${colors[p.hue]}, ${colors[(p.hue + 1) % 3]})`,
            borderRadius: "60% 40% 55% 45% / 70% 65% 35% 30%",
            boxShadow: "0 1px 2px rgba(120,60,0,0.25)",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
