import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const photos = invitation.gallery;

  return (
    <section id="gallery" className="relative py-16">
      <Reveal className="mx-auto mb-8 max-w-md px-5 text-center">
        <p className="font-kicker text-gold text-[0.68rem] tracking-[0.42em] uppercase">Moments</p>
        <h2 className="font-display text-maroon mt-3 text-3xl sm:text-4xl">A glimpse of the days ahead</h2>
      </Reveal>

      <div className="scroll-strip flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {photos.map((photo, i) => (
          <button
            key={photo.alt}
            type="button"
            onClick={() => setActive(i)}
            className="border-gold/25 w-[76%] shrink-0 snap-center overflow-hidden rounded-3xl border shadow-[0_20px_46px_-34px_var(--shadow-gold)] transition-transform duration-300 active:scale-[0.98] sm:w-[46%]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={1008}
              height={1008}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-maroon/85 fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={photos[active]!.alt}
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={photos[active]!.src}
              alt={photos[active]!.alt}
              className="max-h-[80vh] w-full max-w-lg rounded-3xl object-contain"
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="text-paper absolute top-5 right-5"
            >
              <X className="size-7" aria-hidden />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
