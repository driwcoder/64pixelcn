import * as React from "react";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

export interface ThemeOption {
  id: string;
  label: string;
  /** small color swatches to preview */
  swatches: [string, string, string];
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: "nintendo", label: "Nintendo", swatches: ["#e91e63", "#1a1a2e", "#4fc3f7"] },
  { id: "gameboy", label: "GameBoy", swatches: ["#9bbc0f", "#0f380f", "#8bac0f"] },
  { id: "neon", label: "Neon", swatches: ["#f0f", "#0d001a", "#0ff"] },
  { id: "sepia", label: "Sepia", swatches: ["#8b5a2b", "#f5deb3", "#a0522d"] },
  { id: "mono", label: "Mono", swatches: ["#fff", "#0a0a0a", "#888"] },
];

export interface PixelThemeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const PixelThemeSelector = React.forwardRef<HTMLDivElement, PixelThemeSelectorProps>(
  ({ className, value = "nintendo", onValueChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="theme-selector"
        className={cn("w-full font-[family-name:var(--pixel-font)]", className)}
        {...props}
      >
        <div className="mb-2 flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          <Palette className="h-3 w-3" strokeWidth={3} /> Theme
        </div>
        <div className="flex flex-wrap gap-2">
          {THEME_OPTIONS.map((theme) => {
            const active = value === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onValueChange?.(theme.id)}
                data-active={active}
                className={cn(
                  "flex items-center gap-2 border-2 border-foreground px-3 py-2 text-[0.7rem] uppercase tracking-widest transition-all",
                  "hover:-translate-y-0.5",
                  active
                    ? "bg-primary text-primary-foreground shadow-[var(--pixel-shadow)]"
                    : "bg-card hover:bg-accent"
                )}
              >
                <span className="flex gap-0.5">
                  {theme.swatches.map((c, i) => (
                    <span
                      key={i}
                      className="h-3 w-3 border border-foreground/40"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
                {theme.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
PixelThemeSelector.displayName = "PixelThemeSelector";

export { PixelThemeSelector };
