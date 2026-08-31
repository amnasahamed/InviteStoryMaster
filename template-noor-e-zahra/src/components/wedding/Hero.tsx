import { motion } from "motion/react";
import { WEDDING } from "@/lib/wedding";
import Aurora from "@/components/Aurora";
import Petals from "./Petals";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16">
      <Aurora />
      <Petals />

      <img
        src="https://media.invitestory.in/noor-e-zahra/images/floral-corner.png"
        alt=""
        aria-hidden
        width={1024}
        height={1024}
        className="pointer-events-none absolute -left-20 -top-16 w-64 rotate-[-8deg] opacity-80 sm:w-80"
      />
      <img
        src="https://media.invitestory.in/noor-e-zahra/images/floral-corner.png"
        alt=""
        aria-hidden
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-16 -right-20 w-64 scale-x-[-1] rotate-[8deg] opacity-80 sm:w-80"
      />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.16, delayChildren: 0.15 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-body text-[0.68rem] uppercase tracking-[0.42em] text-gold-deep"
        >
          Bismillah
        </motion.p>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-5 font-arabic text-[1.55rem] leading-[2.6rem] text-gold-deep"
          dir="rtl"
          lang="ar"
        >
          {WEDDING.duaArabic}
        </motion.p>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mt-3 max-w-xs font-display text-sm italic leading-relaxed text-muted-foreground"
        >
          {WEDDING.duaTranslit}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mt-7 hairline w-40"
        />

        <motion.h1
          variants={rise}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-7 font-name text-4xl font-semibold uppercase leading-[1.05] tracking-[0.06em] text-gold-gradient sm:text-5xl"
        >
          {WEDDING.bride.first}
          <br />
          {WEDDING.bride.last}
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="-mt-1 font-script text-3xl text-foreground/80"
        >
          {WEDDING.bride.script}
        </motion.p>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="my-4 font-script text-2xl text-gold"
        >
          &amp;
        </motion.p>

        <motion.h2
          variants={rise}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-name text-4xl font-semibold uppercase leading-[1.05] tracking-[0.06em] text-gold-gradient sm:text-5xl"
        >
          {WEDDING.groom.first}
          <br />
          {WEDDING.groom.last}
        </motion.h2>

        <motion.p
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="-mt-1 font-script text-3xl text-foreground/80"
        >
          {WEDDING.groom.script}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-9 inline-flex flex-col items-center gap-1 rounded-2xl border border-gold-soft/70 bg-card/60 px-6 py-4 backdrop-blur-sm"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <span className="font-body text-[0.6rem] uppercase tracking-[0.35em] text-gold-deep">
            {WEDDING.eventName}
          </span>
          <span className="font-display text-2xl text-foreground">
            {WEDDING.day} {WEDDING.dateLabel} {WEDDING.year}
          </span>
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            {WEDDING.weekday} · {WEDDING.time}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ y: [0, 9, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 z-10 h-9 w-[1px] bg-gold"
      />
    </section>
  );
}

export default Hero;
