import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import IntroExperience from "../components/IntroExperience";
import LayeredTempleScene from "../components/LayeredTempleScene";
import ScrollProgress from "../components/ScrollProgress";
import InviteMessage from "../sections/InviteMessage";
import Couple from "../sections/Couple";
import Events from "../sections/Events";
import Venue from "../sections/Venue";
import FamilyCard from "../sections/FamilyCard";
import Footer from "../sections/Footer";
import { wedding } from "../config";

export default function Home() {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const reduce = useReducedMotion();

  const handleOpen = useCallback(() => {
    setInvitationOpen(true);
  }, []);

  useEffect(() => {
    if (!invitationOpen || reduce) return;
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
  }, [invitationOpen, reduce]);

  return (
    <>
      <IntroExperience onOpen={handleOpen} />
      {invitationOpen ? (
        <main className="relative min-h-svh overflow-x-hidden bg-ivory-paper">
          <ScrollProgress />
          <LayeredTempleScene />
          <InviteMessage />
          <Couple />
          {wedding.sections?.familyCard !== false && <FamilyCard />}
          {wedding.sections?.events !== false && <Events />}
          {wedding.sections?.venue !== false && <Venue />}
          <Footer />
        </main>
      ) : (
        <main className="sr-only" aria-hidden>
          Loading invitation
        </main>
      )}
    </>
  );
}
