import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { AddToCalendar } from "@/components/wedding/AddToCalendar";
import { Atmosphere } from "@/components/wedding/Atmosphere";
import { BouquetDate, ButterflyVenue } from "@/components/wedding/BouquetDate";
import { CoupleSelfie } from "@/components/wedding/CoupleSelfie";
import { Finale } from "@/components/wedding/Finale";
import { Gramophone } from "@/components/wedding/Gramophone";
import { Handwriting } from "@/components/wedding/Handwriting";
import { LongPressNote } from "@/components/wedding/LongPressNote";
import { Opening } from "@/components/wedding/Opening";
import { PetalLayer } from "@/components/wedding/PetalLayer";
import { SkyMap } from "@/components/wedding/SkyMap";
import { Timeline } from "@/components/wedding/Timeline";
import { useReveal, useScrollProgress } from "@/components/wedding/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaan ♡ Fatima — 12 December 2026" },
      {
        name: "description",
        content:
          "You're invited. A hand-painted selfie invitation from Amaan and Fatima — nikah, lunch and reception at Noor Bagh, Hyderabad on 12 December 2026.",
      },
      { property: "og:title", content: "Amaan ♡ Fatima — 12 December 2026" },
      {
        property: "og:description",
        content:
          "You're invited. A hand-painted selfie invitation from Amaan and Fatima — nikah, lunch and reception at Noor Bagh, Hyderabad on 12 December 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Scene({
  children,
  className = "",
  min = "min-h-screen",
}: {
  children: React.ReactNode;
  className?: string;
  min?: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>(0.2);
  return (
    <section
      ref={ref}
      className={`reveal relative flex ${min} flex-col items-center justify-center px-6 py-24 ${
        shown ? "reveal-in" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

function Invitation() {
  const [ready, setReady] = useState(false);
  const [bubble, setBubble] = useState(false);
  const scrollY = useScrollProgress();

  const onOpeningDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setBubble(true), 1600);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <main className="relative">
      <Atmosphere />
      <PetalLayer />
      <LongPressNote />
      <Gramophone />
      {!ready && <Opening onDone={onOpeningDone} />}

      {/* Scene 1 — the selfie */}
      <section className="relative flex min-h-[104vh] flex-col items-center justify-center px-5 pt-16">
        <CoupleSelfie arrival={ready ? 1 : 0} showBubble={bubble} />
        <div
          className="mt-6 text-center transition-all duration-1000"
          style={{
            opacity: ready ? 1 : 0,
            transform: `translateY(${ready ? 0 : 18}px)`,
            transitionDelay: "900ms",
          }}
        >
          <h1 className="font-display text-4xl leading-[1.22] pb-[0.08em] text-ink text-glow sm:text-6xl">
            Hey!
            <br />
            We&apos;re getting married.
          </h1>
        </div>
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 transition-opacity duration-700"
          style={{ opacity: ready && scrollY < 80 ? 0.8 : 0 }}
        >
          <span className="text-[0.58rem] tracking-[0.36em] text-muted-foreground uppercase">
            pull the camera down
          </span>
          <span
            className="h-10 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--foreground))",
              animation: "float-soft 2.6s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* Scene 2 — the names write themselves */}
      <Scene>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="mb-6 text-[0.6rem] tracking-[0.48em] text-muted-foreground uppercase">
            together, at last
          </p>
          <Handwriting
            text="Amaan"
            className="text-[3.6rem] text-ink sm:text-[6rem]"
          />
          <span className="my-2 font-display text-3xl text-primary sm:text-4xl">♡</span>
          <Handwriting
            text="Fatima"
            delay={2.4}
            className="text-[3.6rem] text-ink sm:text-[6rem]"
          />
        </div>
      </Scene>

      {/* Scene 3 — the bouquet blooms into the date */}
      <Scene>
        <BouquetDate />
      </Scene>

      {/* Scene 4 — butterflies form the venue */}
      <Scene>
        <ButterflyVenue />
      </Scene>

      {/* Scene 5 — the map painted into the sky */}
      <Scene>
        <SkyMap />
      </Scene>

      {/* The day, as a journey */}
      <Scene>
        <p className="mb-14 text-[0.6rem] tracking-[0.48em] text-muted-foreground uppercase">
          how the day unfolds
        </p>
        <Timeline />
        <div className="mt-20">
          <AddToCalendar />
        </div>
      </Scene>

      {/* Surprise ending */}
      <Finale />

      <footer className="pb-16 text-center">
        <p className="font-hand pb-[0.2em] text-xl leading-[1.6] text-muted-foreground">
          Amaan &amp; Fatima · 12 · 12 · 2026
        </p>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-xs tracking-[0.2em] text-muted-foreground/80 transition-colors hover:text-muted-foreground"
        >
          Follow @invitestory.in on Instagram
        </a>
      </footer>
    </main>
  );
}
