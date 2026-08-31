import { useEffect, useState } from "react";
const gramophone = "https://media.invitestory.in/ghibli-selfie/src/assets/gramophone.png";
import { startMusic, stopMusic } from "./audio";

/** Click-to-play gramophone. Never autoplays. */
export function Gramophone() {
  const [on, setOn] = useState(false);

  useEffect(() => () => stopMusic(), []);

  return (
    <button
      type="button"
      onClick={() => {
        if (on) {
          stopMusic();
          setOn(false);
        } else {
          startMusic();
          setOn(true);
        }
      }}
      aria-label={on ? "Pause the music" : "Play soft music"}
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full px-2 py-2 backdrop-blur-sm transition-transform duration-500 hover:scale-105 sm:right-7 sm:bottom-7"
      style={{ background: "var(--popover)", boxShadow: "var(--shadow-lift)" }}
    >
      <img
        src={gramophone}
        alt=""
        width={512}
        height={512}
        loading="lazy"
        className="h-11 w-11 select-none"
        style={{ animation: on ? "float-soft 3.4s ease-in-out infinite" : undefined }}
      />
      <span className="pr-2 text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
        {on ? "playing" : "play"}
      </span>
    </button>
  );
}
