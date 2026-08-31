import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Calendar, MapPin, Users, Sparkles } from "lucide-react";

interface Coin {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

export default function CelebrationDock() {
  const [visible, setVisible] = useState(false);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerCoins = () => {
    const newCoins: Coin[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * window.innerWidth * 0.8,
      y: -(Math.random() * 250 + 200),
      rotate: (Math.random() - 0.5) * 720,
      scale: Math.random() * 0.5 + 0.8,
    }));
    setCoins((prev) => [...prev, ...newCoins]);

    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => !newCoins.includes(c)));
    }, 1800);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Coins Celebration Animation */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5, rotate: 0 }}
              animate={{
                opacity: [1, 1, 0],
                y: [0, coin.y, coin.y + 400],
                x: [0, coin.x],
                rotate: coin.rotate,
                scale: coin.scale,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute"
            >
              <img
                src="https://media.invitestory.in/grand-line-voyage/op-coin.png"
                alt=""
                width={48}
                height={48}
                className="h-10 w-10 drop-shadow-[0_0_12px_rgba(245,197,66,0.8)]"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky Floating Dock */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-5 inset-x-0 z-40 mx-auto w-max px-4"
          >
            <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-gold/40 bg-ocean-deep/90 px-3 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(245,197,66,0.3)] backdrop-blur-lg">
              <button
                type="button"
                onClick={() => scrollTo("countdown-section")}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-accent tracking-wider text-parchment/90 transition-all hover:bg-gold/20 hover:text-gold active:scale-95 cursor-pointer"
              >
                <Compass className="h-3.5 w-3.5 text-gold" />
                <span className="hidden sm:inline uppercase">Voyage</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("event-details-section")}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-accent tracking-wider text-parchment/90 transition-all hover:bg-gold/20 hover:text-gold active:scale-95 cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5 text-gold" />
                <span className="hidden sm:inline uppercase">Details</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("event-details-section")}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-accent tracking-wider text-parchment/90 transition-all hover:bg-gold/20 hover:text-gold active:scale-95 cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span className="hidden sm:inline uppercase">Map</span>
              </button>

              <div className="h-4 w-px bg-gold/30 mx-0.5" />

              <button
                type="button"
                onClick={triggerCoins}
                className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold px-3.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-ocean-deep shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Celebrate with gold coins"
              >
                <Sparkles className="h-3.5 w-3.5 text-ocean-deep group-hover:rotate-45 transition-transform" />
                <span>Celebrate</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
