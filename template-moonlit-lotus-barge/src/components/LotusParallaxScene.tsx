import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { wedding } from "../config";

export default function LotusParallaxScene() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 65, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 65, damping: 24 });
  const landscapeX = useTransform(x, (value) => value * 0.25);
  const landscapeY = useTransform(y, (value) => value * 0.15);
  const subjectX = useTransform(x, (value) => value * 0.7);
  const subjectY = useTransform(y, (value) => value * 0.45);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 20);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  return (
    <section id="invitation" className="new-hero" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.img src={wedding.assets.environment} alt="Moonlit palaces reflected in Lake Pichola" className="new-hero__landscape" style={{ x: landscapeX, y: landscapeY }} />
      <div className="new-hero__wash" />
      <div className="new-hero__grain" aria-hidden />

      <motion.div className="new-hero__copy" initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}>
        <p className="new-hero__eyebrow">Together with their families</p>
        <h1 className="new-hero__names"><span>{wedding.groom}</span><i>and</i><span>{wedding.bride}</span></h1>
        <div className="new-hero__details">
          <p>{wedding.dateLabel}</p><span aria-hidden /><p>{wedding.timeLabel}</p>
          <p>{wedding.venue.name} · Udaipur</p>
        </div>
      </motion.div>

      <motion.img src={wedding.assets.barge} alt={`${wedding.groom} and ${wedding.bride} on a lotus barge`} className="new-hero__barge" style={{ x: subjectX, y: subjectY }} initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
      <div className="new-hero__index" aria-hidden>12 · 12 · 26</div>
      <a className="new-hero__scroll" href="#main-invitation"><span>Continue</span><i aria-hidden /></a>
    </section>
  );
}
