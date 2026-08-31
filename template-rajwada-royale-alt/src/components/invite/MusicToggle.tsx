import { Music, Pause } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TRACK = "https://media.invitestory.in/rajwada-royale-alt/audio/ambient-shehnai.mp3";

/** Floating ambient-music control. Starts only after the guest opens the doors. */
export function MusicToggle({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!started || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [started]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  if (!started) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="border-gold/40 bg-paper/85 text-maroon fixed right-4 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_6px_18px_rgba(0,0,0,0.12)] backdrop-blur"
    >
      {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      {playing && (
        <motion.span
          aria-hidden
          className="border-gold/40 absolute inset-0 rounded-full border"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
