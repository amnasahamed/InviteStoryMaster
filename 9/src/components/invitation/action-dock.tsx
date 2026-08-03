"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Navigation, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { downloadInvite } from "@/lib/calendar";
import { wedding } from "@/lib/wedding";

/** Floating quick actions that slide up once the hero is scrolled past. */
export function ActionDock({ enabled }: { enabled: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const data = {
      title: `${wedding.bride.name} & ${wedding.groom.name} — Wedding Invitation`,
      text: `You're invited! ${wedding.dateLabel} · ${wedding.venue.name}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(`${data.text}\n${data.url}`);
        toast.success("Invitation link copied");
      }
    } catch {
      /* dismissed */
    }
  };

  const items = [
    {
      icon: CalendarPlus,
      label: "Save date",
      onClick: () => {
        downloadInvite();
        toast.success("Added to your calendar", { description: wedding.dateLabel });
      },
    },
    { icon: Navigation, label: "Directions", href: wedding.venue.mapsUrl },
    { icon: Share2, label: "Share", onClick: share },
  ];

  return (
    <AnimatePresence>
      {enabled && show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-4 z-[58] flex justify-center px-6"
        >
          <div className="flex items-center gap-1 rounded-full border border-gold/30 bg-card/85 p-1.5 shadow-soft backdrop-blur-md">
            {items.map(({ icon: Icon, label, href, onClick }) => {
              const inner = (
                <motion.span
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-blossom/25"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </motion.span>
              );
              return href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer noopener">
                  {inner}
                </a>
              ) : (
                <button key={label} type="button" onClick={onClick}>
                  {inner}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
