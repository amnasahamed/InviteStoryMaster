import mosque from "@/assets/mosque.png";
import cloudA from "@/assets/cloud-a.png";
import { useReveal } from "./useReveal";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Jama+Masjid+Wedding+Hall+Hyderabad";

/** A map painted into the sky, with a little mosque instead of a pin. */
export function SkyMap() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.35);

  return (
    <div ref={ref} className={`reveal relative w-full max-w-3xl ${shown ? "reveal-in" : ""}`}>
      <div className="relative mx-auto aspect-[16/10] w-full">
        <img
          src={cloudA}
          alt=""
          loading="lazy"
          className="absolute -top-10 -left-10 w-2/3 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]"
          style={{ animation: "float-soft 12s ease-in-out infinite" }}
        />
        <img
          src={cloudA}
          alt=""
          loading="lazy"
          className="absolute -right-12 -bottom-8 w-1/2 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]"
          style={{ animation: "float-soft 15s ease-in-out infinite reverse" }}
        />

        <svg
          viewBox="0 0 800 500"
          className="absolute inset-0 h-full w-full"
          style={{ filter: "drop-shadow(0 24px 40px oklch(0.4 0.06 40 / 0.18))" }}
        >
          <defs>
            <radialGradient id="mapWash" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="oklch(0.98 0.02 90)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="oklch(0.94 0.03 220)" stopOpacity="0.25" />
            </radialGradient>
          </defs>
          <rect x="20" y="20" width="760" height="460" rx="40" fill="url(#mapWash)" />
          <g stroke="oklch(0.75 0.05 145)" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.5">
            <path d="M60 380 C 220 340, 260 240, 420 220 S 660 180, 750 120" />
            <path d="M40 200 C 180 210, 300 320, 470 330 S 700 360, 780 320" />
          </g>
          <g stroke="oklch(0.85 0.06 82)" strokeWidth="6" fill="none" strokeDasharray="14 12" opacity="0.75">
            <path d="M120 440 C 260 400, 300 300, 400 262" />
          </g>
          <g fill="oklch(0.8 0.04 145)" opacity="0.45">
            <circle cx="150" cy="150" r="26" />
            <circle cx="200" cy="120" r="18" />
            <circle cx="650" cy="380" r="30" />
            <circle cx="600" cy="410" r="20" />
          </g>
        </svg>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="absolute top-[36%] left-1/2 w-[26%] -translate-x-1/2 transition-transform duration-500 hover:scale-110"
          style={{ animation: "float-soft 6s ease-in-out infinite" }}
        >
          <img
            src={mosque}
            alt="The mosque where the nikah takes place — opens in Google Maps"
            width={768}
            height={768}
            loading="lazy"
            className="w-full select-none"
            style={{ filter: "drop-shadow(0 14px 22px oklch(0.4 0.06 40 / 0.3))" }}
          />
          <span className="mt-1 block text-center text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
            open in maps
          </span>
        </a>
      </div>
    </div>
  );
}
