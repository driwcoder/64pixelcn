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
  DEFAULT_APPEARANCE,
  FONT_IDS,
  PIXEL_SIZES,
  PRESET_IDS,
  TEXT_SCALE_IDS,
  ICON_SET_IDS,
  type Appearance,
  type PixelFont,
  type PixelSize,
  type Preset,
  type TextScale,
  type IconSet,
} from "@/lib/tokens";
import { STORAGE_KEY } from "@/lib/pixel-settings";

interface PixelContextValue {
  preset: Preset;
  setPreset: (p: Preset) => void;
  font: PixelFont;
  setFont: (f: PixelFont) => void;
  size: PixelSize;
  setSize: (s: PixelSize) => void;
  textScale: TextScale;
  setTextScale: (s: TextScale) => void;
  icons: IconSet;
  setIcons: (s: IconSet) => void;
  /** True while a page (e.g. /create) drives the look instead of Display. */
  overridden: boolean;
  /** Temporarily render with other settings without touching the saved ones. */
  setOverride: (s: PixelAppearance | null) => void;
}

const PixelContext = createContext<PixelContextValue | undefined>(undefined);

export type PixelAppearance = Appearance;
type StoredSettings = Appearance;
const DEFAULTS = DEFAULT_APPEARANCE;

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
      preset: pick(PRESET_IDS, parsed.preset, DEFAULTS.preset),
      font: pick(FONT_IDS, parsed.font, DEFAULTS.font),
      size: pick(PIXEL_SIZES, parsed.size, DEFAULTS.size),
      textScale: pick(TEXT_SCALE_IDS, parsed.textScale, DEFAULTS.textScale),
      icons: pick(ICON_SET_IDS, parsed.icons, DEFAULTS.icons),
    };
  } catch {
    return DEFAULTS;
  }
}

function applyToDocument({ preset, font, size, textScale, icons }: StoredSettings) {
  const root = document.documentElement;
  root.setAttribute("data-preset", preset);
  root.setAttribute("data-font", font);
  root.setAttribute("data-size", String(size));
  root.setAttribute("data-text-scale", textScale);
  root.setAttribute("data-icons", icons);
}

export function PixelProvider({ children }: { children: ReactNode }) {
  // `null` until loaded: the first client render uses DEFAULTS so it matches
  // the server HTML (no hydration mismatch). The inline script already put
  // the saved values on <html>, so the page is styled correctly meanwhile,
  // and nothing below writes DEFAULTS over them.
  const [settings, setSettings] = useState<StoredSettings | null>(null);
  const [override, setOverride] = useState<PixelAppearance | null>(null);

  useEffect(() => {
    // Syncing from an external store (localStorage) after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    const applied = override ?? settings;
    if (applied) applyToDocument(applied);
  }, [override, settings]);

  useEffect(() => {
    if (!settings) return;
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
      setIcons: (icons) => update({ icons }),
      overridden: override !== null,
      setOverride,
    }),
    [settings, override, update]
  );

  return <PixelContext.Provider value={value}>{children}</PixelContext.Provider>;
}

export function usePixel() {
  const ctx = useContext(PixelContext);
  if (!ctx) throw new Error("usePixel must be used within PixelProvider");
  return ctx;
}
