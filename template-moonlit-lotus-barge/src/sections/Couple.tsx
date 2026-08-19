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
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,175,194,.13),transparent_58%)]" />
      <SectionHeading
        kicker="Two families, one promise"
        title={`${wedding.bride} meets ${wedding.groom}`}
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_1.15fr_1fr]">
        <Reveal className="order-2 text-center md:order-1 md:text-right">
          <p className="font-script text-3xl text-lotus-light">The bride</p>
          <h3 className="font-display mt-2 text-4xl text-pearl">
            {wedding.brideFull}
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-pearl/55 md:ml-auto md:mr-0">
            {wedding.brideParents}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
            <div className="absolute inset-[9%] rounded-full bg-lotus/16 blur-3xl" />
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
          <p className="font-script text-3xl text-lotus-light">The groom</p>
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
          className="rounded-full border border-moon/20 px-5 py-2 text-xs tracking-[0.18em] text-moon/65 transition-colors duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:border-lotus-light/60 hover:text-lotus-light"
        >
          {wedding.hashtag}
        </button>
      </Reveal>
    </section>
  );
}
