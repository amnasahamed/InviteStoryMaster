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
      <h2 className="font-display gold-text text-center text-[1.85rem] leading-[1.12] tracking-tight uppercase sm:text-4xl drop-shadow-[0_4px_16px_rgba(245,197,66,0.25)]">
        {children}
      </h2>
      <div className="mx-auto mt-3.5 flex items-center justify-center gap-3">
        <span className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-gold to-gold/80 rounded-full" />
        <img
          src="https://media.invitestory.in/grand-line-voyage/op-coin.png"
          alt=""
          width={24}
          height={24}
          loading="lazy"
          className="h-5 w-5 animate-[spin_6s_linear_infinite] drop-shadow-[0_0_8px_rgba(245,197,66,0.6)]"
        />
        <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent via-gold to-gold/80 rounded-full" />
      </div>
    </Reveal>
  );
}
