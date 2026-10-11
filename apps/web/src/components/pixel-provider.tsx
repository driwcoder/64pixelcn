"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Preset = "nintendo" | "gameboy" | "neon" | "sepia" | "mono";
export type PixelFont = "press-start" | "vt323" | "silkscreen" | "pixelify" | "monogram" | "system";
export type PixelSize = 8 | 16 | 32 | 64 | 128;

interface PixelContextValue {
  preset: Preset;
  setPreset: (p: Preset) => void;
  font: PixelFont;
  setFont: (f: PixelFont) => void;
  size: PixelSize;
  setSize: (s: PixelSize) => void;
}

const PixelContext = createContext<PixelContextValue | undefined>(undefined);

export function PixelProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<Preset>("nintendo");
  const [font, setFont] = useState<PixelFont>("press-start");
  const [size, setSize] = useState<PixelSize>(64);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-preset", preset);
    root.setAttribute("data-font", font);
    root.setAttribute("data-size", String(size));
  }, [preset, font, size]);

  return (
    <PixelContext.Provider value={{ preset, setPreset, font, setFont, size, setSize }}>
      {children}
    </PixelContext.Provider>
  );
}

export function usePixel() {
  const ctx = useContext(PixelContext);
  if (!ctx) throw new Error("usePixel must be used within PixelProvider");
  return ctx;
}
