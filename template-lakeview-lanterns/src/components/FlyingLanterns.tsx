import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Lantern = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  bottom: number;
  launched?: boolean;
};

const SPRITE = "./assets/layers/lantern-sprite.png";

function makeAmbient(count: number): Lantern[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = Math.random();
    return {
      id: i,
      left: 4 + Math.random() * 92,
      size: 28 + depth * 70,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * -24,
      sway: 10 + Math.random() * 28,
      opacity: 0.35 + depth * 0.55,
      bottom: -5 - Math.random() * 25,
    };
  });
}

function LanternEl({ lantern }: { lantern: Lantern }) {
  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={
        {
          left: `${lantern.left}%`,
          bottom: `${lantern.bottom}%`,
          width: lantern.size,
          opacity: lantern.opacity,
          animation: `lantern-float ${lantern.duration}s linear ${lantern.delay}s infinite`,
          zIndex: Math.round(lantern.size),
        } as CSSProperties
      }
      initial={lantern.launched ? { opacity: 0, scale: 0.6 } : undefined}
      animate={lantern.launched ? { opacity: lantern.opacity, scale: 1 } : undefined}
    >
      <img
        src={SPRITE}
        alt=""
        draggable={false}
        className="h-auto w-full select-none drop-shadow-[0_0_18px_rgba(233,198,164,0.55)]"
        style={{
          animation: `candle-flicker ${2 + (lantern.id % 5) * 0.35}s ease-in-out infinite`,
        }}
      />
    </motion.div>
  );
}

export default function FlyingLanterns({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  const ambient = useMemo(() => makeAmbient(0), []);
  const [launched, setLaunched] = useState<Lantern[]>([]);
  const nextId = useRef(1000);

  const releaseLantern = useCallback(() => {
    const id = nextId.current++;
    const lantern: Lantern = {
      id,
      left: 20 + Math.random() * 60,
      size: 56 + Math.random() * 40,
      duration: 14 + Math.random() * 8,
      delay: 0,
      sway: 16 + Math.random() * 20,
      opacity: 0.95,
      bottom: -8,
      launched: true,
    };
    setLaunched((prev) => [...prev.slice(-8), lantern]);
    window.setTimeout(() => {
      setLaunched((prev) => prev.filter((l) => l.id !== id));
    }, lantern.duration * 1000);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "l") releaseLantern();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, releaseLantern]);

  if (!enabled) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {ambient.map((l) => (
            <LanternEl key={l.id} lantern={l} />
          ))}
          {launched.map((l) => (
            <LanternEl key={l.id} lantern={l} />
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={releaseLantern}
        className="group pointer-events-auto absolute right-7 top-24 z-50 flex items-center gap-3 border-b border-glow-gold/35 bg-transparent pb-2 text-[9px] uppercase tracking-[0.24em] text-glow-gold transition-all duration-300 hover:border-glow-gold hover:text-[#f4e7d0] active:scale-[0.97] sm:right-14 sm:top-28"
        aria-label="Release a sky lantern"
      >
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-glow-warm shadow-lantern transition-transform group-hover:-translate-y-1" />
        Light a lantern
      </button>
    </>
  );
}
