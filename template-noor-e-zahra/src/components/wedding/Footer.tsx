import { Heart } from "lucide-react";
import { WEDDING } from "@/lib/wedding";
import Aurora from "@/components/Aurora";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-10 pt-20">
      <Aurora />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('https://media.invitestory.in/noor-e-zahra/images/paper-texture.jpg')] bg-cover bg-center opacity-25"
      />
      <img
        src="https://media.invitestory.in/noor-e-zahra/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-10 w-[30rem] -translate-x-1/2 opacity-20"
      />

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="font-arabic text-xl leading-loose text-gold-deep" dir="rtl" lang="ar">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
          </p>
          <p className="mt-3 font-display text-lg font-light italic leading-relaxed text-foreground/80">
            May this union be filled with mercy, laughter and light — and may you always find
            your way home to each other.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 hairline w-44" />
          <p className="mt-8 font-script text-3xl text-foreground/80">Best wishes from</p>
          <p className="font-name text-xl uppercase tracking-[0.14em] text-gold-gradient">
            Zohra Manzil
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-10 inline-flex items-center gap-1.5 font-body text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Made with
            <Heart className="h-3 w-3 fill-gold text-gold" />
            for {WEDDING.bride.first} &amp; {WEDDING.groom.first}
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

export default Footer;
