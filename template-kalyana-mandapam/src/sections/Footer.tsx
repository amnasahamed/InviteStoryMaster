import { wedding } from "@/config";

/**
 * Signature footer — "living wedding card".
 * Texture + marquee + giant names scroll UP behind a static
 * transparent mandap PNG pinned to the viewport bottom,
 * with the couple standing in front of it (like the card).
 */
export default function Footer() {
  return (
    <footer className="relative" style={{ height: "162svh" }}>
      {/* ── Layer 0: texture behind everything ── */}
      <div className="absolute inset-0">
        <img
          src="/assets/texture-bg.webp"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7efdb] via-transparent to-[#e8d5ac]/60" />
      </div>

      {/* ── Layer 1: text that scrolls behind the static mandap ── */}
      <div className="relative z-10 flex h-full flex-col">
        {/* marquee strip */}
        <div className="mt-10 overflow-hidden border-y border-[#b98a2f]/40 bg-[#fdf8ea]/60 py-3 backdrop-blur-[1px]">
          <div className="flex w-max whitespace-nowrap" style={{ animation: "marquee 26s linear infinite" }}>
            {[0, 1].map((n) => (
              <span
                key={n}
                className="font-display px-4 text-[12px] uppercase tracking-[0.4em] text-[#9a6b1f]"
              >
                {Array(6).fill(`${wedding.hashtag} ✦ ${wedding.dateLabel} ✦ `).join("")}
              </span>
            ))}
          </div>
        </div>

        {/* giant outlined names */}
        <div className="pointer-events-none mt-14 flex select-none justify-center overflow-hidden px-2">
          <span className="text-outline-gold font-display whitespace-nowrap text-[13.5vw] font-semibold uppercase leading-none tracking-tight opacity-70 sm:text-[10vw]">
            {wedding.bride} ♥ {wedding.groom}
          </span>
        </div>

        {/* closing message — anchored just above the mandap so the final resting
            state always shows it over the couple */}
        <div className="mx-auto mb-[50svh] mt-auto flex max-w-xs flex-col items-center gap-3 px-6 text-center">
          <p className="text-[12px] tracking-[0.2em] text-[#8c2323]">{wedding.blessing}</p>
          <p className="font-script text-[2.6rem] leading-[1.15] text-[#7b1e1e]">
            We can't wait to celebrate with you
          </p>
          <div className="hairline-gold mt-1 w-28" />
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6b543a]">
            With love · {wedding.brideFamily}
          </p>
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-[#6b543a]">
            {wedding.groomFamily}
          </p>
          <p className="mt-2 text-[10px] tracking-[0.25em] text-[#9a6b1f]">{wedding.hashtag}</p>
        </div>
      </div>

      {/* ── Layer 2: static mandap overlay, pinned to viewport bottom ── */}
      <div className="pointer-events-none sticky bottom-0 z-20 -mt-[100svh] flex h-[100svh] items-end justify-center">
        {/* soft ground shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#e0c58f]/70 to-transparent" />

        {/* mandap — static transparent PNG */}
        <img
          src="/assets/mandap-footer.webp"
          alt=""
          className="absolute bottom-0 left-1/2 w-[128%] max-w-none -translate-x-1/2 select-none object-contain object-bottom sm:w-[105%]"
        />

        {/* couple standing in front of the mandap */}
        <img
          src="/assets/couple.webp"
          alt={`${wedding.bride} and ${wedding.groom}`}
          className="anim-float relative bottom-0 z-10 w-[68%] max-w-[330px] select-none object-contain"
        />
      </div>

      {/* ── Layer 3: credit line above everything ── */}
      <p className="absolute bottom-3 left-0 right-0 z-30 text-center text-[9px] uppercase tracking-[0.3em] text-[#6b543a]/70">
        Crafted with ♥ · InviteStory
      </p>
      <a
        href="https://www.instagram.com/invitestory.in/"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-1 left-0 right-0 z-30 text-center text-[9px] uppercase tracking-[0.3em] text-[#9a6b1f]/80 transition-colors hover:text-[#9a6b1f]"
      >
        @invitestory.in on Instagram
      </a>
    </footer>
  );
}
