import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Countdown from "../components/Countdown";
import { wedding } from "../config";

// The invitation verse reveals itself word by word
function VerseWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className="font-display text-2xl italic leading-relaxed text-[#f5eee2]/90"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function InviteMessage() {
  return (
    <section className="relative flex flex-col items-center gap-12 px-6 py-24">
      <Reveal className="flex max-w-md flex-col items-center gap-5 text-center">
        <span className="font-display text-base tracking-[0.3em] text-[#e2c88f]">
          {wedding.verse.hindi}
        </span>
        <motion.img
          src="https://media.invitestory.in/midnight-stargaze/assets/mandala.png"
          alt=""
          className="w-16 opacity-70"
          whileInView={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 14, ease: "linear" }}
        />
        <VerseWords text={wedding.verse.text} />
      </Reveal>

      <Reveal delay={0.15} className="flex flex-col items-center gap-6">
        <span className="text-[11px] uppercase tracking-[0.45em] text-[#eeb2c0]">
          Counting down to the big day
        </span>
        <Countdown targetISO={wedding.dateISO} />
      </Reveal>
    </section>
  );
}
