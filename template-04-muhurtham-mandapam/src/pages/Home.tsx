import { useEffect } from "react";
import Lenis from "lenis";
import { MessageCircle } from "lucide-react";
import Hero from "@/sections/Hero";
import CountdownSection from "@/sections/CountdownSection";
import Invitation from "@/sections/Invitation";
import Events from "@/sections/Events";
import Venue from "@/sections/Venue";
import Footer from "@/sections/Footer";
import Petals from "@/components/Petals";
import { whatsappUrl } from "@/lib/calendar";

export default function Home() {
  // Smoothest scroll — Lenis
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f7efdb] text-[#3d2b1f]">
      <Petals count={14} />
      <Hero />
      <CountdownSection />
      <Invitation />
      <Events />
      <Venue />
      <Footer />

      {/* floating WhatsApp RSVP */}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="RSVP on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-b from-[#2e7d43] to-[#1f5c30] text-white shadow-[0_12px_28px_-8px_rgba(31,92,48,0.8)] transition-transform active:scale-90"
        style={{ height: 52, width: 52 }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
