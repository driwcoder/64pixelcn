import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PixelProvider } from "@/components/pixel-provider";
import { PIXEL_SETTINGS_SCRIPT } from "@/lib/pixel-settings";
import { buildThemeCss } from "@/lib/tokens";
import { InlineScript } from "@/components/inline-script";

// Fonts are self-hosted (app/fonts, SIL OFL, latin subset from Fontsource)
// so the build never depends on reaching Google Fonts. Only the default font
// (Silkscreen) is preloaded; the rest download when a preset selects them
// (data-font on <html>).
const pressStart = localFont({ src: "./fonts/press-start-2p.woff2", variable: "--font-press-start", preload: false });
const vt323 = localFont({ src: "./fonts/vt323.woff2", variable: "--font-vt323", preload: false });
const silkscreen = localFont({ src: "./fonts/silkscreen.woff2", variable: "--font-silkscreen" });
const pixelify = localFont({ src: "./fonts/pixelify-sans.woff2", variable: "--font-pixelify", preload: false });
const dotgothic = localFont({ src: "./fonts/dotgothic16.woff2", variable: "--font-dotgothic", preload: false });
// Pixel blackletter (OFL) - free stand-in for the "Blasphemous" game look.
const jacquard = localFont({ src: "./fonts/jacquard-12.woff2", variable: "--font-jacquard", preload: false });
const jacquard24 = localFont({ src: "./fonts/jacquard-24.woff2", variable: "--font-jacquard24", preload: false });
const handjet = localFont({ src: "./fonts/handjet.woff2", variable: "--font-handjet", preload: false });

export const metadata: Metadata = {
  title: "64pixelcn — Pixel Art Component Library",
  description: "A pixel art component library based on shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${pressStart.variable} ${vt323.variable} ${silkscreen.variable} ${pixelify.variable} ${dotgothic.variable} ${jacquard.variable} ${jacquard24.variable} ${handjet.variable}`}>
      <head>
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
