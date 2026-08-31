import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="text-center">
      <p className="font-body text-[0.62rem] uppercase tracking-[0.42em] text-gold-deep">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-light tracking-wide text-foreground">
        {title}
      </h2>
      <img
        src="https://media.invitestory.in/noor-e-zahra/images/gold-flourish.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={512}
        className="mx-auto mt-2 w-40 opacity-70"
      />
    </Reveal>
  );
}
