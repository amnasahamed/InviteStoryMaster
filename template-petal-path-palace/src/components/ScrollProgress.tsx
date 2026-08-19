import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2.5px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #c45a7a, #f2c4d0 45%, #c9a86a)",
      }}
    />
  );
}
