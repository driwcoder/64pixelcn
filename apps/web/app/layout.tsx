import type { Metadata } from "next";
import { Press_Start_2P, VT323, Silkscreen, Pixelify_Sans, DotGothic16, Jacquard_12, Jacquard_24, Handjet } from "next/font/google";
import "./globals.css";
import { PixelProvider } from "@/components/pixel-provider";
import { PIXEL_SETTINGS_SCRIPT } from "@/lib/pixel-settings";
import { buildThemeCss } from "@/lib/tokens";
import { InlineScript } from "@/components/inline-script";

// Only the default font (Silkscreen) is preloaded; the rest download when a
// preset selects them (data-font on <html>), instead of 12 files on every page.
const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start", preload: false });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323", preload: false });
const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-silkscreen" });
const pixelify = Pixelify_Sans({ weight: "400", subsets: ["latin"], variable: "--font-pixelify", preload: false });
const dotgothic = DotGothic16({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-dotgothic", preload: false });
// Pixel blackletter (OFL) - free stand-in for the "Blasphemous" game look.
const jacquard = Jacquard_12({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-jacquard", preload: false });
const jacquard24 = Jacquard_24({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-jacquard24", preload: false });
const handjet = Handjet({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-handjet", preload: false });

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
