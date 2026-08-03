import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

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
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <h2 className="font-display gold-text text-center text-[1.65rem] leading-[1.15] tracking-tight uppercase sm:text-4xl">
        {children}
      </h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-2">
        <span className="h-px w-10 bg-gold/60" />
        <img
          src="/op-coin.png"
          alt=""
          width={24}
          height={24}
          loading="lazy"
          className="h-5 w-5 animate-[spin_6s_linear_infinite]"
        />
        <span className="h-px w-10 bg-gold/60" />
      </div>
    </Reveal>
  );
}
