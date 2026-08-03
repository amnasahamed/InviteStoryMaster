import { MapPin, Navigation } from "lucide-react";
import Reveal from "@/components/Reveal";
import { wedding } from "@/config";
import { googleMapsUrl } from "@/lib/calendar";

export default function Venue() {
  return (
    <section className="relative overflow-visible px-6 pb-60 pt-20">
      <img
        src="/assets/texture-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#9a6b1f]">వేదిక</p>
          <h2 className="font-script mt-2 text-5xl text-[#7b1e1e]">The Venue</h2>
          <p className="font-display mt-4 text-lg uppercase tracking-[0.1em] text-[#3d2b1f]">
            {wedding.venueName}
          </p>
          <p className="mt-1 text-[13px] tracking-wide text-[#6b543a]">{wedding.venueAddress}</p>
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          {/* live map preview in a gold frame */}
          <div className="card-frame overflow-hidden rounded-2xl p-2">
            <div className="relative overflow-hidden rounded-xl">
              <iframe
                title="Venue map"
                src={wedding.osmEmbed}
                className="h-64 w-full border-0"
                style={{ filter: "sepia(0.28) saturate(0.85) contrast(0.95)" }}
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[#9a6b1f]/30" />
            </div>
          </div>

          <a
            href={googleMapsUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#8c2323] to-[#6d1717] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f3e3c3] shadow-[0_10px_24px_-10px_rgba(109,23,23,0.7)] transition-transform active:scale-95"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 text-center">
          <div className="hairline-gold mx-auto w-32" />
          <p className="font-script mt-6 text-4xl text-[#7b1e1e]">Bless us with your presence</p>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-[#5a4632]">
            Your presence is the greatest blessing — please come, bless the couple, and celebrate with us.
          </p>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] tracking-[0.14em] text-[#6b543a]">
            <MapPin className="h-3.5 w-3.5 text-[#8c2323]" />
            {wedding.venueLine1}, {wedding.venueLine2}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
