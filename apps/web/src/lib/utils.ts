import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Size = 8 | 16 | 32 | 64 | 128;

export const SIZES: Size[] = [8, 16, 32, 64, 128];

export type Preset = "nintendo" | "gameboy" | "neon" | "sepia" | "mono";

export const PRESETS: Preset[] = ["nintendo", "gameboy", "neon", "sepia", "mono"];

export type PixelFont = "press-start" | "vt323" | "silkscreen" | "pixelify" | "dotgothic" | "system";

export const FONTS: PixelFont[] = ["press-start", "vt323", "silkscreen", "pixelify", "dotgothic", "system"];

export interface PixelConfig {
  preset: Preset;
  font: PixelFont;
  size: Size;
}
