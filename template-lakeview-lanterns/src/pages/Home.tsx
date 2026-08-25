import { useEffect } from "react";
import Lenis from "lenis";
import ParallaxScene from "../components/ParallaxScene";
import ScrollProgress from "../components/ScrollProgress";
import InvitationOpener from "../components/InvitationOpener";
import InviteMessage from "../sections/InviteMessage";
import Couple from "../sections/Couple";
import Events from "../sections/Events";
import Venue from "../sections/Venue";
import Footer from "../sections/Footer";
import { wedding } from "../config";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let id = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main id="main-content" className="relative min-h-svh overflow-x-hidden bg-dusk-deep">
      <InvitationOpener />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">Skip to invitation</a>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-10" aria-label="Invitation navigation">
        <a href="#main-content" className="font-display text-lg tracking-[0.16em] text-[#f4e7d0]">A <span className="text-glow-gold">·</span> M</a>
        <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] text-[#f4e7d0]/65"><a className="nav-link" href="#story">Our story</a><a className="nav-link" href="#details">Details</a></div>
      </nav>
      <ParallaxScene />
      <InviteMessage />
      <Couple />
      {wedding.sections?.events !== false && <Events />}
      {wedding.sections?.venue !== false && <Venue />}
      <Footer />
    </main>
  );
}
