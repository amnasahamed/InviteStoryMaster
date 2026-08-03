import garland from "@/assets/garland.png";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function InviteText() {
  const { families, invitationNote, couple } = invitation;

  return (
    <section className="relative px-5 py-12">
      <img
        src={garland}
        alt=""
        aria-hidden
        width={1600}
        height={544}
        loading="lazy"
        className="mx-auto mb-8 w-full max-w-sm opacity-90"
      />
      <Reveal className="mx-auto max-w-lg text-center">
        <p className="font-body text-ink/80 text-sm leading-7">{families.groomSide.parents}</p>
        <p className="font-body text-ink/60 mt-2 text-xs leading-6 italic">{families.groomSide.line}</p>
        <p className="font-script text-maroon mt-3 text-3xl">{couple.groom}</p>

        <p className="font-kicker text-gold my-4 text-[0.62rem] tracking-[0.4em] uppercase">and</p>

        <p className="font-body text-ink/80 text-sm leading-7">{families.brideSide.parents}</p>
        <p className="font-body text-ink/60 mt-2 text-xs leading-6 italic">{families.brideSide.line}</p>
        <p className="font-script text-maroon mt-3 text-3xl">{couple.bride}</p>

        <div className="border-gold/30 bg-paper/60 mt-8 rounded-3xl border px-6 py-6">
          <p className="font-body text-ink/75 text-sm leading-7">{invitationNote}</p>
          <p className="font-kicker text-gold mt-4 text-[0.6rem] tracking-[0.3em] uppercase">
            {couple.hashtag}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
