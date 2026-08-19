import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(167,71,103,.2),transparent_48%),linear-gradient(180deg,#061126,#10254a_48%,#061126)]" />
      <img
        src={wedding.assets.foregroundLotus}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-[-8%] mx-auto w-[115%] max-w-5xl opacity-20"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="font-display text-sm tracking-[0.3em] text-lotus-light/85">
            {wedding.verse.hindi}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="font-display text-3xl leading-[1.35] text-pearl/92 sm:text-4xl">
            {wedding.verse.text}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="hairline-gold mt-2 w-28" />
        </Reveal>
        <Reveal delay={0.22} className="flex flex-col gap-2 text-sm tracking-wide text-pearl/58">
          <p>{wedding.brideParents}</p>
          <p>{wedding.groomParents}</p>
        </Reveal>
      </div>
    </section>
  );
}
