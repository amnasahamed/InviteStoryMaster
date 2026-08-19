import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const notes = [
    220.0, // A3
    277.18, // C#4
    329.63, // E4
    369.99, // F#4
    440.0, // A4
    554.37, // C#5
    659.25, // E5
  ];

  const playPluck = (freq: number, ctx: AudioContext, masterGain: GainNode) => {
    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 2.5);

      noteGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3.3);
    } catch {
      // Audio context might be closing
    }
  };

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (!gainNodeRef.current) {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;
      }

      setIsPlaying(true);

      let step = 0;
      const chords = [
        [220, 277.18, 329.63, 440],
        [196, 246.94, 293.66, 392],
        [174.61, 220, 261.63, 349.23],
        [220, 277.18, 329.63, 554.37],
      ];

      // Play introductory chime
      playPluck(440, ctx, gainNodeRef.current);
      setTimeout(() => {
        if (gainNodeRef.current && ctx) playPluck(554.37, ctx, gainNodeRef.current);
      }, 250);
      setTimeout(() => {
        if (gainNodeRef.current && ctx) playPluck(659.25, ctx, gainNodeRef.current);
      }, 500);

      intervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const currentChord = chords[step % chords.length] ?? chords[0]!;
        const randomNote = currentChord[Math.floor(Math.random() * currentChord.length)] ?? 440;
        playPluck(randomNote, audioCtxRef.current, gainNodeRef.current);

        if (Math.random() > 0.4) {
          setTimeout(() => {
            if (audioCtxRef.current && gainNodeRef.current) {
              const note = notes[Math.floor(Math.random() * notes.length)] ?? 554.37;
              playPluck(note, audioCtxRef.current, gainNodeRef.current);
            }
          }, 350);
        }

        step++;
      }, 1200);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!gainNodeRef.current || !audioCtxRef.current) return;
    if (isMuted) {
      gainNodeRef.current.gain.setTargetAtTime(0.35, audioCtxRef.current.currentTime, 0.05);
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex items-center gap-1.5">
      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        aria-label={isPlaying ? "Pause wedding ambience" : "Play wedding ambience"}
        className="group relative flex items-center gap-2.5 rounded-full border border-gold/40 bg-emerald-deep/85 px-4 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-gold hover:shadow-[0_0_20px_rgba(230,195,110,0.35)]"
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3.5">
              <span className="w-[3px] bg-gold rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: "70%" }} />
              <span className="w-[3px] bg-gold rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" style={{ height: "100%" }} />
              <span className="w-[3px] bg-gold rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" style={{ height: "50%" }} />
            </span>
          ) : (
            <Music className="h-3.5 w-3.5 text-gold/80 group-hover:text-gold" />
          )}
        </span>

        <span className="text-[0.7rem] font-medium tracking-wider text-cream uppercase">
          {isPlaying ? "Music On" : "Play Ambience"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            type="button"
            onClick={toggleMute}
            whileTap={{ scale: 0.92 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-emerald-deep/85 text-gold shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-gold hover:text-gold-soft"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AudioPlayer;
