import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { wedding } from "../config";

const LAYERS = {
  sky: ".https://media.invitestory.in/petal-path-palace/assets/layers/05-sky-palace.png",
  garden: ".https://media.invitestory.in/petal-path-palace/assets/layers/04-garden-guests.png",
  couple: ".https://media.invitestory.in/petal-path-palace/assets/layers/03-couple.png",
  foreground: ".https://media.invitestory.in/petal-path-palace/assets/layers/02-foreground-guests.png",
  arch: ".https://media.invitestory.in/petal-path-palace/assets/layers/01-arch-frame.png",
  full: ".https://media.invitestory.in/petal-path-palace/assets/layers/source-full.png",
} as const;

export default function ParallaxStage({ active }: { active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, mx, my]);

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const gardenY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const coupleY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "48%"]);
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "58%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleScene = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const archX = useTransform(smx, [-1, 1], [-16, 16]);
  const archMouseY = useTransform(smy, [-1, 1], [-8, 8]);
  const coupleX = useTransform(smx, [-1, 1], [-7, 7]);
  const gardenX = useTransform(smx, [-1, 1], [-3, 3]);

  return (
    <section
      ref={ref}
      className="relative h-[165svh] w-full"
      aria-label="Wedding illustration"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#1a0f1f]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(196,90,122,0.18), transparent 55%)",
          }}
        />

        {/* L5 — sky + palace */}
        <motion.div
          className="absolute inset-[-10%] z-[1] will-change-transform"
          style={{ y: skyY, scale: scaleScene }}
        >
          <motion.img
            src={LAYERS.sky}
            alt=""
            className="h-full w-full object-cover object-[50%_32%]"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.4, delay: 0.05 }}
          />
        </motion.div>

        {/* L4 — garden + guests */}
        <motion.div
          className="absolute inset-[-7%] z-[2] will-change-transform"
          style={{ y: gardenY, x: gardenX }}
        >
          <motion.img
            src={LAYERS.garden}
            alt=""
            className="h-full w-full object-cover object-[50%_55%]"
            draggable={false}
            initial={{ opacity: 0, y: 36 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 1.25, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Cohesion plate — full illustration for fidelity */}
        <motion.div
          className="absolute inset-[-5%] z-[3] will-change-transform"
          style={{ y: gardenY }}
        >
          <motion.img
            src={LAYERS.full}
            alt=""
            className="h-full w-full object-cover object-center"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 0.72 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
        </motion.div>

        {/* L3 — couple depth pop */}
        <motion.div
          className="absolute inset-0 z-[4] flex items-end justify-center will-change-transform"
          style={{ y: coupleY, x: coupleX }}
        >
          <motion.img
            src={LAYERS.couple}
            alt={`${wedding.bride} and ${wedding.groom}`}
            className="mb-[5%] h-[74%] w-auto max-w-[92%] object-contain drop-shadow-[0_24px_48px_rgba(40,10,30,0.45)]"
            style={{
              animation: active ? "breathe 5.5s ease-in-out infinite" : undefined,
            }}
            draggable={false}
            initial={{ opacity: 0, scale: 0.92, y: 50 }}
            animate={
              active
                ? { opacity: 0.92, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.92, y: 50 }
            }
            transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* L2 — foreground guests */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[5] h-[40%] will-change-transform"
          style={{ y: fgY }}
        >
          <motion.img
            src={LAYERS.foreground}
            alt=""
            className="h-full w-full object-cover object-bottom"
            draggable={false}
            initial={{ opacity: 0, y: 40 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 1.15, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a0f1f] via-[#1a0f1f]/65 to-transparent" />
        </motion.div>

        {/* L1 — arch frame */}
        <motion.div
          className="pointer-events-none absolute inset-[-3%] z-[6] will-change-transform"
          style={{ y: archY, x: archX }}
        >
          <motion.div
            className="h-full w-full"
            style={{ y: archMouseY }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 1.45, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={LAYERS.arch}
              alt=""
              className="h-full w-full object-cover"
              style={{
                transformOrigin: "50% 0%",
                animation: active
                  ? "tassel-sway 7.5s ease-in-out infinite"
                  : undefined,
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[7]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 38%, rgba(20,8,24,0.58) 100%)",
          }}
        />

        {/* Hero typography — brand first */}
        <motion.div
          className="absolute inset-x-0 bottom-[13%] z-[8] flex flex-col items-center px-6 text-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="font-display text-[11px] tracking-[0.42em] text-[#f2c4d0]/90"
          >
            {wedding.verse.blessing}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.25, duration: 0.95 }}
            className="mt-3 font-script text-[13.5vw] leading-[0.95] text-[#faf3eb] drop-shadow-[0_8px_28px_rgba(20,5,25,0.55)] sm:text-7xl"
          >
            {wedding.bride}
            <span className="mx-2 text-[#f2c4d0]">&</span>
            {wedding.groom}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.45, duration: 0.8 }}
            className="mt-3 text-[11px] uppercase tracking-[0.32em] text-[#e8dcc8]/85"
          >
            {wedding.dateLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-1.5 text-[10px] uppercase tracking-[0.28em] text-[#c9a86a]"
          >
            {wedding.timeLabel}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-5 left-1/2 z-[9] flex -translate-x-1/2 flex-col items-center gap-1.5"
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 1.9 }}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#f2c4d0]/70">
            Walk the path
          </span>
          <motion.div
            className="h-8 w-px origin-top bg-gradient-to-b from-[#f2c4d0] to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.9, 0.3, 0.9] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
