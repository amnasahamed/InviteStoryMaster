import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FlyingLanterns from "./FlyingLanterns";
import { wedding } from "../config";

type Offset = { x: number; y: number };
const LAYERS = {
  hero: "./assets/hero-lakeview-teal-v1.png",
  couple: "./assets/hero-couple-v2.png",
};

function usePointerParallax() {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const target = useRef<Offset>({ x: 0, y: 0 });
  const current = useRef<Offset>({ x: 0, y: 0 });
  const raf = useRef(0);
  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.055;
      current.current.y += (target.current.y - current.current.y) * 0.055;
      setOffset({ ...current.current });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);
  const onMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    target.current = { x: (((e.clientX - rect.left) / rect.width) - .5) * 18, y: (((e.clientY - rect.top) / rect.height) - .5) * 12 };
  }, [reduce]);
  const onLeave = useCallback(() => { target.current = { x: 0, y: 0 }; }, []);
  return { offset, onMove, onLeave, reduce };
}

const layerStyle = (offset: Offset, depth: number): CSSProperties => ({ transform: `translate3d(${offset.x * depth}px, ${offset.y * depth}px, 0)` });
const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const } });

export default function ParallaxScene() {
  const { offset, onMove, onLeave, reduce } = usePointerParallax();
  const [entered, setEntered] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setEntered(true), 100); return () => clearTimeout(timer); }, []);

  return (
    <section className="hero-scene relative isolate min-h-[100dvh] w-full overflow-hidden bg-dusk-deep" onPointerMove={onMove} onPointerLeave={onLeave} aria-label={`${wedding.groom} and ${wedding.bride}'s wedding invitation`}>
      <div className="absolute inset-[-2%] z-0 will-change-transform" style={layerStyle(offset, .18)}>
        <img src={LAYERS.hero} alt="A pathway of floating brass lamps curves across the Kerala backwaters toward a wedding pavilion" className="hero-art h-full w-full object-cover object-[67%_center] sm:object-center" draggable={false} />
      </div>
      <div className="hero-grade pointer-events-none absolute inset-0 z-[2]" />
      <div className="absolute inset-0 z-[4] will-change-transform" style={layerStyle(offset, .42)}><FlyingLanterns enabled={entered && !reduce} /></div>
      <div className="hero-grain pointer-events-none absolute inset-0 z-[6]" />

      <div className="pointer-events-none absolute bottom-[-4%] right-[-7%] z-[12] w-[61%] max-w-[35rem] will-change-transform sm:bottom-[-8%] sm:right-[2%] sm:w-[38%] lg:right-[5%]" style={layerStyle(offset, .7)}>
        <motion.img
          src={LAYERS.couple}
          alt={`${wedding.groom} and ${wedding.bride} standing together in wedding attire`}
          className="hero-couple h-auto w-full select-none"
          draggable={false}
          initial={{ opacity: 0, y: 38 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
          transition={{ duration: 1.25, delay: .48, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="pointer-events-none absolute inset-3 z-[8] border border-glow-gold/25 sm:inset-5" />
      <div className="pointer-events-none absolute left-3 top-3 z-[9] h-16 w-16 border-l border-t border-glow-gold/70 sm:left-5 sm:top-5" />
      <div className="pointer-events-none absolute bottom-3 right-3 z-[9] h-16 w-16 border-b border-r border-glow-gold/70 sm:bottom-5 sm:right-5" />

      <div className="relative z-[20] mx-auto flex min-h-[100dvh] w-full max-w-[90rem] flex-col px-7 pb-8 pt-28 sm:px-14 sm:pb-12 sm:pt-32 lg:px-20">
        <motion.div {...reveal(.15)} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} className="flex items-center gap-4">
          <span className="font-display text-2xl italic text-glow-gold">॥</span>
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#f4e7d0]/70 sm:text-[10px]">An evening by the backwaters</p>
        </motion.div>

        <div className="mt-auto mb-[25vh] sm:mb-[16vh] lg:mb-[13vh]">
          <motion.p {...reveal(.28)} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.36em] text-glow-gold/80"><span className="h-px w-8 bg-glow-gold/50" />The wedding of</motion.p>
          <motion.h1 {...reveal(.36)} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} className="hero-title max-w-[58rem] text-[#f5e8d2]">
            <span>{wedding.groom}</span><span className="hero-ampersand">&amp;</span><span>{wedding.bride}</span>
          </motion.h1>
        </div>

        <motion.div {...reveal(.65)} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} className="hero-details relative z-[22] mt-auto grid gap-5 border-t border-[#f4e7d0]/20 pt-5 text-[#f4e7d0] sm:max-w-[65%] sm:grid-cols-2 sm:items-end">
          <div className="flex items-center gap-4"><span className="font-display text-5xl leading-none text-glow-gold">{wedding.dayNum}</span><div><p className="hero-label">Save the date</p><p className="font-display text-xl">{wedding.monthLabel} {wedding.yearLabel}</p></div></div>
          <div><p className="hero-label">Where</p><p className="font-display text-xl sm:text-2xl">{wedding.venue.name}</p><p className="mt-1 text-xs text-[#f4e7d0]/55">{wedding.venue.address}</p></div>
        </motion.div>
      </div>

    </section>
  );
}
