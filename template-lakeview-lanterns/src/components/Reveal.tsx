import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Reveal({
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
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 flex flex-col items-start gap-3 text-left sm:mb-16">
      <span className="section-kicker">
        {kicker}
      </span>
      <h2 className="font-display max-w-2xl text-5xl font-medium leading-[0.92] tracking-[-0.04em] text-[#f4e7d0] sm:text-7xl">{title}</h2>
    </Reveal>
  );
}
