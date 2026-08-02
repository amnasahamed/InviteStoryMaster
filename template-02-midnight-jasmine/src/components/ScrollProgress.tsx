import { motion, useScroll, useSpring } from "framer-motion";

// Thin champagne-to-blush progress bar pinned to the top of the viewport
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#e2c88f] via-[#eeb2c0] to-[#e2c88f]"
      style={{ scaleX }}
    />
  );
}
