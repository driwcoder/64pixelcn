import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const manaBarVariants = cva(
  "relative w-full overflow-hidden border-2 border-foreground bg-muted font-[family-name:var(--pixel-font)] shadow-[var(--pixel-shadow)]",
  {
    variants: {
      size: {
        sm: "h-3",
        default: "h-5",
        lg: "h-7",
      },
    },
    defaultVariants: { size: "default" },
  }
);

export interface PixelManaBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof manaBarVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  showIcon?: boolean;
}

const PixelManaBar = React.forwardRef<HTMLDivElement, PixelManaBarProps>(
  ({ className, value, max = 100, size, showLabel = true, showIcon = false, ...props }, ref) => {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));

    return (
      <div ref={ref} data-slot="mana-bar" className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-widest">
            <span className="flex items-center gap-1">
              {showIcon && <Sparkles className="h-3 w-3" strokeWidth={3} />} MP
            </span>
            <span className="text-muted-foreground">
              {value} / {max}
            </span>
          </div>
        )}
        <div
          className={cn(manaBarVariants({ size }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${pct}%`,
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 flex justify-between px-0 opacity-40">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-px bg-foreground" />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
PixelManaBar.displayName = "PixelManaBar";

export { PixelManaBar, manaBarVariants };
