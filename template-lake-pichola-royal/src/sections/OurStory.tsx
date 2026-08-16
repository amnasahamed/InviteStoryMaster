import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import CardTilt from '@/components/CardTilt'
import { Sparkles, Heart } from 'lucide-react'

export default function OurStory() {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      id="story"
      ref={ref}
      className="reveal relative overflow-hidden bg-gradient-to-b from-[#070b14] via-[#0b1222] to-[#070b14] px-6 py-32"
    >
      {/* Twilight Background Ambient Glows */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[#dfb141]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-[#c41e3a]/10 blur-3xl" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            The Journey of Two Souls
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          Our Love Story
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1]">
          From A Mumbai Sunset To Eternal Vows In Udaipur
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        <p className="font-serif-display mx-auto max-w-2xl text-sm leading-relaxed text-[#dcd1ba] font-normal">
          {WEDDING.storySummary}
        </p>

        {/* Milestone Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 text-left">
          {WEDDING.storyMilestones.map((milestone, idx) => (
            <CardTilt key={idx} intensity={10} className="h-full">
              <div className="glass-twilight royal-corners flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:border-[#dfb141] hover:shadow-[0_15px_40px_rgba(223,177,65,0.2)]">
                <div>
                  {/* Photo Header */}
                  <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#dfb141]/40 shadow-inner">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="h-48 w-full object-cover brightness-95 transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-royal rounded-full bg-[#070b14]/90 border border-[#dfb141]/60 px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#ffd768] backdrop-blur-md">
                        {milestone.year}
                      </span>
                      <span className="text-2xl">{milestone.icon}</span>
                    </div>
                  </div>

                  {/* Milestone Content */}
                  <h3 className="font-royal text-lg font-bold text-[#f8edd1]">
                    {milestone.title}
                  </h3>
                  <p className="font-serif-display mt-1 text-xs italic font-semibold text-[#ffd768]">
                    {milestone.subtitle}
                  </p>
                  <p className="font-serif-display mt-3 text-xs leading-relaxed text-[#c9bea7]">
                    {milestone.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-[#dfb141]/20 pt-4 text-xs text-[#dfb141]">
                  <Heart className="h-3.5 w-3.5 fill-[#c41e3a] text-[#c41e3a]" />
                  <span className="font-royal font-bold tracking-wider">Chapter 0{idx + 1}</span>
                </div>
              </div>
            </CardTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
