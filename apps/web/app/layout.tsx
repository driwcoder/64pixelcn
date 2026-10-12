import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { PixelProvider } from "@/components/pixel-provider";
import { PIXEL_SETTINGS_SCRIPT } from "@/lib/pixel-settings";
import { buildThemeCss } from "@/lib/pixel-engine";
import { APPEARANCE_ATTRS, DEFAULT_APPEARANCE, type Appearance } from "@/lib/tokens";

// The default settings as <html> attributes, so the engine's attribute-scoped
// rules apply on a first visit too (the inline script swaps in saved ones).
const DEFAULT_ATTRS = Object.fromEntries(
  (Object.keys(APPEARANCE_ATTRS) as (keyof Appearance)[]).map((k) => [APPEARANCE_ATTRS[k], String(DEFAULT_APPEARANCE[k])])
);
import { InlineScript } from "@/components/inline-script";

export const metadata: Metadata = {
  title: "64pixelcn — Pixel Art Component Library",
  description: "A pixel art component library based on shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning {...DEFAULT_ATTRS}>
      <head>
        {/* Fonts are self-hosted (app/fonts.css). Only the default font's latin
            subset is preloaded; the rest download when a font setting uses them. */}
        <link rel="preload" href="/fonts/silkscreen-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* Theme tokens (themes, sizes, fonts, text scales) from lib/tokens.ts. */}
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss() }} />
        {/* Applies saved theme/font/size before first paint (no theme flash). */}
        <InlineScript html={PIXEL_SETTINGS_SCRIPT} />
      </head>
      <body>
        <PixelProvider>{children}</PixelProvider>
      </body>
    </html>
  );
}
