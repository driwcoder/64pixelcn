"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

import {
  PRESETS,
  PIXEL_FONTS,
  PIXEL_SIZES,
  TEXT_SCALES,
  STORAGE_KEY,
  type Preset,
  type PixelFont,
  type PixelSize,
  type TextScale,
} from "@/lib/pixel-settings";

export type { Preset, PixelFont, PixelSize, TextScale };

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

function pick<T>(allowed: readonly T[], value: unknown, fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function loadSettings(): StoredSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<StoredSettings>;
    // Validate: stale values from older versions (e.g. a removed font) fall
    // back to the default instead of leaving the UI unstyled.
    return {
      preset: pick(PRESETS, parsed.preset, DEFAULTS.preset),
      font: pick(PIXEL_FONTS, parsed.font, DEFAULTS.font),
      size: pick(PIXEL_SIZES, parsed.size, DEFAULTS.size),
      textScale: pick(TEXT_SCALES, parsed.textScale, DEFAULTS.textScale),
    };
  } catch {
    return DEFAULTS;
  }
}

function applyToDocument({ preset, font, size, textScale }: StoredSettings) {
  const root = document.documentElement;
  root.setAttribute("data-preset", preset);
  root.setAttribute("data-font", font);
  root.setAttribute("data-size", String(size));
  root.setAttribute("data-text-scale", textScale);
}

export function PixelProvider({ children }: { children: ReactNode }) {
  // `null` until loaded: the first client render uses DEFAULTS so it matches
  // the server HTML (no hydration mismatch). The inline script already put
  // the saved values on <html>, so the page is styled correctly meanwhile,
  // and nothing below writes DEFAULTS over them.
  const [settings, setSettings] = useState<StoredSettings | null>(null);

  useEffect(() => {
    // Syncing from an external store (localStorage) after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    if (!settings) return;
    applyToDocument(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore quota / private mode errors */
    }
  }, [settings]);

  const update = useCallback((patch: Partial<StoredSettings>) => {
    setSettings((cur) => ({ ...(cur ?? DEFAULTS), ...patch }));
  }, []);

  const value = useMemo<PixelContextValue>(
    () => ({
      ...(settings ?? DEFAULTS),
      setPreset: (preset) => update({ preset }),
      setFont: (font) => update({ font }),
      setSize: (size) => update({ size }),
      setTextScale: (textScale) => update({ textScale }),
    }),
    [settings, update]
  );

  return <PixelContext.Provider value={value}>{children}</PixelContext.Provider>;
}

export function usePixel() {
  const ctx = useContext(PixelContext);
  if (!ctx) throw new Error("usePixel must be used within PixelProvider");
  return ctx;
}
