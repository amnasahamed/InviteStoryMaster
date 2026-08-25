import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section id="main-invitation" className="paper-section relative overflow-hidden px-6 py-28 sm:py-44">
      <img
        src={wedding.assets.foregroundLotus}
        alt=""
        className="pointer-events-none absolute bottom-[-18%] right-[-12%] w-[72%] max-w-4xl opacity-[0.08]"
      />

      <div className="relative mx-auto grid max-w-5xl gap-12 md:grid-cols-[.65fr_1.35fr] md:items-start">
        <Reveal>
          <div className="flex items-center gap-4 md:pt-3">
          <span className="h-px w-12 bg-gold/50" />
          <p className="font-display text-sm tracking-[0.28em] text-gold">
            {wedding.verse.hindi}
          </p>
          </div>
        </Reveal>
        <div>
        <Reveal delay={0.08}>
          <p className="font-display max-w-3xl text-4xl leading-[1.08] text-ink sm:text-6xl">
            {wedding.verse.text}
          </p>
        </Reveal>
        <Reveal delay={0.22} className="mt-9 grid gap-2 border-l border-gold/30 pl-5 text-sm tracking-wide text-ink/58 sm:grid-cols-2">
          <p>{wedding.brideParents}</p>
          <p>{wedding.groomParents}</p>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
