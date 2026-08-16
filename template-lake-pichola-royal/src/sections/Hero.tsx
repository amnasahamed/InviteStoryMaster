import { useMemo } from 'react'
import { WEDDING } from '@/config'
import { Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react'
import { useMouseParallax, useScrollProgress } from '@/hooks/useParallax'

interface HeroProps {
  onExplore?: () => void
}

export default function Hero({ onExplore }: HeroProps) {
  const { x: mouseX, y: mouseY } = useMouseParallax()
  const { scrollY } = useScrollProgress()

  // Floating gold dust embers
  const embers = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        size: 3 + ((i * 7) % 8),
        delay: `${(i * 0.9) % 7}s`,
        duration: `${7 + ((i * 3) % 6)}s`,
        sway: `${(i % 2 === 0 ? 1 : -1) * (4 + (i % 5))}vw`,
      })),
    []
  )

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center px-4 pt-24 pb-32">
      {/* Background Layer: Lake Pichola Palace at Twilight */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(${mouseX * 12}px, ${scrollY * 0.3 + mouseY * 12}px, 0) scale(1.08)`,
          transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
      >
        <img
          src="/assets/hero_twilight.jpg"
          alt="Lake Pichola Udaipur Palace at Twilight"
          className="h-full w-full object-cover brightness-[0.55] contrast-[115%]"
        />
        {/* Regal Twilight Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/80 via-[#070b14]/40 to-[#070b14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#070b14_85%)]" />
      </div>

      {/* Floating Gold Embers */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {embers.map((em, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gradient-to-t from-[#dfb141] to-[#ffffff] shadow-[0_0_8px_#ffd768] opacity-70"
            style={{
              left: em.left,
              bottom: '-10px',
              width: em.size,
              height: em.size,
              animation: `lanternFloat ${em.duration} linear infinite`,
              animationDelay: em.delay,
              '--drift-x': em.sway,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Center Invitation Experience */}
      <div
        className="relative z-20 mx-auto flex max-w-3xl flex-col items-center will-change-transform"
        style={{
          transform: `translate3d(${mouseX * -6}px, ${mouseY * -6}px, 0)`,
        }}
      >
        {/* Sanskrit Blessing Pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/60 bg-[#0d1527]/80 px-6 py-2 shadow-[0_0_20px_rgba(223,177,65,0.25)] backdrop-blur-xl transition-transform hover:scale-105">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <p className="font-royal text-[11px] font-bold uppercase tracking-[0.45em] text-[#ffd768]">
            ॥ श्री गणेशाय नमः • शुभ विवाह ॥
          </p>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        {/* Imperial Monogram with Rotating Celestial Rings */}
        <div className="relative my-7 flex h-32 w-32 items-center justify-center">
          {/* Outer Rotating Celestial Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#dfb141]/40 animate-spin-slow" />
          {/* Reverse Inner Ring */}
          <div className="absolute inset-2 rounded-full border border-[#dfb141]/25 animate-spin-reverse-slow" />
          {/* Center Monogram Core */}
          <div className="twilight-glow flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#dfb141] bg-gradient-to-br from-[#162340] via-[#0d1527] to-[#070b14] shadow-2xl backdrop-blur-md">
            <span className="font-script text-4xl font-bold text-[#ffd768] -mr-1">A</span>
            <span className="font-royal text-xs font-light text-[#dfb141] mx-1">&amp;</span>
            <span className="font-script text-4xl font-bold text-[#ffd768] -ml-1">A</span>
          </div>
        </div>

        {/* Invitation Subtitle */}
        <p className="font-royal text-xs font-bold uppercase tracking-[0.35em] text-[#e6d3a3] sm:text-sm">
          Together With Their Families, Cordially Invite You To The Royal Wedding Of
        </p>

        {/* 24K Liquid Gold Couple Names */}
        <div className="my-3">
          <h1 className="gold-text-glow font-script text-7xl leading-[1.1] sm:text-8xl md:text-9xl tracking-wide drop-shadow-2xl">
            {WEDDING.groom}
          </h1>
          <div className="ornament my-2 text-2xl text-[#dfb141]">
            <span className="font-script text-4xl font-bold text-[#ffd768]">&amp;</span>
          </div>
          <h1 className="gold-text-glow font-script text-7xl leading-[1.1] sm:text-8xl md:text-9xl tracking-wide drop-shadow-2xl">
            {WEDDING.bride}
          </h1>
        </div>

        {/* Date & Destination Pill */}
        <div className="mt-3 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#f8edd1] font-royal bg-[#0d1527]/85 px-6 py-3 rounded-full border border-[#dfb141]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#ffd768]" />
              {WEDDING.dateLabel}
            </span>
            <span className="text-[#dfb141]">•</span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#ffd768]" />
              {WEDDING.city}
            </span>
          </div>

          <div className="ornament mt-5 mb-2 text-base">
            <span>❧</span>
          </div>
          <p className="font-serif-display italic text-xs sm:text-sm text-[#e6d3a3] max-w-lg px-4 leading-relaxed font-normal">
            "Under the starlit canopy of Lake Pichola, where two souls unite in timeless love."
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#itinerary"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] px-8 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#070b14] shadow-[0_0_25px_rgba(223,177,65,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(223,177,65,0.6)] active:scale-95"
          >
            <span>The Royal Ceremonies</span>
          </a>
          <a
            href="#details"
            className="inline-flex items-center gap-2 rounded-full border border-[#dfb141]/70 bg-[#0d1527]/80 px-8 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#ffd768] shadow-lg backdrop-blur-xl transition-all hover:bg-[#121c33] hover:scale-105 active:scale-95"
          >
            <span>Venue &amp; Map</span>
          </a>
        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <a
        href="#story"
        onClick={onExplore}
        className="cue-bounce absolute bottom-6 z-20 flex flex-col items-center text-[#dfb141] transition-opacity hover:opacity-100"
        aria-label="Scroll down to story"
      >
        <span className="font-royal mb-1 text-[9px] font-bold uppercase tracking-[0.4em] text-[#e6d3a3]">
          Explore The Celebration
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
