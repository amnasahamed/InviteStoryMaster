const story1 = "https://media.invitestory.in/sage-parchment/src/assets/story-1.jpg";
const story2 = "https://media.invitestory.in/sage-parchment/src/assets/story-2.jpg";
const story3 = "https://media.invitestory.in/sage-parchment/src/assets/story-3.jpg";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

const IMAGES: Record<string, string> = {
  "story-1": story1,
  "story-2": story2,
  "story-3": story3,
};

export function Story() {
  return (
    <section className="relative px-5 py-16">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-pine uppercase">Our Story</h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-lg">
        <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:left-1/2" />

        <div className="space-y-14">
          {invitation.story.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.08}>
              <article className="relative pl-16 sm:pl-0">
                <span className="absolute top-6 left-6 z-10 block size-2 -translate-x-1/2 rotate-45 bg-gold sm:left-1/2" />
                <div
                  className={`sm:flex sm:items-center sm:gap-6 ${
                    i % 2 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="sm:w-1/2">
                    <div className="overflow-hidden rounded-t-[3rem] border border-gold/40">
                      <img
                        src={IMAGES[item.image] ?? story1}
                        alt={item.title}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="h-48 w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105 sm:h-56"
                      />
                    </div>
                  </div>
                  <div className={`mt-4 sm:mt-0 sm:w-1/2 ${i % 2 ? "sm:text-right" : ""}`}>
                    <p className="text-[0.6rem] tracking-[0.35em] text-gold uppercase">
                      {item.year}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-pine">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
