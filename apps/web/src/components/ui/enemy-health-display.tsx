import * as React from "react";
import { cn } from "@/lib/utils";
import { Skull } from "lucide-react";

export interface PixelEnemyHealthDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  level?: number;
  value: number;
  max?: number;
  segments?: number;
}

const PixelEnemyHealthDisplay = React.forwardRef<HTMLDivElement, PixelEnemyHealthDisplayProps>(
  ({ className, name, level, value, max = 100, segments = 10, ...props }, ref) => {
    const filled = Math.round((value / max) * segments);

    return (
      <div
        ref={ref}
        data-slot="enemy-health-display"
        className={cn(
          "w-full border-2 border-foreground bg-popover p-3 font-[family-name:var(--pixel-font)] shadow-[var(--pixel-shadow)]",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skull className="h-4 w-4 text-destructive" strokeWidth={3} />
            <span className="text-xs uppercase tracking-widest">{name}</span>
          </div>
          {level !== undefined && (
            <span className="text-[10px] text-muted-foreground">Lv {level}</span>
          )}
        </div>

        {/* Segmented bar */}
        <div
          className="flex h-4 w-full gap-px border-2 border-foreground bg-muted p-px"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 transition-colors",
                i < filled ? "bg-destructive" : "bg-transparent"
              )}
            />
          ))}
        </div>

        {/* HP text */}
        <div className="mt-1 text-right text-[10px] text-muted-foreground">
          {value} / {max} HP
        </div>
      </div>
    );
  }
);
PixelEnemyHealthDisplay.displayName = "PixelEnemyHealthDisplay";

export { PixelEnemyHealthDisplay };
