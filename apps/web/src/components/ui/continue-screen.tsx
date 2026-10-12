"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PixelButton } from "./button";

export interface PixelContinueScreenProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Countdown start, in seconds. */
  seconds?: number;
  title?: React.ReactNode;
  onContinue?: () => void;
  /** Called on Quit, Esc, or when the countdown runs out. */
  onQuit?: () => void;
  continueLabel?: string;
  quitLabel?: string;
}

/** Arcade "Continue? 9... 8..." screen. Remount it (key) to restart the countdown. */
const PixelContinueScreen = React.forwardRef<HTMLDivElement, PixelContinueScreenProps>(
  ({ seconds = 10, title = "Continue?", onContinue, onQuit, continueLabel = "Continue", quitLabel = "Quit", className, onKeyDown, ...props }, ref) => {
    const [left, setLeft] = React.useState(seconds);
    const titleId = React.useId();
    const countId = React.useId();
    const quitRef = React.useRef(onQuit);
    React.useEffect(() => {
      quitRef.current = onQuit;
    }, [onQuit]);

    React.useEffect(() => {
      if (left <= 0) {
        quitRef.current?.();
        return;
      }
      const t = setTimeout(() => setLeft((n) => n - 1), 1000);
      return () => clearTimeout(t);
    }, [left]);

    return (
      <div
        ref={ref}
        role="alertdialog"
        aria-labelledby={titleId}
        aria-describedby={countId}
        data-slot="continue-screen"
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key === "Escape") onQuit?.();
        }}
        className={cn(
          "flex w-full flex-col items-center gap-[1em] bg-background p-[1.5em] text-center text-foreground",
          "font-[family-name:var(--pixel-font)] uppercase tracking-widest",
          className
        )}
        {...props}
      >
        <h2 id={titleId} className="text-[1.25rem] leading-relaxed wrap-anywhere">{title}</h2>
        <div id={countId} aria-live="polite" className="text-[3rem] leading-none tabular-nums text-primary motion-safe:animate-pulse">
          <span className="sr-only">Seconds left: </span>
          {Math.max(0, left)}
        </div>
        <div className="flex flex-wrap justify-center gap-[0.75em]">
          <PixelButton autoFocus onClick={onContinue}>{continueLabel}</PixelButton>
          <PixelButton variant="outline" onClick={onQuit}>{quitLabel}</PixelButton>
        </div>
      </div>
    );
  }
);
PixelContinueScreen.displayName = "PixelContinueScreen";

export { PixelContinueScreen };
