import { useMemo } from "react";

// Falling jasmine petals — soft white / pale blush, pure CSS animation
export default function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 5 + Math.random() * 6,
        fallDuration: 13 + Math.random() * 10,
        swayDuration: 2.4 + Math.random() * 2,
        delay: -Math.random() * 20,
        hue: Math.random() > 0.5,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `fall ${p.fallDuration}s linear ${p.delay}s infinite`,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size * 1.35,
              borderRadius: "60% 40% 55% 45%",
              background: p.hue
                ? "linear-gradient(160deg,#fff7ee,#f3dfe4 70%)"
                : "linear-gradient(160deg,#fdeef2,#eeb2c0 70%)",
              boxShadow: "0 0 4px rgba(238,178,192,0.3)",
              animation: `sway ${p.swayDuration}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
