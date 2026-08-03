import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section id="story" className="relative px-5 py-16">
      <Reveal className="mx-auto mb-10 max-w-md text-center">
        <p className="font-kicker text-gold text-[0.68rem] tracking-[0.42em] uppercase">Our story</p>
        <h2 className="font-display text-maroon mt-3 text-3xl sm:text-4xl">How we got here</h2>
      </Reveal>

      <ol className="relative mx-auto max-w-lg">
        <span
          aria-hidden
          className="via-gold/45 absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-transparent to-transparent sm:left-[23px]"
        />
        {invitation.story.map((item, i) => (
          <li key={item.year} className="relative pb-10 pl-14 sm:pl-16">
            <span
              aria-hidden
              className="border-gold/60 bg-paper absolute top-1 left-0 flex size-10 items-center justify-center rounded-full border sm:size-12"
            >
              <span className="font-kicker text-gold text-[0.6rem] tracking-widest">{item.year}</span>
            </span>
            <Reveal delay={i * 0.05}>
              <div className="border-gold/25 bg-paper/70 overflow-hidden rounded-3xl border shadow-[0_18px_40px_-32px_var(--shadow-gold)]">
                <img
                  src={item.image}
                  alt={item.title}
                  width={1008}
                  height={1008}
                  loading="lazy"
                  className="h-44 w-full object-cover sm:h-52"
                />
                <div className="px-5 py-4">
                  <h3 className="font-display text-maroon text-xl">{item.title}</h3>
                  <p className="font-body text-ink/70 mt-1.5 text-sm leading-6">{item.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
