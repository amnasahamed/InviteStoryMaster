"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Hero } from "@/components/invitation/hero";
import { Couple } from "@/components/invitation/couple";
import { Countdown } from "@/components/invitation/countdown";
import { Gallery } from "@/components/invitation/gallery";
import { EventDetails } from "@/components/invitation/event-details";
import { Footer } from "@/components/invitation/footer";
import { EnvelopeIntro } from "@/components/invitation/envelope";
import { ActionDock } from "@/components/invitation/action-dock";
import { Petals, ScrollProgress } from "@/components/invitation/ambience";
import { Toaster } from "@/components/ui/sonner";

const title = "Aisha & Zayd — Wedding Invitation | 14 Feb 2027";
const description =
  "With love, we invite you to celebrate the Nikah & Walima of Aisha & Zayd on 14 February 2027 at The Leela Palace Gardens, New Delhi.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <EnvelopeIntro open={opened} onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <Petals />
      <ActionDock enabled={opened} />

      <main className="mx-auto min-h-screen w-full max-w-2xl overflow-x-hidden bg-background">
        <Hero start={opened} />
        <Couple />
        <Countdown />
        <Gallery />
        <EventDetails />
        <Footer />
      </main>

      <Toaster position="top-center" />
    </>
  );
}
