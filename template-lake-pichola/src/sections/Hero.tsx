import { useMemo } from 'react'
import { WEDDING } from '@/config'

/** Full-screen opening: gold texture, floating petals, shimmering names */
export default function Hero() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 71) % 100}%`,
        size: 8 + ((i * 13) % 12),
        delay: `${(i * 1.7) % 14}s`,
        duration: `${11 + ((i * 7) % 9)}s`,
        sway: `${((i % 2 === 0 ? 1 : -1) * (4 + (i % 5)))}vw`,
      })),
    []
  )

  return (
    <section className="silk relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center">
      {/* background texture */}
      <img
        src="/assets/gold-texture.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,246,238,0.55),rgba(250,246,238,0.15)_60%,rgba(243,236,221,0.4))]" />

      {/* petals */}
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 0.8,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--sway': p.sway,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-6">
        <p className="reveal is-visible mb-6 text-[11px] uppercase tracking-[0.5em] text-[#8a6a1f]">
          ॥ Shubh Vivah ॥
        </p>

        {/* monogram */}
        <div className="glow-pulse mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#b8912f]/60 bg-white/40 backdrop-blur-sm">
          <span className="font-script text-3xl text-[#8a6a1f]">A</span>
          <span className="mx-1 font-serif-display text-lg text-[#b8912f]">&amp;</span>
          <span className="font-script text-3xl text-[#8a6a1f]">A</span>
        </div>

        <p className="font-serif-display mb-2 text-sm uppercase tracking-[0.35em] text-[#6b5626]">
          The Wedding of
        </p>

        <h1 className="gold-shimmer font-script text-[17vw] leading-[1.05] sm:text-7xl md:text-8xl">
          {WEDDING.groom}
        </h1>
        <span className="font-script my-1 text-4xl text-[#b8912f]">&amp;</span>
        <h1 className="gold-shimmer font-script text-[17vw] leading-[1.05] sm:text-7xl md:text-8xl">
          {WEDDING.bride}
        </h1>

        <div className="ornament mt-8 text-xl">
          <span>❧</span>
        </div>

        <p className="font-serif-display mt-6 text-base tracking-[0.2em] text-[#6b5626]">
          {WEDDING.dateLabel}
        </p>
      </div>

      {/* scroll cue */}
      <a
        href="#countdown"
        className="cue-bounce absolute bottom-8 z-10 flex flex-col items-center text-[#8a6a1f]"
        aria-label="Scroll down"
      >
        <span className="mb-1 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
          <rect x="1" y="1" width="16" height="24" rx="8" stroke="currentColor" />
          <circle cx="9" cy="8" r="2.4" fill="currentColor" />
        </svg>
      </a>
    </section>
  )
}
