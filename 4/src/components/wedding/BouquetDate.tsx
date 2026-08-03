import bouquet from "@/assets/bouquet.png";
import butterfly from "@/assets/butterfly.png";
import { burstPetals } from "./effects";
import { useReveal } from "./useReveal";

/** The bouquet blooms open and the date is hiding inside it. */
export function BouquetDate() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);

  return (
    <div ref={ref} className="relative flex w-full flex-col items-center">
      <div className="relative aspect-square w-[86vw] max-w-[560px]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <img
            key={i}
            src={bouquet}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full select-none"
            style={{
              opacity: shown ? 0.32 : 0,
              transformOrigin: "50% 60%",
              rotate: `${(i - 2.5) * 14}deg`,
              scale: "0.9",
              animation: shown ? `bloom 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s both` : undefined,
              filter: "blur(1px)",
            }}
          />
        ))}
        <button
          type="button"
          aria-label="Open the bouquet"
          onClick={(e) => burstPetals({ x: e.clientX, y: e.clientY, count: 40, spread: 1.2 })}
          className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
        >
          <img
            src={bouquet}
            alt="A watercolour bouquet of blush roses and jasmine holding the wedding date"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full select-none"
            style={{
              animation: shown
                ? "bloom 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both, float-soft 10s ease-in-out 2.6s infinite"
                : undefined,
              opacity: shown ? 1 : 0,
              filter: "drop-shadow(0 30px 50px oklch(0.4 0.06 40 / 0.22))",
            }}
          />
        </button>

      </div>

      <div
        className="pointer-events-none -mt-10 flex flex-col items-center text-center sm:-mt-14"
        style={{ opacity: shown ? 1 : 0, transition: "opacity 1.6s ease 1.9s" }}
      >
        <p className="font-display text-[6rem] leading-[1] text-ink text-glow sm:text-[8.5rem]">
          12
        </p>
        <p className="font-display mt-2 text-2xl tracking-[0.42em] text-ink/85 uppercase sm:text-3xl">
          December
        </p>
        <p className="mt-3 text-[0.7rem] tracking-[0.5em] text-muted-foreground">2026</p>
      </div>

      <p className="mt-10 text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
        tap the bouquet
      </p>
    </div>
  );
}


/** Petals become butterflies, butterflies spell out the venue. */
export function ButterflyVenue() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);
  const flock = Array.from({ length: 14 }, (_, i) => ({
    left: `${8 + ((i * 61) % 84)}%`,
    top: `${20 + ((i * 37) % 60)}%`,
    size: 26 + ((i * 9) % 30),
    delay: i * 0.13,
    dur: 5 + ((i * 3) % 5),
  }));

  return (
    <div ref={ref} className="relative w-full max-w-2xl">
      <div className="relative h-[46vh] min-h-[300px] w-full">
        {flock.map((b, i) => (
          <img
            key={i}
            src={butterfly}
            alt=""
            loading="lazy"
            className="absolute select-none"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              opacity: shown ? 0.9 : 0,
              animation: shown
                ? `float-soft ${b.dur}s ease-in-out ${b.delay}s infinite`
                : undefined,
              transition: `opacity 1s ease ${b.delay}s`,
            }}
          />
        ))}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
          style={{ opacity: shown ? 1 : 0, transition: "opacity 1.6s ease 0.9s" }}
        >
          <p className="text-[0.62rem] tracking-[0.48em] text-muted-foreground uppercase">venue</p>
          <p className="font-display text-4xl text-ink text-glow sm:text-5xl">Noor Bagh</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Masjid-e-Noor &amp; Garden Lawns
            <br />
            Banjara Hills, Hyderabad
          </p>
        </div>
      </div>
    </div>
  );
}
