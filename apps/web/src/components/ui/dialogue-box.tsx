"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "./icons";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function useReducedMotion() {
  return React.useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
}

export interface PixelDialogueBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Lines shown one at a time, typed out like an RPG text box. */
  lines: string[];
  /** Name shown on the box's tab. */
  speaker?: string;
  /** Portrait (an <img>, an avatar, an icon...) shown on the left. */
  portrait?: React.ReactNode;
  /** Milliseconds per character. */
  speed?: number;
  /** Called after the last line is dismissed. */
  onComplete?: () => void;
}

/**
 * RPG text box: types each line out, click / Enter / Space finishes the line
 * or advances to the next one.
 */
const PixelDialogueBox = React.forwardRef<HTMLDivElement, PixelDialogueBoxProps>(
  ({ lines, speaker, portrait, speed = 30, onComplete, className, onClick, onKeyDown, ...props }, ref) => {
    const reduced = useReducedMotion();
    const [index, setIndex] = React.useState(0);
    const [typed, setTyped] = React.useState(0);
    const line = lines[index] ?? "";
    const shown = reduced ? line.length : typed;
    const done = shown >= line.length;

    React.useEffect(() => {
      if (reduced || done) return;
      const t = setTimeout(() => setTyped((n) => n + 1), speed);
      return () => clearTimeout(t);
    }, [reduced, done, typed, speed]);

    const advance = () => {
      if (!done) return setTyped(line.length);
      if (index < lines.length - 1) {
        setIndex(index + 1);
        setTyped(0);
      } else {
        onComplete?.();
      }
    };

    return (
      // The speaker tab sits outside the box so stepped corners can't clip it.
      <div data-slot="dialogue" className="w-full min-w-0">
        {speaker && (
          <span className="ml-[1em] inline-block max-w-[calc(100%-2em)] truncate border-[length:var(--pixel-line,2px)] border-b-0 border-foreground bg-primary px-[0.75em] align-bottom font-[family-name:var(--pixel-font)] text-[0.6rem] uppercase leading-[1.8em] tracking-widest text-primary-foreground">
            {speaker}
          </span>
        )}
        <div
          ref={ref}
          role="region"
          aria-label={speaker ? `${speaker} says` : "Dialogue"}
          tabIndex={0}
          data-slot="dialogue-box"
          onClick={(e) => {
            onClick?.(e);
            advance();
          }}
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              advance();
            }
          }}
          className={cn(
            "pixel-raised relative flex w-full cursor-pointer gap-[1em] bg-popover p-[1em] text-popover-foreground",
            "font-[family-name:var(--pixel-font)] text-[0.8rem] leading-relaxed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
          {...props}
        >
          {portrait && (
            <div data-slot="dialogue-portrait" className="flex size-[4em] shrink-0 items-center justify-center overflow-hidden border-[length:var(--pixel-line,2px)] border-foreground bg-muted [&_img]:size-full [&_img]:object-cover">
              {portrait}
            </div>
          )}
          <p className="min-h-[3.5em] min-w-0 flex-1 pr-[1.2em] wrap-anywhere">
            {/* Screen readers get the whole line at once instead of letter by letter. */}
            <span className="sr-only" aria-live="polite">{line}</span>
            <span aria-hidden>{line.slice(0, shown)}</span>
          </p>
          {done && (
            <ChevronDown aria-hidden className="absolute bottom-[0.5em] right-[0.6em] size-[1em] motion-safe:animate-bounce" />
          )}
        </div>
      </div>
    );
  }
);
PixelDialogueBox.displayName = "PixelDialogueBox";

export { PixelDialogueBox };
