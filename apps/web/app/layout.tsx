import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { PixelProvider } from "@/components/pixel-provider";
import { PIXEL_SETTINGS_SCRIPT } from "@/lib/pixel-settings";
import { buildThemeCss } from "@/lib/tokens";
import { InlineScript } from "@/components/inline-script";

export const metadata: Metadata = {
  title: "64pixelcn — Pixel Art Component Library",
  description: "A pixel art component library based on shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts are self-hosted (app/fonts.css). Only the default font's latin
            subset is preloaded; the rest download when a preset uses them. */}
        <link rel="preload" href="/fonts/silkscreen-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* Theme tokens (presets, sizes, fonts, text scales) from lib/tokens.ts. */}
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss() }} />
        {/* Applies saved preset/font/size before first paint (no theme flash). */}
        <InlineScript html={PIXEL_SETTINGS_SCRIPT} />
      </head>
      <body>
        <PixelProvider>{children}</PixelProvider>
      </body>
    </html>
  );
}
