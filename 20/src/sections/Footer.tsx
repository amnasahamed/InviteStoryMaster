import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'

/** Closing composition: big script names behind the illustrated couple,
 *  couple standing over the gold floral texture — like the reference card. */
export default function Footer() {
  const ref = useReveal<HTMLElement>()

  return (
    <footer
      ref={ref}
      className="reveal relative flex min-h-[92svh] flex-col items-center justify-end overflow-hidden text-center"
    >
      <img
        src="/assets/gold-texture.png"
        alt=""
        className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ee] via-transparent to-transparent" />

      {/* names behind the couple */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[34%] z-0 select-none">
        <p className="font-script text-[16vw] leading-none text-[#b8912f]/35 sm:text-8xl">
          {WEDDING.groom} &amp; {WEDDING.bride}
        </p>
      </div>

      {/* couple illustration floating above the flowers */}
      <div className="float-slow relative z-10 -mb-4 w-[88%] max-w-md">
        <img src="/assets/couple.png" alt="Illustration of the bride and groom" className="w-full" />
      </div>

      {/* credits */}
      <div className="relative z-10 mb-6 mt-2">
        <p className="font-serif-display text-xs uppercase tracking-[0.4em] text-[#8a6a1f]">
          {WEDDING.hashtag}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#6b5626]/70">
          Made with ♥ for our special day
        </p>
      </div>
    </footer>
  )
}
