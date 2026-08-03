import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CalendarPlus, Clock, MapPin, Navigation, Heart } from "lucide-react";

import { Aurora } from "@/components/Aurora";
import { Countdown } from "@/components/Countdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zayan & Inaya — Wedding Invitation | 12 Dec 2026" },
      {
        name: "description",
        content:
          "You are warmly invited to the wedding of Zayan Abdul Rahman and Inaya Fathima on 12 December 2026 at Falaknuma Gardens, Hyderabad.",
      },
      { property: "og:title", content: "Zayan & Inaya — Wedding Invitation | 12 Dec 2026" },
      {
        property: "og:description",
        content:
          "You are warmly invited to the wedding of Zayan Abdul Rahman and Inaya Fathima on 12 December 2026 at Falaknuma Gardens, Hyderabad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const WEDDING_DATE = new Date("2026-12-12T18:30:00+05:30");
const VENUE = "Falaknuma Gardens, Engine Bowli, Hyderabad, Telangana 500053";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`;

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}




function icsHref() {
  const end = new Date(WEDDING_DATE.getTime() + 4 * 3600000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "SUMMARY:Wedding of Zayan & Inaya",
    `DTSTART:${fmt(WEDDING_DATE)}`,
    `DTEND:${fmt(end)}`,
    `LOCATION:${VENUE}`,
    "DESCRIPTION:With joy we invite you to our Nikah & Walima.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-16"
    >
      <img
        src="/images/hero-bg.jpg"
        alt=""
        aria-hidden
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <Aurora className="mix-blend-screen" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

      <img
        src="/images/roses.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -left-16 -top-10 w-56 opacity-95 drop-shadow-2xl sm:w-72"
      />
      <img
        src="/images/daisies.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -bottom-8 -right-12 w-44 opacity-90 drop-shadow-2xl sm:w-56"
      />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-arabic text-2xl leading-loose text-gold-soft">
            بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="mx-auto mt-3 max-w-xs text-[0.7rem] leading-relaxed tracking-wide text-cream/70">
            May Allah bless you both and shower His blessings upon you, and unite you together in
            goodness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8"
        >
          <img
            src="/images/parchment.png"
            alt=""
            aria-hidden
            width={1024}
            height={1280}
            className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
            <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-ink/60">
              Together with families
            </p>
            <h1 className="mt-3 font-display text-[2.6rem] font-semibold italic leading-[0.95] text-ink sm:text-5xl">
              Zayan
              <br />
              Abdul Rahman
            </h1>
            <p className="mt-1 font-script text-xl text-rose-deep">S/o Abdul Rahman &amp; Zubaida</p>

            <div className="my-4 grid h-14 w-14 place-items-center">
              <Heart className="absolute h-12 w-12 fill-ink/85 text-ink/85" strokeWidth={0} />
              <span className="relative font-script text-base text-cream">With</span>
            </div>

            <h2 className="font-display text-[2.6rem] font-semibold italic leading-[0.95] text-ink sm:text-5xl">
              Inaya
              <br />
              Fathima
            </h2>
            <p className="mt-1 font-script text-xl text-rose-deep">D/o Kareem &amp; Safiya</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-6 text-center text-xs uppercase tracking-[0.45em] text-gold"
        >
          12 · 12 · 2026
        </motion.p>
      </motion.div>
    </section>
  );
}

function Couple() {
  const people = [
    {
      img: "/images/groom.jpg",
      name: "Zayan",
      role: "The Groom",
      note: "A gentle heart, an old soul, and a laugh the whole family knows by sound.",
    },
    {
      img: "/images/bride.jpg",
      name: "Inaya",
      role: "The Bride",
      note: "Grace in every gesture, with a kindness that turns houses into homes.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-md px-6 pb-10 pt-20">
      <Reveal>
        <p className="text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold">
          Two souls, one dua
        </p>
        <h2 className="mt-3 text-center font-display text-4xl italic text-gradient-gold">
          The Couple
        </h2>
      </Reveal>

      <div className="mt-12 space-y-12">
        {people.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[50%] bg-gold/15 blur-2xl" />
                <img
                  src={p.img}
                  alt={`${p.role}, ${p.name}`}
                  loading="lazy"
                  width={896}
                  height={1152}
                  className="relative h-56 w-56 rounded-[46%_54%_50%_50%/50%_46%_54%_50%] border border-gold/35 object-cover shadow-[var(--shadow-lux)]"
                />
              </div>
              <p className="mt-6 text-[0.6rem] uppercase tracking-[0.4em] text-cream/55">
                {p.role}
              </p>
              <h3 className="mt-2 font-display text-4xl italic text-cream">{p.name}</h3>
              <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-cream/65">
                {p.note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      
    </section>
  );
}

function CountdownSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <img
        src="/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-10"
      />
      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-gold">Counting every moment</p>
          <h2 className="mt-3 font-display text-4xl italic text-gradient-gold">Until We Say Qubool</h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Countdown target={WEDDING_DATE.getTime()} />
        </Reveal>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section className="relative mx-auto max-w-md px-6 py-16">
      <Reveal>
        <h2 className="text-center font-display text-4xl italic text-gradient-gold">
          Event Details
        </h2>
        <div className="gold-rule mx-auto mt-5 w-40" />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="glass-tile p-6 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-cream/55">Nikah &amp; Walima</p>
          <p className="mt-4 font-display text-3xl text-cream">Saturday, 12 December 2026</p>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-cream/70">
            <Clock className="h-4 w-4 shrink-0 text-gold" /> 6:30 PM onwards
          </p>
          <div className="gold-rule my-5" />
          <p className="flex items-start justify-center gap-2 text-sm leading-relaxed text-cream/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              Falaknuma Gardens
              <br />
              Engine Bowli, Hyderabad 500053
            </span>
          </p>

          <motion.a
            href={icsHref()}
            download="zayan-inaya-wedding.ics"
            whileTap={{ scale: 0.96 }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-ink shadow-[var(--shadow-lux)] transition-transform"
            style={{ background: "var(--gradient-gold)" }}
          >
            <CalendarPlus className="h-4 w-4" />
            Add to Calendar
          </motion.a>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-6">
        <div className="glass-tile overflow-hidden">
          <img
            src="/images/map.jpg"
            alt="Stylised map showing the wedding venue location"
            loading="lazy"
            width={1024}
            height={768}
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <p className="font-display text-xl text-cream">Falaknuma Gardens</p>
            <p className="mt-1 text-xs text-cream/60">Approx. 25 min from Rajiv Gandhi Airport</p>
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.96 }}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/45 px-6 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold/10"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-20">
      <Aurora className="opacity-70" />
      <img
        src="/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-24 left-1/2 w-[150%] -translate-x-1/2 opacity-[0.12]"
      />
      <img
        src="/images/roses.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -right-14 top-4 w-40 opacity-80"
      />
      <div className="relative mx-auto max-w-md text-center">
        <img
          src="/images/divider.png"
          alt=""
          aria-hidden
          loading="lazy"
          width={1024}
          height={512}
          className="mx-auto w-48 opacity-80"
        />
        <Reveal className="mt-6">
          <p className="font-display text-2xl italic leading-relaxed text-cream/90">
            “May He unite your hearts in goodness, strengthen you with patience, and grant you
            harmony, prosperity, and everlasting happiness.”
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 font-script text-3xl text-gradient-gold">Zayan &amp; Inaya</p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] text-cream/50">
            We await your duas &amp; presence
          </p>
        </Reveal>
        <p className="mt-10 inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-cream/35">
          Made with <Heart className="h-3 w-3 fill-rose text-rose" /> for our families
        </p>
      </div>
    </footer>
  );
}

function Invitation() {
  return (
    <main className="min-h-screen bg-emerald-deep">
      <Hero />
      <Couple />
      <CountdownSection />
      <Details />
      <Footer />
    </main>
  );
}
