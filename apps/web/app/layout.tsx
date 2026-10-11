import type { Metadata } from "next";
import { Press_Start_2P, VT323, Silkscreen } from "next/font/google";
import "./globals.css";
import { PixelProvider } from "@/components/pixel-provider";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });
const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-silkscreen" });

export const metadata: Metadata = {
  title: "64pixelcn — Pixel Art Component Library",
  description: "A pixel art component library based on shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${pressStart.variable} ${vt323.variable} ${silkscreen.variable}`}>
      <body>
        <PixelProvider>{children}</PixelProvider>
      </body>
    </html>
  );
}
