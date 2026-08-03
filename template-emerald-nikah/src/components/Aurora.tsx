import { cn } from "@/lib/utils";

/**
 * Aurora — soft animated gradient light field used behind the hero and footer.
 * Pure CSS/gradient based so it stays smooth on low-end mobile devices.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="absolute inset-0 aurora-grain" />
    </div>
  );
}

export default Aurora;
