import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import footerFloral from "@/assets/footer-floral.jpg";
import { invitation } from "@/config/invitation";

export function FooterBlessing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["14%", "0%"]);

  return (
    <footer ref={ref} className="relative isolate overflow-hidden pt-20">
      <div className="relative z-10 mx-auto max-w-md px-6 text-center">
        <p className="font-script text-maroon text-4xl">{invitation.couple.monogram}</p>
        <p className="font-body text-ink/75 mt-4 text-sm leading-7">{invitation.closing.blessing}</p>
        <p className="font-kicker text-gold mt-6 text-[0.6rem] tracking-[0.34em] uppercase">
          {invitation.closing.signOff}
        </p>
        <p className="font-display text-maroon mt-1 text-lg">
          {invitation.couple.groom} &amp; {invitation.couple.bride}
        </p>
      </div>

      <div className="relative mt-10 h-56 overflow-hidden sm:h-72">
        <motion.img
          aria-hidden
          alt=""
          src={footerFloral}
          width={1600}
          height={912}
          loading="lazy"
          style={{ y: bgY }}
          className="absolute inset-x-0 bottom-0 h-full w-full object-cover object-bottom"
        />
        <div className="from-paper absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />
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
