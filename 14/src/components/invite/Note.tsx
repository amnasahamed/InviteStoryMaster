import { invite } from "@/config/invite";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";

export function Note() {
  return (
    <section className="px-7 py-20 text-center sm:py-28">
      <Reveal>
        <Divider className="mb-10" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="caps text-[0.6rem] text-olive">With the blessings of our families</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-7 max-w-md text-lg leading-[1.9] text-ink/85 sm:text-xl">
          {invite.invitationNote}
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="script mt-8 text-3xl text-sepia">{invite.dayLine}</p>
        <p className="caps mt-4 text-[0.6rem] text-sepia">{invite.timeLine}</p>
      </Reveal>
    </section>
  );
}
