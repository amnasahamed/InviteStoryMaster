import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import SparkleTrail from '@/components/SparkleTrail'
import PicholaCanvas from '@/components/PicholaCanvas'
import DynamicIslandDock from '@/components/DynamicIslandDock'
import Hero from '@/sections/Hero'
import OurStory from '@/sections/OurStory'
import Countdown from '@/sections/Countdown'
import Itinerary from '@/sections/Itinerary'
import Gallery from '@/sections/Gallery'
import Details from '@/sections/Details'
import Footer from '@/sections/Footer'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [lanternCount, setLanternCount] = useState(148)
  const [lanternTrigger, setLanternTrigger] = useState(0)

  // Soft ambient sitar & shehnai royalty-free music
  useEffect(() => {
    const bgAudio = new Audio(
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-flute-and-sitar-112194.mp3'
    )
    bgAudio.loop = true
    bgAudio.volume = 0.35
    setAudio(bgAudio)

    return () => {
      bgAudio.pause()
    }
  }, [])

  const toggleAudio = () => {
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  const handleReleaseLantern = () => {
    setLanternCount((prev) => prev + 1)
    setLanternTrigger((prev) => prev + 1)
  }

  return (
    <div className="relative min-h-screen bg-[#070b14] text-[#f8edd1] selection:bg-[#dfb141]/30 selection:text-[#ffd768]">
      {/* Interactive Water Ripple & Sky Lanterns Canvas */}
      <PicholaCanvas triggerLantern={lanternTrigger} />

      {/* Interactive Desktop Gold Stardust Cursor */}
      <SparkleTrail />

      {/* Navigation Header & Gold Progress Bar */}
      <Navbar />

      {/* Main Visual Palatial Experience */}
      <main className="relative z-20">
        <Hero />
        <OurStory />
        <Countdown onTriggerLantern={handleReleaseLantern} />
        <Itinerary />
        <Gallery />
        <Details />
        <Footer />
      </main>

      {/* Floating Dynamic Island Bottom Dock */}
      <DynamicIslandDock
        isPlaying={isPlaying}
        onToggleAudio={toggleAudio}
        onReleaseLantern={handleReleaseLantern}
        lanternCount={lanternCount}
      />
    </div>
  )
}
