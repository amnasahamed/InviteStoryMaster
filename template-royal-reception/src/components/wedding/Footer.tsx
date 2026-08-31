import { Heart } from "lucide-react";
import { Aurora } from "./Aurora";
import { Reveal } from "./Reveal";
import { wedding } from "./data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-royal-deep px-6 py-20 text-center">
      <img
        src="https://media.invitestory.in/royal-reception/images/mandala-texture.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <Aurora className="opacity-30 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-b from-royal-deep/90 via-royal-deep/70 to-royal-deep" />
      <img
        src="https://media.invitestory.in/royal-reception/images/lotus-cluster.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-45"
      />

      <div className="relative mx-auto w-full max-w-md">
        <Reveal>
          <p className="font-body text-[0.62rem] tracking-[0.45em] text-gold/85 uppercase">
            With Regards
          </p>
          <div className="hairline-rule mx-auto mt-4 h-px w-24" />
          <p className="mt-6 font-display text-xl leading-relaxed text-ivory/90 italic">
            “Your presence is the blessing we wish for most. Come dine with us, dance with us, and
            let us begin forever surrounded by the people we love.”
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="mx-auto max-w-[20rem] font-body text-[0.7rem] leading-loose tracking-[0.22em] text-ivory/70 uppercase">
            {wedding.regards.join(" · ")}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-14 pb-16">
          <h2 className="font-script text-3xl text-ivory">
            {wedding.bride.name.split(" ")[0]} &amp; {wedding.groom.name.split(" ")[0]}
          </h2>
          <p className="mt-6 inline-flex items-center gap-1.5 font-body text-[0.58rem] tracking-[0.3em] text-ivory/45 uppercase">
            Made with <Heart className="h-3 w-3 fill-gold text-gold" /> for our favourite people
          </p>
        </Reveal>
      </div>
            <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-[10px] uppercase tracking-[0.35em] text-current opacity-70 transition-opacity hover:opacity-100"
        >
          Follow @invitestory.in on Instagram
        </a>
      </footer>

  );
}