import { useMemo } from "react";

// Twinkling fairy lights — a scattered field of warm glowing dots.
// Used over the hanging garland in the hero and around the footer.
export default function FairyLights({
  count = 26,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const lights = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 1.6 + Math.random() * 2.6,
        delay: -Math.random() * 4,
        warm: Math.random() > 0.35,
      })),
    [count]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {lights.map((l) => (
        <span
          key={l.id}
          className="absolute rounded-full"
          style={{
            left: `${l.left}%`,
            top: `${l.top}%`,
            width: l.size,
            height: l.size,
            background: l.warm ? "#ffe9b8" : "#fdeef2",
            boxShadow: l.warm
              ? "0 0 8px 2px rgba(255,233,184,0.75)"
              : "0 0 8px 2px rgba(253,238,242,0.6)",
            animation: `twinkle ${l.duration}s ease-in-out ${l.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
