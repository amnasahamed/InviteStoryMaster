import { MessageCircle, Phone } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import Aurora from "../components/Aurora";
import { wedding, whatsappUrl } from "../config";

export default function Rsvp() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Aurora className="opacity-50" />
      <SectionHeading kicker="Will You Join Us?" title="RSVP" />

      <Reveal className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <p className="font-display text-xl italic leading-relaxed text-[#f3e7d3]/85">
          Your presence is the greatest gift. Please confirm so we can reserve
          your seat at the celebration.
        </p>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#d9b36a]">
          {wedding.rsvp.deadline}
        </span>

        <div className="grid w-full grid-cols-1 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-[#1f9e56] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-white shadow-[0_8px_30px_rgba(31,158,86,0.4)] transition-transform active:scale-95"
          >
            <MessageCircle size={17} /> Confirm on WhatsApp
          </a>
          <a
            href={`tel:${wedding.rsvp.phone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-3 rounded-full border border-[#d9a441]/50 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-[#f6e2ae] transition-colors hover:bg-[#d9a441]/10 active:scale-95"
          >
            <Phone size={16} /> {wedding.rsvp.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
