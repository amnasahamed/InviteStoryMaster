import { Navigation } from "lucide-react";
const mapPreview = "https://media.invitestory.in/sage-parchment/src/assets/map-preview.jpg";
import { invitation } from "@/config/invitation";
import { directionsUrl, mapsUrl } from "@/lib/wedding";
import { Reveal } from "./Reveal";

export function Venue() {
  const { venue } = invitation;

  return (
    <section className="px-5 py-16">
      <Reveal className="mx-auto max-w-lg text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-pine uppercase">The Venue</h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />

        <a
          href={mapsUrl()}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 block overflow-hidden rounded-t-[3rem] border border-gold/50 shadow-[0_24px_50px_-40px_var(--color-ink)]"
        >
          <div className="relative">
            <img
              src={mapPreview}
              alt={`Illustrated map showing the location of ${venue.name}`}
              loading="lazy"
              width={1200}
              height={800}
              className="h-56 w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105 sm:h-64"
            />
            <span className="absolute inset-0 bg-pine/0 transition-colors group-hover:bg-pine/10" />
            <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-parchment/90 px-4 py-2 text-[0.6rem] tracking-[0.24em] text-ink/80 uppercase">
              <Navigation className="size-3.5 text-gold" aria-hidden />
              Open in maps
            </span>
          </div>
        </a>

        <h3 className="mt-7 font-display text-2xl text-pine">{venue.name}</h3>
        <p className="mt-2 text-sm text-ink/70">{venue.address}</p>

        <a
          href={directionsUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-[0.65rem] tracking-[0.24em] text-ink/80 uppercase transition-colors hover:bg-gold/10 active:scale-95"
        >
          Get directions
        </a>
      </Reveal>
    </section>
  );
}
