"use client";

import * as React from "react";
import { Settings2, ChevronDown, Check } from "@/components/ui/icons";
import { usePixel } from "./pixel-provider";
import { FONTS, FONT_IDS, PIXEL_SIZES, PRESETS, PRESET_IDS, TEXT_SCALES, TEXT_SCALE_IDS } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const FONT_OPTIONS = FONT_IDS.map((id) => ({ id, label: FONTS[id].label }));
const SIZE_OPTIONS = PIXEL_SIZES;
const TEXT_SCALE_OPTIONS = TEXT_SCALE_IDS.map((id) => ({ id, label: TEXT_SCALES[id].label }));
const PRESET_OPTIONS = PRESET_IDS.map((id) => ({ id, ...PRESETS[id] }));

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
      role="menuitemradio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[0.7rem] uppercase tracking-widest transition-colors",
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
      <div className="px-3 pb-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

export function PixelControls() {
  const { preset, setPreset, font, setFont, size, setSize, textScale, setTextScale, overridden } = usePixel();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // On /create the preset builder drives the look, so Display is paused to
  // avoid two conflicting sources of settings.
  if (overridden) {
    return (
      <span
        title="Display settings are paused while you build a preset"
        className="flex items-center gap-1.5 border-2 border-dashed border-muted-foreground px-2.5 py-1.5 text-[0.7rem] uppercase tracking-widest text-muted-foreground"
      >
        <Settings2 className="h-3.5 w-3.5" strokeWidth={3} />
        <span className="hidden sm:inline">Display off</span>
      </span>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 border-2 border-foreground bg-transparent px-2.5 py-1.5 text-[0.7rem] uppercase tracking-widest text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
          className="absolute right-0 top-full z-50 mt-1 max-h-[calc(100dvh-4.5rem)] w-56 max-w-[calc(100vw-2rem)] overflow-y-auto border-2 border-foreground bg-popover text-popover-foreground shadow-[var(--pixel-shadow)]"
        >
          <Group label="Color Preset">
            {PRESET_OPTIONS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="menuitemradio"
                aria-checked={preset === p.id}
                onClick={() => setPreset(p.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[0.7rem] uppercase tracking-widest transition-colors",
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
            {FONT_OPTIONS.map((f) => (
              <Option key={f.id} active={font === f.id} onClick={() => setFont(f.id)}>
                {f.label}
              </Option>
            ))}
          </Group>

          <Group label="Text Size">
            {TEXT_SCALE_OPTIONS.map((t) => (
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
            {SIZE_OPTIONS.map((s) => (
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
