import { motion, useReducedMotion, useTransform } from "motion/react";
import { useCallback, useRef, useState } from "react";
import couple from "@/assets/couple.png";
import { invite } from "@/config/invite";
import { useParallax } from "@/hooks/use-parallax";
import { getLenis } from "@/lib/lenis";
import { PetalBurst } from "./PetalBurst";
import { Petals } from "./Petals";
import { ScriptNames } from "./Reveal";

type Burst = { id: number; x: number; y: number };

export function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { y, progress } = useParallax(ref, [0, 70]);
  const fade = useTransform(progress, [0, 0.75], [1, 0]);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const ease = [0.22, 0.61, 0.36, 1] as const;
  const anim = ready ? "show" : "hidden";

  /** Tap anywhere on the hero to scatter petals — pure delight. */
  const scatter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const id = Date.now();
      setBursts((b) => [...b.slice(-2), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      if (navigator.vibrate) navigator.vibrate(8);
      window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 2600);
    },
    [reduced],
  );

  const scrollOn = () => {
    const target = ref.current?.nextElementSibling as HTMLElement | null;
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -20 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      onPointerDown={scatter}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center select-none"
    >
      <Petals />
      {bursts.map((b) => (
        <PetalBurst key={b.id} x={b.x} y={b.y} count={14} spread={130} seed={b.id % 11} />
      ))}

      <motion.p
        className="caps text-[0.62rem] text-sepia sm:text-xs"
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 1, ease }}
      >
        Save the date
      </motion.p>

      <motion.p
        className="script mt-5 text-5xl tracking-[0.06em] text-ink sm:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 1.1, delay: 0.15, ease }}
      >
        {invite.dateLabel}
      </motion.p>

      <motion.div style={{ y, opacity: fade }} className="mt-8 w-full max-w-sm sm:max-w-md">
        <motion.img
          src={couple}
          alt={`Illustration of ${invite.groom} and ${invite.bride} holding photo frames`}
          width={1024}
          height={1024}
          draggable={false}
          className="mx-auto w-full select-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.4, delay: 0.3, ease }}
        />
      </motion.div>

      <motion.p
        className="caps mt-6 max-w-xs text-[0.62rem] leading-[2.1] text-olive sm:text-xs"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Join us for the engagement party of
      </motion.p>

      <motion.h1
        className="script mt-3 text-[3.25rem] leading-[1.05] text-ink sm:text-7xl"
        initial="hidden"
        animate={anim}
      >
        <ScriptNames text={invite.groom} delay={0.85} trigger={anim} />
        <span className="mx-3 text-gold sm:mx-5">&</span>
        <ScriptNames text={invite.bride} delay={1.2} trigger={anim} />
      </motion.h1>

      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          scrollOn();
        }}
        aria-label="Scroll to the invitation"
        className="mt-10 flex min-h-14 flex-col items-center justify-end gap-2 px-8 pb-1"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="caps text-[0.55rem] text-sepia/70">Scroll</span>
        <motion.span
          aria-hidden="true"
          className="h-10 w-px bg-gradient-to-b from-sepia/60 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
