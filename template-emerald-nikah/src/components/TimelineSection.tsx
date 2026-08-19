import { motion } from "motion/react";
import { Sparkles, ScrollText, UtensilsCrossed, HeartHandshake, Moon } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Sparkles;
}

const EVENTS: TimelineEvent[] = [
  {
    time: "06:30 PM",
    title: "Baraat & Grand Welcome",
    subtitle: "Istiqbal",
    description: "Arrival of the groom's procession with traditional dhol beats, rose water shower, and welcome drinks.",
    icon: Sparkles,
  },
  {
    time: "07:15 PM",
    title: "The Nikah Ceremony",
    subtitle: "Ijab-e-Qubool",
    description: "Solemnisation of marriage according to Sunnah, recitation of Quranic verses, and acceptance of vows.",
    icon: ScrollText,
  },
  {
    time: "08:30 PM",
    title: "Royal Dastarkhwan (Feast)",
    subtitle: "Walima Dinner",
    description: "Authentic Hyderabadi celebratory banquet featuring Dum Biryani, Mirchi Ka Salan, Double Ka Meetha & Sheer Khurma.",
    icon: UtensilsCrossed,
  },
  {
    time: "10:30 PM",
    title: "Rukhsati & Blessings",
    subtitle: "Duas & Farewell",
    description: "The emotional send-off, surrounded by the prayers and blessings of both families under the holy Quran.",
    icon: Moon,
  },
];

export function TimelineSection() {
  return (
    <section id="itinerary" className="relative mx-auto max-w-lg px-6 py-20">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[90px]" />

      <div className="relative text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.45em] text-gold font-medium">
          Order of Celebrations
        </p>
        <h2 className="mt-2 font-display text-4xl italic text-gradient-gold sm:text-5xl">
          Event Itinerary
        </h2>
        <div className="gold-rule mx-auto mt-4 w-32" />
        <p className="mx-auto mt-3 max-w-xs text-xs text-cream/70">
          We request your gracious presence as each chapter unfolds on Saturday, 12 December 2026.
        </p>
      </div>

      <div className="relative mt-14 pl-4 sm:pl-8">
        {/* Continuous vertical glowing gold line */}
        <div className="absolute left-[27px] sm:left-[43px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-gold via-gold/50 to-gold/10" />

        <div className="space-y-10">
          {EVENTS.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Milestone Node */}
                <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-emerald-deep shadow-[0_0_15px_rgba(230,195,110,0.35)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                </div>

                {/* Event Card */}
                <div className="glass-tile-interactive flex-1 p-5 sm:p-6 border border-gold/35">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="gold-badge px-3.5 py-0.5 text-[0.68rem] font-semibold tracking-wider uppercase text-gold-bright">
                      {event.time}
                    </span>
                    <span className="font-script text-lg text-rose sm:text-xl font-medium">
                      {event.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-cream group-hover:text-gold-soft transition-colors">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-cream/75">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
