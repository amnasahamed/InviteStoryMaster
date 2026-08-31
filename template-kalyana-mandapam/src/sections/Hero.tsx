import { motion } from "framer-motion";
import { CalendarDays, MapPin, ChevronDown, CalendarPlus } from "lucide-react";
import { wedding, mainEvent } from "@/config";
import { googleCalendarUrl } from "@/lib/calendar";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-16">
      {/* texture */}
      <img
        src="/assets/texture-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(120,72,20,0.14)_100%)]" />

      {/* hanging garland — sways gently (wrapper centers; rotate anim must not override translate) */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex justify-center"
      >
        <img
          src="https://media.invitestory.in/kalyana-mandapam/assets/garland-top.webp"
          alt=""
          className="anim-sway w-[135%] max-w-none select-none sm:w-full"
        />
      </motion.div>

      {/* content */}
      <div className="relative z-20 mt-[26svh] flex w-full max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[13px] tracking-[0.18em] text-[#8c2323]"
        >
          {wedding.blessing}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease }}
          className="mt-5"
        >
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#9a6b1f]">
            {wedding.occasionTelugu}
          </p>
          <h1 className="font-script mt-1 text-[19vw] leading-[1.05] text-[#7b1e1e] sm:text-8xl">
            Wedding
            <span className="font-display block text-[7.5vw] uppercase tracking-[0.3em] text-[#9a6b1f] sm:text-3xl">
              Muhurtham
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1, ease }}
          className="font-script mt-4 flex items-baseline gap-3 text-[11vw] leading-none text-[#3d2b1f] sm:text-6xl"
        >
          <span>{wedding.bride}</span>
          <span className="font-display text-[6vw] text-[#b98a2f] sm:text-3xl">❤</span>
          <span>{wedding.groom}</span>
        </motion.div>

        {/* couple standing in front of the temple mandap */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease }}
          className="relative mt-7 flex w-full justify-center"
        >
          {/* temple mandap — behind the couple */}
          <img
            src="https://media.invitestory.in/kalyana-mandapam/assets/mandap-footer.webp"
            alt=""
            className="pointer-events-none absolute bottom-0 left-1/2 w-[128%] max-w-none -translate-x-1/2 select-none object-contain object-bottom"
          />
          {/* couple characters */}
          <img
            src="https://media.invitestory.in/kalyana-mandapam/assets/couple.webp"
            alt={`${wedding.bride} and ${wedding.groom}`}
            className="anim-float relative z-10 w-[58%] max-w-[250px] select-none object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease }}
          className="card-frame mt-8 w-full rounded-2xl px-6 py-6"
        >
          <div className="flex flex-col items-center gap-1.5">
            <CalendarDays className="h-5 w-5 text-[#8c2323]" strokeWidth={1.6} />
            <p className="font-display text-xs uppercase tracking-[0.35em] text-[#3d2b1f]">
              {wedding.weekdayLabel}
            </p>
            <p className="font-display text-lg uppercase tracking-[0.14em] text-[#3d2b1f]">
              {wedding.dateLabel}
            </p>
            <p className="text-[13px] font-medium tracking-[0.08em] text-[#8c2323]">
              {wedding.muhurthamTimeLabel}
            </p>
          </div>

          <div className="hairline-gold my-5 w-full" />

          <div className="flex flex-col items-center gap-1.5">
            <MapPin className="h-5 w-5 text-[#8c2323]" strokeWidth={1.6} />
            <p className="font-display text-xs uppercase tracking-[0.35em] text-[#3d2b1f]">Venue</p>
            <p className="font-display text-base uppercase tracking-[0.12em] text-[#3d2b1f]">
              {wedding.venueLine1}
            </p>
            <p className="text-[12px] tracking-[0.1em] text-[#6b543a]">{wedding.venueLine2}</p>
          </div>

          <a
            href={googleCalendarUrl(mainEvent)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#c99327] to-[#9a6b1f] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#fdf8ea] shadow-[0_10px_24px_-10px_rgba(154,107,31,0.7)] transition-transform active:scale-95"
          >
            <CalendarPlus className="h-4 w-4" strokeWidth={2} />
            Add to Calendar
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 z-20 flex flex-col items-center gap-1 text-[#9a6b1f]"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <ChevronDown className="anim-scroll-cue h-4 w-4" />
      </motion.div>
    </section>
  );
}
