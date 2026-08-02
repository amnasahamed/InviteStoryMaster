import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Minus, Plus, Heart, X } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import Aurora from "../components/Aurora";
import FairyLights from "../components/FairyLights";
import { wedding } from "../config";

// One-shot confetti burst when the guest accepts
function ConfettiBurst({ burstKey }: { burstKey: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 60 + Math.random() * 90;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          rotate: Math.random() * 360,
          size: 5 + Math.random() * 6,
          color: ["#eeb2c0", "#e2c88f", "#fdeef2", "#a9c6ea"][i % 4],
        };
      }),
    []
  );

  return (
    <div key={burstKey} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-[2px]"
          style={{
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.15, ease: [0.15, 0.85, 0.35, 1] }}
        />
      ))}
    </div>
  );
}

export default function Rsvp() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(2);
  const [burst, setBurst] = useState(0);

  const rsvpUrl = useMemo(() => {
    const names = `${wedding.bride} & ${wedding.groom}`;
    const text =
      attending === null
        ? wedding.rsvp.whatsappText
        : attending
          ? `Namaste! We will joyfully attend ${names}'s wedding — ${guests} guest${guests > 1 ? "s" : ""} confirming. See you at the celebration! 🎉`
          : `Namaste! Sadly we won't be able to make it to ${names}'s wedding. Sending all our love and blessings to the couple. 💐`;
    return `https://wa.me/${wedding.rsvp.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [attending, guests]);

  const choose = (yes: boolean) => {
    setAttending(yes);
    if (yes) setBurst((b) => b + 1);
  };

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Aurora className="opacity-50" />
      <FairyLights count={14} className="opacity-60" />
      <SectionHeading kicker="Will You Join Us?" title="RSVP" />

      <Reveal className="relative mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <p className="font-display text-xl italic leading-relaxed text-[#f5eee2]/85">
          Your presence is the greatest gift. Please confirm so we can reserve
          your seat at the celebration.
        </p>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#eeb2c0]">
          {wedding.rsvp.deadline}
        </span>

        {/* ── attendance selector ── */}
        <div className="relative grid w-full grid-cols-2 gap-3">
          {burst > 0 && <ConfettiBurst burstKey={burst} />}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => choose(true)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border px-4 py-5 transition-colors ${
              attending === true
                ? "border-[#eeb2c0] bg-[#eeb2c0]/15 shadow-[0_0_30px_rgba(238,178,192,0.25)]"
                : "border-[#e2c88f]/30 bg-white/[0.04] hover:border-[#eeb2c0]/50"
            }`}
          >
            <Heart
              size={22}
              className={attending === true ? "fill-[#eeb2c0] text-[#eeb2c0]" : "text-[#eeb2c0]"}
            />
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#f5eee2]">
              Joyfully Accept
            </span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => choose(false)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border px-4 py-5 transition-colors ${
              attending === false
                ? "border-[#a9c6ea] bg-[#a9c6ea]/12 shadow-[0_0_30px_rgba(169,198,234,0.2)]"
                : "border-[#e2c88f]/30 bg-white/[0.04] hover:border-[#a9c6ea]/50"
            }`}
          >
            <X size={22} className="text-[#a9c6ea]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#f5eee2]">
              Regretfully Decline
            </span>
          </motion.button>
        </div>

        {/* ── guest count stepper (only when attending) ── */}
        <AnimatePresence initial={false}>
          {attending === true && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full overflow-hidden"
            >
              <div className="flex items-center justify-center gap-6 rounded-2xl border border-[#e2c88f]/25 bg-white/[0.04] px-6 py-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#f5eee2]/70">
                  Guests
                </span>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2c88f]/40 text-[#e2c88f] disabled:opacity-30"
                    disabled={guests <= 1}
                    aria-label="One less guest"
                  >
                    <Minus size={15} />
                  </motion.button>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={guests}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-gold w-8 text-3xl font-semibold"
                    >
                      {guests}
                    </motion.span>
                  </AnimatePresence>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setGuests((g) => Math.min(10, g + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2c88f]/40 text-[#e2c88f] disabled:opacity-30"
                    disabled={guests >= 10}
                    aria-label="One more guest"
                  >
                    <Plus size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── send actions ── */}
        <div className="grid w-full grid-cols-1 gap-3">
          <motion.a
            href={rsvpUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.97 }}
            layout
            className="flex items-center justify-center gap-3 rounded-full bg-[#1f9e56] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-white shadow-[0_8px_30px_rgba(31,158,86,0.4)] transition-transform"
          >
            <MessageCircle size={17} />
            {attending === null
              ? "Confirm on WhatsApp"
              : attending
                ? `Send RSVP · ${guests} Guest${guests > 1 ? "s" : ""}`
                : "Send Response"}
          </motion.a>
          <a
            href={`tel:${wedding.rsvp.phone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-3 rounded-full border border-[#e2c88f]/50 px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-[#f6e2ae] transition-colors hover:bg-[#e2c88f]/10 active:scale-95"
          >
            <Phone size={16} /> {wedding.rsvp.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
