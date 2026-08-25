import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

export default function Couple() {
  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
    } catch {
      // Clipboard access is optional.
    }
  };

  return (
    <section className="night-section relative overflow-hidden px-6 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,175,194,.13),transparent_58%)]" />
      <SectionHeading
        kicker="Two families, one promise"
        title={`${wedding.bride} meets ${wedding.groom}`}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.25fr_1fr]">
        <Reveal className="order-2 text-center md:order-1 md:text-right">
          <p className="section-kicker">The bride</p>
          <h3 className="font-display mt-2 text-4xl text-pearl">
            {wedding.brideFull}
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-pearl/55 md:ml-auto md:mr-0">
            {wedding.brideParents}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
            <div className="absolute inset-[9%] rounded-full bg-gold/12 blur-3xl" />
            <img
              src={wedding.assets.couple}
              alt={`${wedding.bride} and ${wedding.groom} seated together`}
              className="relative h-full w-full object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,.5)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal delay={0.16} className="order-3 text-center md:text-left">
          <p className="section-kicker">The groom</p>
          <h3 className="font-display mt-2 text-4xl text-pearl">
            {wedding.groomFull}
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-pearl/55 md:ml-0 md:mr-auto">
            {wedding.groomParents}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={copyHashtag}
          className="text-link"
        >
          {wedding.hashtag}
        </button>
      </Reveal>
    </section>
  );
}
