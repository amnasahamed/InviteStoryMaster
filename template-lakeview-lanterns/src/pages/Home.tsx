import { useEffect } from "react";
import Lenis from "lenis";
import ParallaxScene from "../components/ParallaxScene";
import ScrollProgress from "../components/ScrollProgress";
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
    <main className="relative min-h-svh overflow-x-hidden bg-dusk-deep">
      <ScrollProgress />
      <ParallaxScene />
      <InviteMessage />
      <Couple />
      {wedding.sections?.events !== false && <Events />}
      {wedding.sections?.venue !== false && <Venue />}
      <Footer />
    </main>
  );
}
