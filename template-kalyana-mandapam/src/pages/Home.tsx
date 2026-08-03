import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/sections/Hero";
import CountdownSection from "@/sections/CountdownSection";
import Invitation from "@/sections/Invitation";
import Events from "@/sections/Events";
import Venue from "@/sections/Venue";
import Footer from "@/sections/Footer";
import Petals from "@/components/Petals";

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
    </main>
  );
}