import { Phone } from "lucide-react";
import footerFloral from "@/assets/footer-floral.jpg";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  const { couple, footer } = invitation;

  return (
    <footer className="relative isolate overflow-hidden pt-24 pb-12 text-center">
      <img
        src={footerFloral}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={912}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-parchment/55" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-parchment to-transparent"
      />

      <Reveal className="px-6">
        <p className="font-display text-3xl tracking-[0.16em] text-pine uppercase">
          {couple.brideShort} <span className="text-gold">&</span> {couple.groomShort}
        </p>
        <div className="mx-auto mt-5 w-24 gold-rule" />
        <p className="mt-6 text-sm text-ink/80">{footer.families}</p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {footer.contacts.map((c) => (
            <a
              key={c.phone}
              href={`tel:${c.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-parchment/70 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-ink/80 uppercase transition-colors hover:bg-gold/15 active:scale-95"
            >
              <Phone className="size-3.5 text-gold" aria-hidden />
              {c.name}
            </a>
          ))}
        </div>

        <p className="mt-10 text-[0.6rem] tracking-[0.32em] text-ink/60 uppercase">
          {couple.hashtag}
        </p>
      </Reveal>
    </footer>
  );
}
