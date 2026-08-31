import { motion } from "motion/react";
import { WEDDING } from "@/lib/wedding";
import { Reveal, SectionTitle } from "./Reveal";

function Portrait({
  src,
  role,
  name,
  script,
  note,
  delay,
}: {
  src: string;
  role: string;
  name: string;
  script: string;
  note: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="text-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative mx-auto w-full max-w-[15rem]"
      >
        <div className="absolute inset-0 -m-2 rounded-t-[999px] rounded-b-3xl bg-[image:var(--gradient-gold)] opacity-40 blur-[2px]" />
        <img
          src={src}
          alt={name}
          loading="lazy"
          width={960}
          height={1280}
          className="relative aspect-[3/4] w-full rounded-t-[999px] rounded-b-3xl object-cover"
          style={{ boxShadow: "var(--shadow-lift)" }}
        />
      </motion.div>
      <p className="mt-5 font-body text-[0.6rem] uppercase tracking-[0.4em] text-gold-deep">
        {role}
      </p>
      <h3 className="mt-1 font-name text-2xl uppercase tracking-[0.08em] text-gold-gradient">
        {name}
      </h3>
      <p className="-mt-1 font-script text-2xl text-foreground/80">{script}</p>
      <p className="mx-auto mt-2 max-w-[16rem] font-display text-sm italic leading-relaxed text-muted-foreground">
        {note}
      </p>
    </Reveal>
  );
}

export function Couple() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <img
        src="https://media.invitestory.in/noor-e-zahra/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-24 top-10 w-72 opacity-15"
      />
      <div className="mx-auto max-w-md">
        <SectionTitle eyebrow="Two souls, one dua" title="The Couple" />

        <div className="mt-12 grid gap-14">
          <Portrait
            src="https://media.invitestory.in/noor-e-zahra/images/bride.jpg"
            role="The Bride"
            name={`${WEDDING.bride.first} ${WEDDING.bride.last}`}
            script={WEDDING.bride.script}
            note="Daughter of Mr. & Mrs. Kareem Noorani — a heart full of grace and quiet light."
            delay={0.05}
          />
          <Portrait
            src="https://media.invitestory.in/noor-e-zahra/images/groom.jpg"
            role="The Groom"
            name={`${WEDDING.groom.first} ${WEDDING.groom.last}`}
            script={WEDDING.groom.script}
            note="Son of Mr. & Mrs. Salim Rahmani — steady, kind and endlessly devoted."
            delay={0.12}
          />
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-sm text-center font-display text-lg font-light italic leading-relaxed text-foreground/80">
            “{WEDDING.blessing}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Couple;
