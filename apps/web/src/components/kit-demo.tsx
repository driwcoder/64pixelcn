"use client";

import * as React from "react";
import { drawPanel, type PanelRole } from "@/kit/canvas";
import { usePixel } from "@/components/pixel-provider";
import { THEMES, paletteTokens } from "@/lib/tokens";
import type { Tone } from "@/lib/palette-theme";

const PANELS: { role: PanelRole; tone: Tone; label: string; w: number; h: number }[] = [
  { role: "raised", tone: "surface", label: "raised", w: 150, h: 90 },
  { role: "raised", tone: "primary", label: "primary", w: 120, h: 44 },
  { role: "raised", tone: "destructive", label: "destructive", w: 120, h: 44 },
  { role: "sunken", tone: "surface", label: "sunken", w: 150, h: 44 },
  { role: "surface", tone: "secondary", label: "surface", w: 120, h: 44 },
];

/**
 * The same panels the CSS draws, rendered on a canvas by the kit's
 * drawPanel() with the current Display settings. Scaled up 3x with
 * nearest-neighbor so the pixels are visible.
 */
export function KitCanvasDemo() {
  const { appearance } = usePixel();
  const ref = React.useRef<HTMLCanvasElement>(null);
  const SCALE = 3;
  const W = 300;
  const H = 210;

  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.scale(SCALE, SCALE);
    const bg = paletteTokens(appearance.theme, appearance.mode).background;
    ctx.fillStyle = bg.startsWith("var(") ? "#000" : bg;
    ctx.fillRect(0, 0, W, H);
    const place = [
      [10, 10],
      [175, 10],
      [175, 70],
      [10, 120],
      [175, 130],
    ];
    PANELS.forEach((p, i) => {
      drawPanel(ctx, { ...appearance, x: place[i][0], y: place[i][1], width: p.w, height: p.h, role: p.role, tone: p.tone });
    });
  }, [appearance]);

  return (
    <figure className="space-y-2">
      <canvas
        ref={ref}
        width={W * 3}
        height={H * 3}
        role="img"
        aria-label={`Canvas panels drawn by drawPanel() with the ${THEMES[appearance.theme].label} theme`}
        className="block h-auto w-full max-w-[900px] [image-rendering:pixelated]"
      />
      <figcaption className="text-[0.7rem] text-muted-foreground">
        Drawn on a canvas by <code className="font-mono">drawPanel()</code> with your Display settings ({PANELS.map((p) => p.label).join(", ")}).
        Change the theme, pixel size, corners, shading or border and it redraws.
      </figcaption>
    </figure>
  );
}
