import { useReveal } from "./useReveal";

/** Handwritten ink that writes itself when it scrolls into view. */
export function Handwriting({
  text,
  delay = 0,
  className = "",
  duration = 2.2,
}: {
  text: string;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>(0.4);

  return (
    <span ref={ref} className="inline-block align-bottom">
      <span
        className={`font-hand inline-block px-[0.08em] pt-[0.18em] pb-[0.3em] leading-[1.15] whitespace-nowrap ${className}`}
        style={{
          clipPath: shown ? undefined : "inset(0 100% 0 0)",
          animation: shown
            ? `ink-write ${duration}s cubic-bezier(0.55, 0.1, 0.35, 1) ${delay}s both`
            : undefined,
        }}
      >
        {text}
      </span>
    </span>
  );
}
