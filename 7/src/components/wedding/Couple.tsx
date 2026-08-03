import { Reveal } from "./Reveal";
import { wedding } from "./data";

function Portrait({
  src,
  name,
  parents,
  note,
  delay,
}: {
  src: string;
  name: string;
  parents: string;
  note: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="text-center">
      <div className="relative mx-auto w-[64%] max-w-[230px]">
        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-b from-secondary via-ivory to-secondary/50 blur-[2px]" />
        <div className="relative overflow-hidden rounded-full border border-accent/40 bg-ivory shadow-[0_18px_45px_-18px_rgba(20,50,140,0.45)]">
          <img src={src} alt={name} width={1024} height={1024} loading="lazy" className="w-full" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ivory to-transparent" />
        </div>
      </div>
      <h3 className="mt-5 font-script text-[2.35rem] leading-none text-royal">{name}</h3>
      <p className="mt-2 font-body text-[0.66rem] tracking-[0.22em] text-muted-foreground uppercase">
        {parents}
      </p>
      <p className="mx-auto mt-3 max-w-[19rem] font-display text-[0.98rem] leading-relaxed text-foreground/75 italic">
        {note}
      </p>
    </Reveal>
  );
}

export function Couple() {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-20">
      <img
        src="/images/mandala-texture.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-24 left-1/2 w-[130%] max-w-none -translate-x-1/2 opacity-[0.07]"
      />
      <div className="relative mx-auto w-full max-w-md">
        <Reveal className="text-center">
          <p className="font-body text-[0.62rem] tracking-[0.45em] text-accent-foreground/70 uppercase">
            The Couple
          </p>
          <div className="hairline-rule mx-auto mt-4 h-px w-28" />
        </Reveal>

        <div className="mt-12 space-y-16">
          <Portrait
            src="/images/bride.png"
            name={wedding.bride.name}
            parents={wedding.bride.parents}
            note={wedding.bride.note}
            delay={0.05}
          />
          <Reveal delay={0.1} className="flex items-center justify-center gap-4">
            <span className="hairline-rule h-px w-16" />
            <span className="font-script text-3xl text-accent">&amp;</span>
            <span className="hairline-rule h-px w-16" />
          </Reveal>
          <Portrait
            src="/images/groom.png"
            name={wedding.groom.name}
            parents={wedding.groom.parents}
            note={wedding.groom.note}
            delay={0.05}
          />
        </div>
      </div>
    </section>
  );
}