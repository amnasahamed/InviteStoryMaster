import { Suspense, lazy, useEffect, useState } from "react";

const Aurora = lazy(() =>
  import("@/components/Aurora").then((m) => ({ default: m.default })),
);

/** WebGL aurora wash — mounts only in the browser, after hydration. */
export function AuroraBackdrop() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
      <Suspense fallback={null}>
        <Aurora colorStops={["#8FA8A0", "#E4C97E", "#D98A9A"]} amplitude={0.9} blend={0.6} />
      </Suspense>
    </div>
  );
}
