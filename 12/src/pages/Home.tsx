import Petals from "@/components/Petals"
import MusicToggle from "@/components/MusicToggle"
import ScrollProgress from "@/components/ScrollProgress"
import Hero from "@/sections/Hero"
import Story from "@/sections/Story"
import Countdown from "@/sections/Countdown"
import Details from "@/sections/Details"
import Venue from "@/sections/Venue"
import Gallery from "@/sections/Gallery"
import Family from "@/sections/Family"
import Rsvp from "@/sections/Rsvp"
import CalendarSection from "@/sections/CalendarSection"
import FooterSection from "@/sections/FooterSection"
import config from "@/config"

export default function Home() {
  const textureCls = config.theme.texture === "paper" ? "paper-bg paper-grain" : ""

  return (
    <main className={`relative min-h-screen ${textureCls}`}>
      <ScrollProgress />
      <Petals />
      <MusicToggle />
      <Hero />
      <Story />
      <Countdown />
      <Details />
      <Venue />
      <Gallery />
      <Family />
      <Rsvp />
      <CalendarSection />
      <FooterSection />
    </main>
  )
}
