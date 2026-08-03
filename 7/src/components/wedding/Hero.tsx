import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "./Aurora";
import { wedding } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const coupleY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ivory"
    >
      <Aurora className="opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-transparent via-royal/70 to-royal-deep" />
      <img
        src="/images/swirl-band.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[14%] w-full opacity-60 mix-blend-multiply"
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-20 mx-auto w-full max-w-md px-7 pt-12 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[0.94rem] leading-relaxed text-foreground/85"
        >
          {wedding.invite}
        </motion.p>
      </motion.div>

      <motion.img
        src="/images/couple-hero.png"
        alt={`Illustration of ${wedding.bride.name} and ${wedding.groom.name}`}
        width={1024}
        height={1280}
        style={{ y: coupleY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative z-10 mx-auto -mt-2 w-[86%] max-w-[380px] drop-shadow-[0_24px_50px_rgba(12,40,120,0.28)]"
      />

      <img
        src="/images/lotus-cluster.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[38%] z-[15] w-full"
      />
      <div className="absolute inset-x-0 bottom-0 z-[16] h-[38%] bg-gradient-to-b from-royal via-royal to-royal-deep" />

      <motion.img
        src="/images/butterfly.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-6 top-[34%] z-20 w-12 animate-float-slow opacity-90"
      />
      <motion.img
        src="/images/butterfly.png"
        alt=""
        aria-hidden
        style={{ animationDelay: "-3s" }}
        className="pointer-events-none absolute right-8 top-[27%] z-20 w-9 animate-float-slow opacity-80"
      />

      <div className="relative z-20 -mt-6 flex flex-1 flex-col justify-end px-6 pb-10 text-center">
        <div className="mx-auto w-full max-w-md">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-[3.15rem] leading-[0.95] text-ivory drop-shadow-[0_6px_20px_rgba(4,20,70,0.45)]"
          >
            {wedding.bride.name}
            <span className="mx-2 block font-display text-lg tracking-[0.5em] text-gold/90 uppercase">
              &amp;
            </span>
            {wedding.groom.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-5 space-y-1 font-body text-[0.72rem] tracking-[0.18em] text-ivory/80 uppercase"
          >
            <p>{wedding.bride.parents}</p>
            <p>{wedding.groom.parents}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 2.4 } }}
            className="mt-8 flex flex-col items-center gap-1 text-ivory/70"
          >
            <span className="font-body text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}