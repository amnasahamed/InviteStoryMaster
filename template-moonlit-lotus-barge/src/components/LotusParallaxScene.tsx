import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";
import { wedding } from "../config";

export default function LotusParallaxScene() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 72, damping: 24, mass: 0.8 });
  const y = useSpring(pointerY, { stiffness: 72, damping: 24, mass: 0.8 });

  const farX = useTransform(x, (value) => value * 0.18);
  const farY = useTransform(y, (value) => value * 0.12);
  const midX = useTransform(x, (value) => value * 0.5);
  const midY = useTransform(y, (value) => value * 0.32);
  const nearX = useTransform(x, (value) => value * 0.9);
  const nearY = useTransform(y, (value) => value * 0.6);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 14);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="relative isolate min-h-[100dvh] overflow-hidden bg-ink"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <motion.img
        src={wedding.assets.sky}
        alt=""
        className="absolute inset-[-3%] h-[106%] w-[106%] object-cover"
        style={{ x: farX, y: farY }}
      />
      <motion.img
        src={wedding.assets.environment}
        alt=""
        className="absolute inset-[-3%] z-[1] h-[106%] w-[106%] object-cover"
        style={{ x: midX, y: midY }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,29,.08),rgba(4,12,29,.08)_48%,rgba(4,12,29,.9))]" />

      <div className="absolute left-1/2 top-[34%] z-[2] w-[58%] max-w-[620px] -translate-x-1/2 sm:top-[38%] sm:w-[36%]">
        <motion.img
          src={wedding.assets.mandap}
          alt=""
          className="w-full drop-shadow-[0_16px_46px_rgba(244,210,153,.22)]"
          style={{ x: midX, y: midY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {[12, 34, 70, 87].map((left, index) => (
        <motion.div
          key={left}
          className="absolute z-[3] w-9 sm:w-12"
          style={{
            left: `${left}%`,
            bottom: `${18 + (index % 2) * 7}%`,
            x: midX,
            y: midY,
          }}
        >
          <motion.img
            src={wedding.assets.diya}
            alt=""
            className="w-full"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -5, 0], opacity: [0.65, 0.95, 0.65] }
            }
            transition={{
              duration: 3.8 + index * 0.35,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        </motion.div>
      ))}

      <motion.img
        src={wedding.assets.barge}
        alt={`${wedding.groom} and ${wedding.bride} travelling by lotus barge`}
        className="absolute bottom-[4%] left-[-9%] z-[7] w-[70%] max-w-[570px] drop-shadow-[0_24px_52px_rgba(0,0,0,.62)] sm:left-[1%] sm:w-[48%]"
        style={{ x: nearX, y: nearY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.img
        src={wedding.assets.foregroundLotus}
        alt=""
        className="absolute bottom-[-3%] right-[-28%] z-[8] w-[112%] max-w-none opacity-95 sm:right-[-10%] sm:w-[59%]"
        style={{ x: nearX, y: nearY }}
      />

      <img
        src={wedding.assets.frame}
        alt=""
        className="pointer-events-none absolute inset-2 z-20 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-fill opacity-70 sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]"
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col items-center px-7 pb-[48vh] pt-[7vh] text-center text-pearl [text-shadow:0_2px_22px_rgba(4,12,29,.9)] sm:pb-0 sm:pt-[8vh]"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[10px] uppercase tracking-[0.34em] text-moon">
          Together with their families
        </p>
        <h1 className="font-display mt-4 text-[3.7rem] leading-[0.86] text-pearl sm:text-7xl">
          {wedding.groom}
          <span className="font-script block py-2 text-3xl text-lotus-light sm:text-4xl">
            and
          </span>
          {wedding.bride}
        </h1>
        <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-pearl/72">
          <span>{wedding.dayNum}</span>
          <span className="h-px w-8 bg-moon/50" />
          <span>{wedding.monthLabel}</span>
          <span className="h-px w-8 bg-moon/50" />
          <span>{wedding.yearLabel}</span>
        </div>
        <p className="mt-3 text-xs tracking-[0.16em] text-pearl/62">
          {wedding.venue.name}, {wedding.venue.address}
        </p>
      </motion.div>
    </section>
  );
}
