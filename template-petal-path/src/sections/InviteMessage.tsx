import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f2c4d0]/25 to-transparent" />
      <Reveal className="mx-auto flex max-w-md flex-col items-center text-center">
        <p className="font-display text-sm tracking-[0.35em] text-[#f2c4d0]/80">
          {wedding.verse.blessing}
        </p>
        <div className="mt-8 h-px w-16 bg-[#f2c4d0]/30" />
        <p className="mt-8 font-display text-[1.35rem] leading-[1.55] text-[#faf3eb] sm:text-[1.5rem]">
          {wedding.verse.text}
        </p>
        <div className="mt-10 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#e8dcc8]/70">
            {wedding.brideParents}
          </p>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#e8dcc8]/70">
            {wedding.groomParents}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
