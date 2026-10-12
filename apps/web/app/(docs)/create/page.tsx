"use client";

import { PixelButton } from "@/components/ui/button";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { PixelBadge } from "@/components/ui/badge";
import { usePixel, type Preset, type PixelFont, type PixelSize, type TextScale } from "@/components/pixel-provider";
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
  { id: "pixelify", label: "Pixelify Sans" },
  { id: "dotgothic", label: "DotGothic16" },
  { id: "system", label: "System Mono" },
];

const SIZES: PixelSize[] = [8, 16, 32, 64, 128];

const TEXT_SCALES: { id: TextScale; label: string; hint: string }[] = [
  { id: "xs", label: "XS", hint: "0.8×" },
  { id: "sm", label: "Small", hint: "0.9×" },
  { id: "md", label: "Medium", hint: "1×" },
  { id: "lg", label: "Large", hint: "1.15×" },
  { id: "xl", label: "XL", hint: "1.3×" },
];

export default function CreatePage() {
  const { preset, setPreset, font, setFont, size, setSize, textScale, setTextScale } = usePixel();

  const installCommand = `npx shadcn@latest init https://pixelcn.vercel.app/r/pixelcn.json`;

  return (
    <div className="px-6 py-12 pb-24">
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

        {/* Text Size */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle>Text Size</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Shrink the text so pixel components feel less bulky and take up less space.
            </p>
            <div className="flex flex-wrap gap-2">
              {TEXT_SCALES.map((t) => (
                <PixelButton
                  key={t.id}
                  variant={textScale === t.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTextScale(t.id)}
                >
                  {t.label} <span className="text-[10px] opacity-70">{t.hint}</span>
                </PixelButton>
              ))}
            </div>
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
    </div>
  );
}
