"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Preset = "nintendo" | "gameboy" | "neon" | "sepia" | "mono";
export type PixelFont =
  | "press-start"
  | "vt323"
  | "silkscreen"
  | "pixelify"
  | "dotgothic"
  | "system";
export type PixelSize = 8 | 16 | 32 | 64 | 128;
export type TextScale = "xs" | "sm" | "md" | "lg" | "xl";

interface PixelContextValue {
  preset: Preset;
  setPreset: (p: Preset) => void;
  font: PixelFont;
  setFont: (f: PixelFont) => void;
  size: PixelSize;
  setSize: (s: PixelSize) => void;
  textScale: TextScale;
  setTextScale: (s: TextScale) => void;
}

const PixelContext = createContext<PixelContextValue | undefined>(undefined);

const STORAGE_KEY = "pixelcn-settings";

interface StoredSettings {
  preset: Preset;
  font: PixelFont;
  size: PixelSize;
  textScale: TextScale;
}

const DEFAULTS: StoredSettings = {
  preset: "nintendo",
  font: "press-start",
  size: 64,
  textScale: "md",
};

function loadSettings(): StoredSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<StoredSettings>;
    return {
      preset: parsed.preset ?? DEFAULTS.preset,
      font: parsed.font ?? DEFAULTS.font,
      size: parsed.size ?? DEFAULTS.size,
      textScale: parsed.textScale ?? DEFAULTS.textScale,
    };
  } catch {
    return DEFAULTS;
  }
}

export function PixelProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoredSettings>(() =>
    typeof window === "undefined" ? DEFAULTS : loadSettings()
  );

  const { preset, font, size, textScale } = settings;

  const persist = useCallback((next: StoredSettings) => {
    setSettings(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / private mode errors */
    }
  }, []);

  const setPreset = useCallback(
    (p: Preset) => persist({ ...settings, preset: p }),
    [persist, settings]
  );
  const setFont = useCallback(
    (f: PixelFont) => persist({ ...settings, font: f }),
    [persist, settings]
  );
  const setSize = useCallback(
    (s: PixelSize) => persist({ ...settings, size: s }),
    [persist, settings]
  );
  const setTextScale = useCallback(
    (s: TextScale) => persist({ ...settings, textScale: s }),
    [persist, settings]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-preset", preset);
    root.setAttribute("data-font", font);
    root.setAttribute("data-size", String(size));
    root.setAttribute("data-text-scale", textScale);
  }, [preset, font, size, textScale]);

  return (
    <PixelContext.Provider
      value={{ preset, setPreset, font, setFont, size, setSize, textScale, setTextScale }}
    >
      {children}
    </PixelContext.Provider>
  );
}

export function usePixel() {
  const ctx = useContext(PixelContext);
  if (!ctx) throw new Error("usePixel must be used within PixelProvider");
  return ctx;
}
