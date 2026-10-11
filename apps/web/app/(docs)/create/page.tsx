"use client";

import { PixelButton } from "@/components/ui/button";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { PixelBadge } from "@/components/ui/badge";
import { usePixel, type Preset, type PixelFont, type PixelSize } from "@/components/pixel-provider";
import { cn } from "@/lib/utils";

const PRESETS: { id: Preset; label: string }[] = [
  { id: "nintendo", label: "Nintendo" },
  { id: "gameboy", label: "GameBoy" },
  { id: "neon", label: "Neon" },
  { id: "sepia", label: "Sepia" },
  { id: "mono", label: "Mono" },
];

const FONTS: { id: PixelFont; label: string }[] = [
  { id: "press-start", label: "Press Start 2P" },
  { id: "vt323", label: "VT323" },
  { id: "silkscreen", label: "Silkscreen" },
  { id: "system", label: "System Mono" },
];

const SIZES: PixelSize[] = [8, 16, 32, 64, 128];

export default function CreatePage() {
  const { preset, setPreset, font, setFont, size, setSize } = usePixel();

  const installCommand = `npx shadcn@latest init https://pixelcn.vercel.app/r/pixelcn.json`;

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest">Create Preset</h1>
        <p className="mb-8 text-sm text-muted-foreground">Customize your pixelcn configuration.</p>

        {/* Preset */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle>Color Preset</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <PixelButton
                key={p.id}
                variant={preset === p.id ? "default" : "outline"}
                size="sm"
                onClick={() => setPreset(p.id)}
              >
                {p.label}
              </PixelButton>
            ))}
          </PixelCardContent>
        </PixelCard>

        {/* Font */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle>Font</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="flex flex-wrap gap-2">
            {FONTS.map((f) => (
              <PixelButton
                key={f.id}
                variant={font === f.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFont(f.id)}
              >
                {f.label}
              </PixelButton>
            ))}
          </PixelCardContent>
        </PixelCard>

        {/* Size */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle>Pixel Size</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <PixelButton
                key={s}
                variant={size === s ? "default" : "outline"}
                size="sm"
                onClick={() => setSize(s)}
              >
                {s}px
              </PixelButton>
            ))}
          </PixelCardContent>
        </PixelCard>

        {/* Preview */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle>Preview</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="space-y-4">
            <PixelButton>Primary Button</PixelButton>
            <PixelButton variant="secondary">Secondary</PixelButton>
            <PixelButton variant="outline">Outline</PixelButton>
            <div className="flex gap-2">
              <PixelBadge>Default</PixelBadge>
              <PixelBadge variant="secondary">Secondary</PixelBadge>
              <PixelBadge variant="destructive">Destructive</PixelBadge>
              <PixelBadge variant="outline">Outline</PixelBadge>
            </div>
          </PixelCardContent>
        </PixelCard>

        {/* Install command */}
        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle>Install</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <pre className="border-2 border-border bg-muted p-4 text-xs overflow-x-auto font-mono">
              {installCommand}
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              Registry hosted at{" "}
              <a href="https://pixelcn.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                pixelcn.vercel.app
              </a>
            </p>
          </PixelCardContent>
        </PixelCard>
      </div>
    </main>
  );
}
