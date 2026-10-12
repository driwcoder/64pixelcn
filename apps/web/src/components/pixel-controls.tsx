"use client";

import * as React from "react";
import { Settings2, ChevronDown, RotateCcw } from "@/components/ui/icons";
import { PixelPopover, PixelPopoverContent, PixelPopoverTrigger } from "@/components/ui/popover";
import { AppearanceSelects } from "@/components/appearance-selects";
import { usePixel } from "./pixel-provider";
import { DEFAULT_APPEARANCE } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function PixelControls() {
  const { appearance, update, overridden } = usePixel();
  const [open, setOpen] = React.useState(false);

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
    <PixelPopover open={open} onOpenChange={setOpen}>
      <PixelPopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 border-2 border-foreground bg-transparent px-2.5 py-1.5 text-[0.7rem] uppercase tracking-widest text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Settings2 className="h-3.5 w-3.5" strokeWidth={3} />
          <span className="hidden sm:inline">Display</span>
          <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} strokeWidth={3} />
        </button>
      </PixelPopoverTrigger>
      <PixelPopoverContent
        align="end"
        aria-label="Display settings"
        className="max-h-[calc(100dvh-4.5rem)] w-[min(20rem,calc(100vw-2rem))] space-y-3 overflow-y-auto"
      >
        {/* Every change applies instantly (optimistic) and is saved in the background. */}
        <AppearanceSelects value={appearance} onChange={update} idPrefix="display" />
        <button
          type="button"
          onClick={() => update(DEFAULT_APPEARANCE)}
          className="flex w-full items-center justify-center gap-2 border-2 border-transparent px-2 py-1.5 text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </PixelPopoverContent>
    </PixelPopover>
  );
}
