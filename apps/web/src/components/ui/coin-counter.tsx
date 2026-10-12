"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Coins } from "./icons";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function useReducedMotion() {
  return React.useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
}

export interface PixelCoinCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  /** Zero-padded digit count, like an arcade HUD. */
  digits?: number;
  /** Unit read by screen readers ("42 coins"). */
  label?: string;
  icon?: React.ReactNode;
  /** Count-up duration in ms when the value changes. */
  duration?: number;
}

/** HUD coin counter that counts up (or down) to its value. */
const PixelCoinCounter = React.forwardRef<HTMLDivElement, PixelCoinCounterProps>(
  ({ value, digits = 4, label = "coins", icon, duration = 400, className, ...props }, ref) => {
    const reduced = useReducedMotion();
    // What's on screen; it trails `value` while counting.
    const [shown, setShown] = React.useState(value);
    const shownRef = React.useRef(value);

    React.useEffect(() => {
      const from = shownRef.current;
      if (from === value) return;
      // One rAF loop from what's shown now to the new value (instant when
      // motion is reduced); a newer value cancels it and starts from there.
      const start = performance.now();
      let frame = 0;
      const tick = (now: number) => {
        const t = reduced ? 1 : Math.min(1, (now - start) / duration);
        shownRef.current = Math.round(from + (value - from) * t);
        setShown(shownRef.current);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, [value, reduced, duration]);

    return (
      <div
        ref={ref}
        role="status"
        aria-label={`${value} ${label}`}
        data-slot="coin-counter"
        className={cn(
          "inline-flex max-w-full items-center gap-[0.5em] font-[family-name:var(--pixel-font)] text-[0.9rem] uppercase tracking-widest tabular-nums",
          className
        )}
        {...props}
      >
        <span aria-hidden className="flex size-[1.4em] shrink-0 items-center justify-center text-[oklch(0.82_0.17_85)] [&_svg]:size-full">
          {icon ?? <Coins />}
        </span>
        <span aria-hidden className="text-muted-foreground">x</span>
        <span aria-hidden>{String(Math.max(0, shown)).padStart(digits, "0")}</span>
      </div>
    );
  }
);
PixelCoinCounter.displayName = "PixelCoinCounter";

export { PixelCoinCounter };
