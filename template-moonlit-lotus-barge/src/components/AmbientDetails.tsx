import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "../config";

export default function AmbientDetails() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      {[0, 1].map((index) => (
        <motion.img
          key={index}
          src={wedding.assets.petals}
          alt=""
          className="absolute -top-[55vh] w-[46vw] min-w-64 max-w-md opacity-45"
          style={{ left: index === 0 ? "-8vw" : "62vw" }}
          animate={{
            y: ["0vh", "170vh"],
            x: index === 0 ? [0, 38, -12] : [0, -44, 18],
            rotate: index === 0 ? [0, 20, -8] : [8, -16, 12],
          }}
          transition={{
            duration: 18 + index * 5,
            delay: index * 4,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}
    </div>
  );
}
