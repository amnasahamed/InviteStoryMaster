import { MapPin, Navigation, Phone } from "lucide-react";
import { invitation } from "@/config/invitation";
import { mapsDirectionsUrl, mapsEmbedUrl, mapsPlaceUrl } from "@/lib/invite-utils";
import { Reveal } from "./Reveal";

export function Venue() {
  const { venue, contacts } = invitation;

  return (
    <section id="venue" className="relative px-5 py-16">
      <Reveal className="mx-auto mb-8 max-w-md text-center">
        <p className="font-kicker text-gold text-[0.68rem] tracking-[0.42em] uppercase">Where</p>
        <h2 className="font-display text-maroon mt-3 text-3xl sm:text-4xl">{venue.name}</h2>
        <p className="font-body text-ink/70 mt-2 text-sm leading-6">{venue.address}</p>
      </Reveal>

      <Reveal className="mx-auto max-w-lg">
        <div className="border-gold/30 overflow-hidden rounded-3xl border shadow-[0_20px_50px_-36px_var(--shadow-gold)]">
          <iframe
            title={`Map showing ${venue.name}`}
            src={mapsEmbedUrl(venue.lat, venue.lng, venue.name)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 sm:h-80"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={mapsDirectionsUrl(venue.lat, venue.lng)}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm"
          >
            <Navigation className="size-4" aria-hidden />
            Get directions
          </a>
          <a
            href={mapsPlaceUrl(venue.lat, venue.lng)}
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm"
          >
            <MapPin className="size-4" aria-hidden />
            Open in Maps
          </a>
        </div>

        <p className="font-body text-ink/60 mt-4 text-center text-xs">{venue.directionsNote}</p>

        <div className="border-gold/25 bg-paper/70 mt-6 rounded-3xl border px-5 py-4">
          <p className="font-kicker text-gold text-[0.6rem] tracking-[0.3em] uppercase">
            For any help
          </p>
          <ul className="mt-3 space-y-2">
            {contacts.map((c) => (
              <li key={c.phone} className="flex items-center justify-between gap-3">
                <span className="font-body text-ink/75 text-sm">{c.name}</span>
                <a
                  href={`tel:${c.phone}`}
                  className="text-maroon font-body inline-flex items-center gap-1.5 text-sm"
                >
                  <Phone className="size-3.5" aria-hidden />
                  Call
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
