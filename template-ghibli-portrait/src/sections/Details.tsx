import { Church, Clock, Shirt } from "lucide-react"
import config from "@/config"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

/**
 * SECTION 4 · Wedding Details — the ceremony, dress code.
 */
export default function Details() {
  const d = config.details
  const card = {
    icon: Church,
    title: d.ceremony.title,
    venue: d.ceremony.venue,
    time: d.ceremony.time,
    note: d.ceremony.note,
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Wedding Details" title="When & where" />

      <Reveal>
        <div className="mx-auto max-w-md">
          <div className="group photo-frame rounded-2xl bg-ivory/80 p-7 text-center transition-transform duration-500 hover:-translate-y-1.5">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-cream transition-transform duration-500 group-hover:scale-110">
              <card.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl text-ink">{card.title}</h3>
            <p className="mt-1 font-body text-sm font-medium text-ink/80">{card.venue}</p>
            <div className="mx-auto my-3 flex items-center justify-center gap-2 text-gold">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="font-body text-xs uppercase tracking-[0.18em]">{card.time}</span>
            </div>
            <p className="font-body text-xs font-light italic text-muted-foreground">{card.note}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-8">
        <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-gold/25 bg-ivory/70 px-6 py-3">
          <Shirt className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
          <p className="text-center font-body text-xs uppercase tracking-[0.16em] text-ink/75">
            {d.dressCode}
          </p>
        </div>
      </Reveal>
    </section>
  )
}