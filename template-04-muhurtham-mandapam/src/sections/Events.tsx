import { Flower2, HandHeart, Flame, Sparkles, CalendarPlus, Download } from "lucide-react";
import Reveal from "@/components/Reveal";
import { events, type WeddingEvent } from "@/config";
import { googleCalendarUrl, downloadIcs } from "@/lib/calendar";

const icons = {
  flower: Flower2,
  hands: HandHeart,
  fire: Flame,
  sparkles: Sparkles,
} as const;

function EventCard({ ev, index }: { ev: WeddingEvent; index: number }) {
  const Icon = icons[ev.icon];
  const highlight = ev.id === "muhurtham";
  return (
    <Reveal delay={index * 0.08}>
      <div
        className={`card-frame relative overflow-hidden rounded-2xl px-6 py-6 ${
          highlight ? "ring-1 ring-[#8c2323]/40" : ""
        }`}
      >
        {highlight && (
          <span className="absolute right-0 top-0 rounded-bl-xl bg-[#8c2323] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f3e3c3]">
            Main Ceremony
          </span>
        )}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#8c2323] to-[#6d1717] text-[#f3e3c3] shadow-md">
            <Icon className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[11px] tracking-[0.2em] text-[#9a6b1f]">{ev.telugu}</p>
            <h3 className="font-display text-xl text-[#3d2b1f]">{ev.title}</h3>
            <p className="mt-1.5 text-[13px] font-medium text-[#8c2323]">{ev.dateLabel}</p>
            <p className="text-[12px] tracking-wide text-[#6b543a]">{ev.timeLabel}</p>
            {ev.note && <p className="mt-2 text-[12.5px] leading-relaxed text-[#5a4632]">{ev.note}</p>}
          </div>
        </div>

        <div className="mt-5 flex gap-2.5">
          <a
            href={googleCalendarUrl(ev)}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#b98a2f]/60 bg-[#fdf8ea]/70 px-3 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9a6b1f] transition-transform active:scale-95"
          >
            <CalendarPlus className="h-3.5 w-3.5" />
            Google
          </a>
          <button
            onClick={() => downloadIcs(ev)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#b98a2f]/60 bg-[#fdf8ea]/70 px-3 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9a6b1f] transition-transform active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            Apple / ICS
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function Events() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7efdb] via-[#f1e2c2] to-[#f7efdb] px-6 py-20">
      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#9a6b1f]">వేడుకలు</p>
          <h2 className="font-script mt-2 text-5xl text-[#7b1e1e]">The Celebrations</h2>
          <div className="hairline-gold mx-auto mt-5 w-32" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {events.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
