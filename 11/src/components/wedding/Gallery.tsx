import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import heroArch from "@/assets/hero-arch.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import { Reveal } from "./Reveal";

const PHOTOS = [
  { src: story2, alt: "The couple in a lotus garden" },
  { src: story1, alt: "The couple seated under a golden mandap" },
  { src: story3, alt: "Mehendi and haldi celebrations" },
  { src: heroArch, alt: "The couple beneath an ornate golden arch" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16">
      <Reveal className="px-5 text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-pine uppercase">Moments</h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />
      </Reveal>

      <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="relative w-[72vw] max-w-xs shrink-0 snap-center overflow-hidden rounded-t-[3rem] border border-gold/45 transition-transform duration-300 active:scale-[0.97]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-2 rounded-t-[2.7rem] border border-parchment/40" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-pine/90 p-5"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-5 right-5 text-parchment"
              onClick={() => setOpen(null)}
            >
              <X className="size-6" />
            </button>
            <motion.img
              key={open}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={PHOTOS[open]!.src}
              alt={PHOTOS[open]!.alt}
              className="max-h-[80svh] w-auto rounded-t-[3rem] border border-gold/50 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
