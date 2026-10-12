import * as React from "react";
import { cn } from "@/lib/utils";
import { Crown } from "./icons";

export interface PixelScoreboardEntry {
  name: string;
  score: number;
}

export interface PixelScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: PixelScoreboardEntry[];
  /** Table caption, e.g. "High scores". */
  title?: string;
  /** Name of the row to highlight (the current player). */
  highlight?: string;
  /** Zero-padded digit count for scores. */
  digits?: number;
}

const RANK_COLORS = ["text-[oklch(0.82_0.17_85)]", "text-[oklch(0.8_0.02_250)]", "text-[oklch(0.65_0.12_55)]"];

/** Arcade high-score table, sorted by score. */
const PixelScoreboard = React.forwardRef<HTMLDivElement, PixelScoreboardProps>(
  ({ entries, title = "High scores", highlight, digits = 6, className, ...props }, ref) => {
    const sorted = [...entries].sort((a, b) => b.score - a.score);
    return (
      <div
        ref={ref}
        data-slot="scoreboard"
        className={cn(
          "pixel-rounded pixel-shadow w-full overflow-x-auto border-2 border-foreground bg-card p-[1em] text-card-foreground",
          "font-[family-name:var(--pixel-font)] text-[0.75rem] uppercase tracking-widest",
          className
        )}
        {...props}
      >
        <table className="w-full border-collapse">
          <caption className="pb-[0.75em] text-center text-[1.1em] text-primary">{title}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e, i) => {
              const current = e.name === highlight;
              return (
                <tr key={`${e.name}-${i}`} aria-current={current || undefined} className={cn(current && "bg-primary text-primary-foreground")}>
                  <td className={cn("w-[3.5em] py-[0.35em] pl-[0.4em] tabular-nums", !current && RANK_COLORS[i])}>
                    <span className="inline-flex items-center gap-[0.3em]">
                      {i === 0 && <Crown aria-hidden className="size-[1em]" />}
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-[0.35em] wrap-anywhere">{e.name}</td>
                  <td className="py-[0.35em] pr-[0.4em] text-right tabular-nums">{String(e.score).padStart(digits, "0")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);
PixelScoreboard.displayName = "PixelScoreboard";

export { PixelScoreboard };
