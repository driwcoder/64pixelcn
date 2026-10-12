import type { Metadata } from "next";
import { KitCanvasDemo } from "@/components/kit-demo";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kit — 64pixelcn",
  description: "pixelcn without React: one CSS file and one ES module for browser games and vanilla JS apps.",
};

const pre = "overflow-x-auto border-[length:var(--pixel-line,2px)] border-border bg-muted p-4 font-mono text-[0.6875rem] leading-relaxed";

const HTML_EXAMPLE = `<link rel="stylesheet" href="https://pixelcn.vercel.app/kit/pixelcn.css">

<html data-theme="waldgeist" data-mode="dark" data-size="64"
      data-radius="md" data-shading="bevel" data-border="solid">
  <div class="pixel-raised" style="background: var(--card); padding: 1rem">
    Inventory
    <button class="pixel-raised pixel-tone-primary"
            style="background: var(--primary); color: var(--primary-foreground)">
      Equip
    </button>
    <input class="pixel-sunken" placeholder="Search">
  </div>
</html>`;

const JS_EXAMPLE = `import { applyAppearance, applyPalette, drawPanel } from "https://pixelcn.vercel.app/kit/pixelcn.min.js";

// Switch theme, size, corners... (same options as the Display menu)
applyAppearance({ theme: "lux2k", size: 128, shading: "deep", border: "selout" });

// Any palette, e.g. pasted from a Lospec .hex file
applyPalette(["2e222f", "45293f", "7a3045", "993d41", "cd683d", "fbb954", "f2ec8b"]);

// Draw the same panel on a canvas (Phaser, PixiJS, plain 2D context)
const ctx = canvas.getContext("2d");
const content = drawPanel(ctx, {
  x: 8, y: 8, width: 160, height: 64,
  theme: "vinik24", size: 64, radius: "md", shading: "bevel",
  role: "raised", tone: "primary",
});
ctx.fillText("Start", content.x + 8, content.y + 20);`;

export default function KitPage() {
  return (
    <div className="px-4 py-8 pb-24 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6 text-[0.75rem] leading-relaxed">
        <div>
          <h1 className="mb-2 text-xl uppercase tracking-widest">Kit</h1>
          <p className="text-muted-foreground">
            pixelcn without React or Tailwind, for browser games and vanilla JS apps: one CSS file with every theme and setting, and one ES
            module with the themes, the palette-to-theme generator and a canvas renderer that draws the same panels.
          </p>
        </div>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Files</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <ul className="list-disc space-y-1 pl-5 wrap-anywhere">
              <li><a className="text-primary underline underline-offset-4" href="/kit/pixelcn.css">/kit/pixelcn.css</a>: themes, pixel sizes, shading, borders, corners, role classes and fonts (in <code className="font-mono">/kit/fonts</code>).</li>
              <li><a className="text-primary underline underline-offset-4" href="/kit/pixelcn.js">/kit/pixelcn.js</a> (<a className="text-primary underline underline-offset-4" href="/kit/pixelcn.min.js">min</a>): ES module, no dependencies.</li>
            </ul>
          </PixelCardContent>
        </PixelCard>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Canvas</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <KitCanvasDemo />
          </PixelCardContent>
        </PixelCard>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">HTML</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="space-y-3">
            <p>
              Settings are attributes on <code className="font-mono">&lt;html&gt;</code> (or any container). Boxes take a role:{" "}
              <code className="font-mono">pixel-raised</code>, <code className="font-mono">pixel-surface</code> or{" "}
              <code className="font-mono">pixel-sunken</code>, and optionally a tone (<code className="font-mono">pixel-tone-primary</code>,{" "}
              <code className="font-mono">-secondary</code>, <code className="font-mono">-accent</code>, <code className="font-mono">-destructive</code>) that
              picks the color ramp the shading steps through.
            </p>
            <pre className={pre}><code>{HTML_EXAMPLE}</code></pre>
          </PixelCardContent>
        </PixelCard>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">JavaScript</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="space-y-3">
            <pre className={pre}><code>{JS_EXAMPLE}</code></pre>
            <ul className="list-disc space-y-1 pl-5">
              <li><code className="font-mono">applyAppearance(settings, el?)</code>: theme, mode, font, size, textScale, icons, radius, shading, border.</li>
              <li><code className="font-mono">applyPalette(hexes, mode?, el?)</code>: any palette as a theme; returns false if it can&apos;t make that mode.</li>
              <li><code className="font-mono">paletteThemeTokens(hexes, mode)</code>: the generated tokens (roles, charts, ramps) without touching the page.</li>
              <li><code className="font-mono">drawPanel(ctx, options)</code>: draws a panel, returns its content box.</li>
              <li><code className="font-mono">THEMES</code>, <code className="font-mono">LOSPEC_PALETTES</code>, <code className="font-mono">paletteTokens(theme, mode)</code>, <code className="font-mono">rampFor()</code>, <code className="font-mono">contrast()</code>.</li>
            </ul>
          </PixelCardContent>
        </PixelCard>
      </div>
    </div>
  );
}
