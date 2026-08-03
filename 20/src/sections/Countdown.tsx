import { useEffect, useRef } from 'react'
import { WEDDING } from '@/config'
import { useCountdown, useReveal } from '@/hooks/useInvitation'

function Unit({ value, label }: { value: number; label: string }) {
  const prev = useRef(value)
  const popRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (prev.current !== value && popRef.current) {
      popRef.current.classList.remove('digit-pop')
      void popRef.current.offsetWidth
      popRef.current.classList.add('digit-pop')
      prev.current = value
    }
  }, [value])
  return (
    <div className="flex flex-col items-center">
      <div className="gold-frame flex h-20 w-20 items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm sm:h-24 sm:w-24">
        <span ref={popRef} className="font-serif-display text-3xl text-[#4a3b22] sm:text-4xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-3 text-[10px] uppercase tracking-[0.35em] text-[#8a6a1f]">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const ref = useReveal<HTMLElement>()
  const { days, hours, minutes, seconds, done } = useCountdown(WEDDING.date)

  return (
    <section
      id="countdown"
      ref={ref}
      className="reveal relative overflow-hidden bg-[#f3ecdd] px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#d9bc66]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#b8912f]/15 blur-3xl" />

      <p className="font-script text-4xl text-[#b8912f]">Counting down to forever</p>
      <h2 className="font-serif-display mt-3 text-2xl uppercase tracking-[0.25em] text-[#4a3b22]">
        {done ? "We're Married!" : 'Until We Say I Do'}
      </h2>

      <div className="mt-12 flex items-start justify-center gap-4 sm:gap-6">
        <Unit value={days} label="Days" />
        <span className="font-serif-display mt-6 text-2xl text-[#b8912f]">:</span>
        <Unit value={hours} label="Hours" />
        <span className="font-serif-display mt-6 text-2xl text-[#b8912f]">:</span>
        <Unit value={minutes} label="Minutes" />
        <span className="font-serif-display mt-6 text-2xl text-[#b8912f]">:</span>
        <Unit value={seconds} label="Seconds" />
      </div>
    </section>
  )
}
