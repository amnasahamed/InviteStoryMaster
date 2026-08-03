import Hero from '@/sections/Hero'
import Countdown from '@/sections/Countdown'
import Details from '@/sections/Details'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Countdown />
      <Details />
      <Footer />
    </main>
  )
}
