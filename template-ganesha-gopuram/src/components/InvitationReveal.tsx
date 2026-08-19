import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  active: boolean;
  onFinished: () => void;
};

export default function InvitationReveal({ active, onFinished }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(onFinished, reduce ? 120 : 1100);
    return () => window.clearTimeout(t);
  }, [active, onFinished, reduce]);

  if (!active) return null;

  if (reduce) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[90] bg-ivory-paper/80" />
    );
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#F4E4B8_0%,#D4AF37_35%,#3A2618_100%)]"
        initial={{ scale: 0.35, opacity: 0.95 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #2C1A10 0%, transparent 45%, transparent 55%, #2C1A10 100%)",
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.95, ease: [0.32, 0.72, 0, 1] }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-px w-40 bg-gradient-to-r from-transparent via-gold-pale to-transparent"
          initial={{ scaleX: 0.2, opacity: 1 }}
          animate={{ scaleX: 2.5, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
