// Aurora background — drifting blurred light blobs, midnight-jasmine palette
export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -left-[20%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.30), transparent 65%)",
          animation: "drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-25%] top-[20%] h-[55vmax] w-[55vmax] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(224,139,163,0.28), transparent 65%)",
          animation: "drift-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[10%] h-[50vmax] w-[50vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(120,150,220,0.22), transparent 65%)",
          animation: "drift-c 38s ease-in-out infinite",
        }}
      />
    </div>
  );
}
