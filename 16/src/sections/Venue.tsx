import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { invite, mapsEmbedUrl, mapsDirectionsUrl } from "@/config";

export default function Venue() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-6">
      <img
        src="assets/bg-texture.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto max-w-xl text-center"
      >
        <div className="ornament-divider text-xl">❁</div>
        <h2 className="mt-4 font-script text-5xl sm:text-6xl text-gradient-gold">The Venue</h2>

        <div className="mt-8 flex items-start justify-center gap-2">
          <MapPin size={20} className="mt-1 shrink-0 text-[hsl(var(--sindoor))]" />
          <div>
            <p className="font-serif-body font-semibold text-xl sm:text-2xl">{invite.venueName}</p>
            <p className="font-serif-body text-base text-[hsl(var(--foreground)/0.7)]">
              {invite.venueAddress}
            </p>
          </div>
        </div>

        {/* Live map preview */}
        <div className="card-frame mt-8 overflow-hidden rounded-3xl">
          <iframe
            title={`Map — ${invite.venueName}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full sm:h-80 border-0"
            allowFullScreen
          />
        </div>

        <a
          href={mapsDirectionsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b5741b] to-[#e8a93c] px-7 py-3 font-caps text-[11px] text-white shadow-lg transition-transform hover:scale-[1.04] active:scale-95"
        >
          <Navigation size={15} />
          Get Directions
        </a>
      </motion.div>
    </section>
  );
}
