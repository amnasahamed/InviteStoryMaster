import { useMemo } from "react";

interface PetalData {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: string;
  hue: number;
  opacity: number;
}

function generatePetals(count: number): PetalData[] {
  return Array.from({ length: count }, (_, i) => ({
    left: (i * 7.3 + 4) % 96,
    delay: (i * 1.37) % 11,
    duration: 12 + ((i * 3) % 8),
    size: 7 + ((i * 5) % 10),
    drift: `${((i % 5) - 2) * 3.5}vw`,
    hue: 15 + ((i * 23) % 50),      // warm rose-gold range
    opacity: 0.5 + ((i * 7) % 4) * 0.1,
  }));
}

function generateSparkles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    left: (i * 13.7 + 8) % 94,
    top: (i * 17.3 + 12) % 85,
    delay: (i * 2.1) % 8,
    duration: 3 + ((i * 1.7) % 4),
    size: 2 + ((i * 3) % 3),
  }));
}

export function Petals() {
  const petals = useMemo(() => generatePetals(18), []);
  const sparkles = useMemo(() => generateSparkles(12), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Falling petals */}
      {petals.map((p, i) => (
        <span
          key={`petal-${i}`}
          className="absolute top-0 rounded-[100%_0_100%_0]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.5,
            background: `oklch(${0.55 + (i % 3) * 0.08} ${0.14 + (i % 2) * 0.04} ${p.hue})`,
            opacity: p.opacity,
            ["--drift" as string]: p.drift,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            filter: `blur(${i % 4 === 0 ? 2 : 0}px)`,
          }}
        />
      ))}

      {/* Floating gold sparkles */}
      {sparkles.map((s, i) => (
        <span
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: `oklch(0.92 0.08 85)`,
            boxShadow: `0 0 ${s.size * 3}px ${s.size}px oklch(0.84 0.12 85 / 30%)`,
            animation: `float-sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
