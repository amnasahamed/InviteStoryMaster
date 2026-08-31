import { motion } from "framer-motion";
import Aurora from "../components/Aurora";
import FairyLights from "../components/FairyLights";
import { wedding } from "../config";

// Glowing lantern flanking the stage
function Lantern({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      className={`pointer-events-none absolute ${className}`}
    >
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[26px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,190,90,0.55), rgba(255,140,60,0.18) 60%, transparent 75%)",
          animation: "glow-pulse 3.2s ease-in-out infinite",
        }}
      />
      <img
        src="/assets/lantern.webp"
        alt=""
        className="relative w-16 drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] sm:w-20"
        style={{ animation: "lantern-bob 6s ease-in-out infinite" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center overflow-hidden px-6 pb-20 pt-0">
      {/* navy paisley texture + aurora */}
      <img
        src="https://media.invitestory.in/midnight-stargaze/assets/navy-texture.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a24]/40 via-transparent to-[#0c0a24]" />
      <Aurora className="opacity-70" />

      {/* hanging jasmine & rose garland with fairy lights */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-20"
        style={{ transformOrigin: "top center" }}
      >
        <img
          src="https://media.invitestory.in/midnight-stargaze/assets/garland-top.webp"
          alt=""
          className="w-full object-cover object-top"
          style={{
            transformOrigin: "top center",
            animation: "hang-sway 9s ease-in-out infinite",
          }}
        />
        <FairyLights count={22} className="!inset-x-0 !top-0 h-[55%]" />
      </motion.div>

      <div className="relative z-10 mt-[19svh] flex flex-col items-center sm:mt-[18svh]">
        {/* ── Mughal arch card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[82vw] max-w-[300px]"
        >
          {/* halo behind the arch */}
          <div
            className="absolute left-1/2 top-1/2 h-[110%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
            style={{
              background:
                "radial-gradient(circle, rgba(238,178,192,0.22), rgba(99,102,241,0.14) 55%, transparent 75%)",
              animation: "arch-glow 5s ease-in-out infinite",
            }}
          />

          <svg viewBox="0 0 320 430" className="relative w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <defs>
              <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#faf5ea" />
                <stop offset="100%" stopColor="#f1e6d2" />
              </linearGradient>
            </defs>
            {/* outer arch */}
            <path
              d="M 40 410 L 40 175 C 40 105 95 72 160 30 C 225 72 280 105 280 175 L 280 410 Z"
              fill="url(#archFill)"
            />
            {/* inner border */}
            <path
              d="M 52 400 L 52 178 C 52 116 101 84 160 46 C 219 84 268 116 268 178 L 268 400 Z"
              fill="none"
              stroke="#c9a86a"
              strokeWidth="1.4"
              opacity="0.8"
            />
          </svg>

          {/* arch content */}
          <div className="absolute inset-0 flex flex-col items-center px-8 pt-[26%] text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-display text-[10px] tracking-[0.28em] text-[#8a6f4d]"
            >
              {wedding.verse.hindi}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="mt-3 font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-[#3a3260]"
            >
              Welcome to the
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-script text-4xl leading-tight text-[#c96e8c]"
            >
              Wedding
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="font-display text-[10px] uppercase tracking-[0.4em] text-[#3a3260]"
            >
              of
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              className="mt-1 font-script text-[13vw] leading-[1.05] text-[#4a3f78] sm:text-5xl"
            >
              {wedding.bride}
            </motion.h1>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.8 }}
              className="font-script text-3xl leading-none text-[#c96e8c]"
            >
              &
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.9 }}
              className="font-script text-[13vw] leading-[1.05] text-[#4a3f78] sm:text-5xl"
            >
              {wedding.groom}
            </motion.h1>
          </div>
        </motion.div>

        {/* ── couple illustration overlapping the arch base ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-[22vw] z-10 sm:-mt-20"
        >
          <div
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px]"
            style={{
              background:
                "radial-gradient(circle, rgba(169,198,234,0.3), transparent 70%)",
              animation: "glow-pulse 4.5s ease-in-out infinite",
            }}
          />
          <img
            src="https://media.invitestory.in/midnight-stargaze/assets/couple.webp"
            alt={`${wedding.brideFull} and ${wedding.groomFull}`}
            className="relative w-[60vw] max-w-[230px] drop-shadow-[0_18px_36px_rgba(0,0,0,0.6)]"
            style={{ animation: "float-soft 6s ease-in-out infinite" }}
          />
        </motion.div>

        {/* date + venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
          className="relative z-10 mt-4 flex flex-col items-center gap-2 text-center"
        >
          <p className="font-display text-xl tracking-wide text-[#f5eee2]">
            {wedding.dateLabel}
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e2c88f]">
            {wedding.timeLabel} · {wedding.venue.name}
          </p>
        </motion.div>
      </div>

      {/* lanterns flanking the stage */}
      <Lantern className="bottom-24 left-3 sm:left-10" delay={2} />
      <Lantern className="bottom-24 right-3 sm:right-10" delay={2.2} />

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-5 z-10 flex flex-col items-center gap-1.5"
        style={{ animation: "float-soft 3s ease-in-out infinite" }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#e2c88f]/80">
          Scroll
        </span>
        <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
          <rect x="1" y="1" width="16" height="24" rx="8" stroke="#e2c88f" strokeOpacity="0.6" />
          <motion.circle
            cx="9"
            cy="8"
            r="2.5"
            fill="#eeb2c0"
            animate={{ cy: [8, 16, 8], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
