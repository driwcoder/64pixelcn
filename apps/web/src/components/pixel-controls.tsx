"use client";

import * as React from "react";
import { Settings2, ChevronDown, Check } from "lucide-react";
import {
  usePixel,
  type Preset,
  type PixelFont,
  type PixelSize,
  type TextScale,
} from "./pixel-provider";
import { cn } from "@/lib/utils";

const FONTS: { id: PixelFont; label: string }[] = [
  { id: "press-start", label: "Press Start 2P" },
  { id: "vt323", label: "VT323" },
  { id: "silkscreen", label: "Silkscreen" },
  { id: "pixelify", label: "Pixelify Sans" },
  { id: "dotgothic", label: "DotGothic16" },
  { id: "system", label: "System Mono" },
];

const SIZES: PixelSize[] = [8, 16, 32, 64, 128];

const TEXT_SCALES: { id: TextScale; label: string }[] = [
  { id: "xs", label: "XS" },
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
  { id: "xl", label: "XL" },
];

const PRESETS: { id: Preset; label: string; swatch: string }[] = [
  { id: "nintendo", label: "Nintendo", swatch: "#ff5f6d" },
  { id: "gameboy", label: "GameBoy", swatch: "#8bac0f" },
  { id: "neon", label: "Neon", swatch: "#f0f" },
  { id: "sepia", label: "Sepia", swatch: "#c08552" },
  { id: "mono", label: "Mono", swatch: "#e0e0e0" },
];

function Option({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[10px] uppercase tracking-widest transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground"
      )}
    >
      <span>{children}</span>
      {active && <Check className="h-3 w-3 shrink-0" strokeWidth={3} />}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b-2 border-border py-2 last:border-b-0">
      <div className="px-3 pb-1 text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

export function PixelControls() {
  const { preset, setPreset, font, setFont, size, setSize, textScale, setTextScale } = usePixel();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 border-2 border-foreground bg-transparent px-2.5 py-1.5 text-[10px] uppercase tracking-widest text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Settings2 className="h-3.5 w-3.5" strokeWidth={3} />
        <span className="hidden sm:inline">Display</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
          strokeWidth={3}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 w-52 border-2 border-foreground bg-popover text-popover-foreground shadow-[var(--pixel-shadow)]"
        >
          <Group label="Color Preset">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[10px] uppercase tracking-widest transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  preset === p.id && "bg-accent text-accent-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-3 w-3 border-2 border-current"
                    style={{ backgroundColor: p.swatch }}
                  />
                  {p.label}
                </span>
                {preset === p.id && <Check className="h-3 w-3 shrink-0" strokeWidth={3} />}
              </button>
            ))}
          </Group>

          <Group label="Font">
            {FONTS.map((f) => (
              <Option key={f.id} active={font === f.id} onClick={() => setFont(f.id)}>
                {f.label}
              </Option>
            ))}
          </Group>

          <Group label="Text Size">
            {TEXT_SCALES.map((t) => (
              <Option
                key={t.id}
                active={textScale === t.id}
                onClick={() => setTextScale(t.id)}
              >
                {t.label}
              </Option>
            ))}
          </Group>

          <Group label="Pixel Size">
            {SIZES.map((s) => (
              <Option key={s} active={size === s} onClick={() => setSize(s)}>
                {s}px
              </Option>
            ))}
          </Group>
        </div>
      )}
    </div>
  );
}
