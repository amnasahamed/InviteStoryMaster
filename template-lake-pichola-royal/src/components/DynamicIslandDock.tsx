import { Volume2, VolumeX, Flame } from 'lucide-react'
import { useSoundEffects } from '@/hooks/useSoundEffects'

interface DynamicIslandDockProps {
  isPlaying: boolean
  onToggleAudio: () => void
  onReleaseLantern: () => void
  lanternCount: number
}

export default function DynamicIslandDock({
  isPlaying,
  onToggleAudio,
  onReleaseLantern,
  lanternCount,
}: DynamicIslandDockProps) {
  const { playBlessingSitar, playChime } = useSoundEffects()

  const handleLanternClick = () => {
    onReleaseLantern()
    playBlessingSitar()
    playChime()
  }

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#dfb141]/50 bg-[#0d1527]/90 px-3.5 py-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:border-[#dfb141] hover:scale-[1.02]">
        {/* Audio Toggle with Animated Equalizer */}
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 rounded-full bg-[#121c33] px-3.5 py-1.5 text-xs text-[#dfb141] transition-all hover:bg-[#1a2849] hover:text-white"
          title="Toggle Royal Sitar Melody"
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-[#dfb141] rounded-full animate-[equalizer_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#dfb141] rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-[#dfb141] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_0.4s]" />
              </div>
              <Volume2 className="h-3.5 w-3.5 text-[#dfb141]" />
              <span className="font-royal text-[10px] font-bold tracking-wider hidden sm:inline">
                Sitar On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-[#dfb141]/70" />
              <span className="font-royal text-[10px] font-bold tracking-wider hidden sm:inline">
                Melody
              </span>
            </>
          )}
        </button>

        {/* Separator */}
        <span className="h-4 w-px bg-[#dfb141]/30" />

        {/* Navigation Shortcuts */}
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="#story"
            className="rounded-full px-2.5 py-1 text-[11px] font-royal font-bold uppercase tracking-wider text-[#e6d3a3] hover:text-[#dfb141] transition-colors"
          >
            Story
          </a>
          <a
            href="#itinerary"
            className="rounded-full px-2.5 py-1 text-[11px] font-royal font-bold uppercase tracking-wider text-[#e6d3a3] hover:text-[#dfb141] transition-colors"
          >
            Events
          </a>
          <a
            href="#details"
            className="rounded-full px-2.5 py-1 text-[11px] font-royal font-bold uppercase tracking-wider text-[#e6d3a3] hover:text-[#dfb141] transition-colors"
          >
            Venue
          </a>
        </div>

        {/* Separator */}
        <span className="h-4 w-px bg-[#dfb141]/30" />

        {/* Release Sky Lantern Interactive Action */}
        <button
          onClick={handleLanternClick}
          className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] px-3.5 py-1.5 font-royal text-[10px] font-bold uppercase tracking-wider text-[#070b14] shadow-md transition-all hover:scale-105 active:scale-95"
          title="Release a glowing sky lantern over Lake Pichola"
        >
          <Flame className="h-3.5 w-3.5 fill-[#070b14] text-[#070b14] animate-pulse" />
          <span>Release Lantern</span>
          <span className="rounded-full bg-[#070b14]/20 px-1.5 py-0.2 text-[9px] font-mono">
            {lanternCount}
          </span>
        </button>
      </div>
    </div>
  )
}
