import * as React from "react";
import { cn } from "@/lib/utils";
import { Lock, Trophy } from "./icons";

export interface PixelAchievementProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** Locked achievements are dimmed and show a lock. */
  unlocked?: boolean;
  /** Points / gamerscore shown on the right. */
  points?: number;
}

/** "Achievement unlocked" card; drop it in a toast or a trophy list. */
const PixelAchievement = React.forwardRef<HTMLDivElement, PixelAchievementProps>(
  ({ title, description, icon, unlocked = true, points, className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      data-slot="achievement"
      data-state={unlocked ? "unlocked" : "locked"}
      className={cn(
        "pixel-rounded pixel-shadow flex w-full max-w-sm items-center gap-[0.9em] border-2 border-foreground bg-card p-[0.9em] text-card-foreground",
        "font-[family-name:var(--pixel-font)] text-[0.75rem] leading-relaxed",
        !unlocked && "text-muted-foreground",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "flex size-[3em] shrink-0 items-center justify-center border-2 border-foreground [&_svg]:size-[1.8em]",
          unlocked ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {unlocked ? icon ?? <Trophy /> : <Lock />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[0.8em] uppercase tracking-widest text-muted-foreground wrap-anywhere">
          {unlocked ? "Achievement unlocked" : "Locked"}
        </div>
        <div className="uppercase tracking-widest wrap-anywhere">{title}</div>
        {description && <div className="text-[0.9em] text-muted-foreground wrap-anywhere">{description}</div>}
      </div>
      {points !== undefined && (
        <div className="shrink-0 text-right tabular-nums">
          {points}
          <span className="block text-[0.75em] uppercase tracking-widest text-muted-foreground">pts</span>
        </div>
      )}
    </div>
  )
);
PixelAchievement.displayName = "PixelAchievement";

export { PixelAchievement };
