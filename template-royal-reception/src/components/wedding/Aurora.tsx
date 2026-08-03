/**
 * Aurora — soft animated light field used behind the hero and footer.
 * Pure CSS/Tailwind (no WebGL) so it stays buttery on mobile devices.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -top-1/3 left-[-20%] h-[70vh] w-[80vw] rounded-full bg-royal-light/45 blur-[70px] animate-aurora" />
      <div
        className="absolute top-[10%] right-[-25%] h-[60vh] w-[75vw] rounded-full bg-royal/35 blur-[80px] animate-aurora"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[10%] h-[55vh] w-[70vw] rounded-full bg-accent/30 blur-[90px] animate-aurora"
        style={{ animationDelay: "-12s", animationDuration: "26s" }}
      />
    </div>
  );
}