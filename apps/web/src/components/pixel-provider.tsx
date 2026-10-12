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

import { APPEARANCE_ATTRS, APPEARANCE_VALUES, DEFAULT_APPEARANCE, type Appearance } from "@/lib/tokens";
import { STORAGE_KEY } from "@/lib/pixel-settings";

interface PixelContextValue extends Appearance {
  /** The saved settings as one object. */
  appearance: Appearance;
  /** Change saved settings (Display). Applied to <html> right away. */
  update: (patch: Partial<Appearance>) => void;
  /** True while a page (e.g. /create) drives the look instead of Display. */
  overridden: boolean;
  /** Temporarily render with other settings without touching the saved ones. */
  setOverride: (s: Appearance | null) => void;
}

const PixelContext = createContext<PixelContextValue | undefined>(undefined);

const DEFAULTS = DEFAULT_APPEARANCE;
const KEYS = Object.keys(DEFAULTS) as (keyof Appearance)[];

function loadSettings(): Appearance {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    // Validate: stale values from older versions (e.g. a removed font) and
    // fields that didn't exist yet fall back to the default.
    const out = { ...DEFAULTS } as Record<keyof Appearance, unknown>;
    for (const k of KEYS) {
      if ((APPEARANCE_VALUES[k] as readonly unknown[]).includes(parsed[k])) out[k] = parsed[k];
    }
    return out as Appearance;
  } catch {
    return DEFAULTS;
  }
}

function applyToDocument(settings: Appearance) {
  const root = document.documentElement;
  for (const k of KEYS) root.setAttribute(APPEARANCE_ATTRS[k], String(settings[k]));
  // shadcn/Tailwind `dark:` variants key off the .dark class.
  root.classList.toggle("dark", settings.mode === "dark");
}

export function PixelProvider({ children }: { children: ReactNode }) {
  // `null` until loaded: the first client render uses DEFAULTS so it matches
  // the server HTML (no hydration mismatch). The inline script already put
  // the saved values on <html>, so the page is styled correctly meanwhile,
  // and nothing below writes DEFAULTS over them.
  const [settings, setSettings] = useState<Appearance | null>(null);
  const [override, setOverride] = useState<Appearance | null>(null);

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

  const update = useCallback((patch: Partial<Appearance>) => {
    setSettings((cur) => ({ ...(cur ?? DEFAULTS), ...patch }));
  }, []);

  const value = useMemo<PixelContextValue>(
    () => ({
      ...(settings ?? DEFAULTS),
      appearance: settings ?? DEFAULTS,
      update,
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
