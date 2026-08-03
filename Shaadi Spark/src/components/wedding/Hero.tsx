import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroArch from "@/assets/hero-arch.jpg";
import { invitation } from "@/config/invitation";
import { AuroraBackdrop } from "./AuroraBackdrop";
import { useOpened } from "./OpenGate";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { couple, invite, event, venue } = invitation;
  const opened = useOpened();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-sage-deep"
    >
      <AuroraBackdrop />

      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img
          src={heroArch}
          alt="Illustrated Mughal arch with an Indian bride and groom surrounded by lotus flowers"
          width={1024}
          height={1536}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine/25 via-transparent to-parchment" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mt-auto w-full bg-gradient-to-t from-parchment via-parchment/75 to-transparent px-6 pt-24 pb-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={opened ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[0.7rem] tracking-[0.42em] text-ink/70 uppercase"
        >
          {invite.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: "0.4em" }}
          animate={opened ? { opacity: 1, y: 0, letterSpacing: "0.16em" } : false}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-md text-4xl leading-tight font-light text-pine uppercase sm:text-5xl"
        >
          {couple.brideShort}
          <span className="mx-3 inline-block font-display text-2xl lowercase italic text-pine/70">
            and
          </span>

          {couple.groomShort}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={opened ? { opacity: 1, scaleX: 1 } : false}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mx-auto mt-6 w-52 gold-rule"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-sm text-ink/80"
        >
          {invite.line}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-3 font-display text-3xl tracking-[0.18em] text-gold"
        >
          {event.dateLabel}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={opened ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-2 text-[0.72rem] tracking-[0.28em] text-ink/70 uppercase"
        >
          {venue.name}
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="text-[0.6rem] tracking-[0.3em] text-ink/60 uppercase">scroll</span>
        <motion.div
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-2 h-10 w-px bg-gold"
        />
      </motion.div>
    </section>
  );
}
