"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, RotateCcw, Shuffle } from "@/components/ui/icons";
import { usePixel } from "@/components/pixel-provider";
import { CreatePreview } from "@/components/create-preview";
import { PixelButton } from "@/components/ui/button";
import { PixelInput } from "@/components/ui/input";
import { PixelSwitch } from "@/components/ui/switch";
import { PixelSelect, PixelSelectContent, PixelSelectItem, PixelSelectTrigger, PixelSelectValue } from "@/components/ui/select";
import { AppearanceSelects } from "@/components/appearance-selects";
import { APPEARANCE_VALUES, type Appearance } from "@/lib/tokens";
import { DEFAULT_CHOICE, decodePreset, encodePreset, type PresetChoice } from "@/lib/preset-registry";
import { cn } from "@/lib/utils";

const PACKAGE_MANAGERS = {
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "yarn dlx shadcn@latest",
  bun: "bunx --bun shadcn@latest",
} as const;
type PackageManager = keyof typeof PACKAGE_MANAGERS;
type ProjectMode = "new" | "existing";

/** `shadcn init --template` values (shadcn CLI v4). */
const FRAMEWORKS = {
  next: "Next.js",
  vite: "Vite",
  start: "TanStack Start",
  "react-router": "React Router",
  astro: "Astro",
} as const;
type Framework = keyof typeof FRAMEWORKS;

// Public origin of this site, so the command points at the registry that
// actually serves the preset (localhost in dev, the deployment in prod).
const subscribeNoop = () => () => {};
function useOrigin() {
  return React.useSyncExternalStore(subscribeNoop, () => window.location.origin, () => "https://pixelcn.vercel.app");
}

/** ?preset=<code> holds the whole preset, so a link reproduces it exactly. */
function choiceFromParams(params: URLSearchParams): PresetChoice {
  const code = params.get("preset");
  return (code && decodePreset(code)) || DEFAULT_CHOICE;
}

/** npm-safe project folder name. */
function toProjectName(raw: string) {
  return raw.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^[-._]+|[-._]+$/g, "") || "my-pixel-app";
}

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function PresetBuilder() {
  const searchParams = useSearchParams();
  const [choice, setChoice] = React.useState<PresetChoice>(() => choiceFromParams(searchParams));
  const [mode, setMode] = React.useState<ProjectMode>("new");
  const [framework, setFramework] = React.useState<Framework>("next");
  const [pm, setPm] = React.useState<PackageManager>("npm");
  const [name, setName] = React.useState("my-pixel-app");
  const { setOverride } = usePixel();
  const origin = useOrigin();

  const update = (patch: Partial<PresetChoice>) => setChoice((c) => ({ ...c, ...patch }));

  // The page renders with the preset being built, not with the Display
  // settings, so what you see is exactly what the command installs.
  // Keyed by value so the effect runs only when the look actually changes.
  const appearanceKey = JSON.stringify(Object.fromEntries(Object.entries(choice).filter(([k]) => k !== "components")));
  React.useEffect(() => {
    setOverride(JSON.parse(appearanceKey) as Appearance);
  }, [appearanceKey, setOverride]);
  React.useEffect(() => () => setOverride(null), [setOverride]);

  // Keep the URL shareable.
  const code = encodePreset(choice);
  React.useEffect(() => {
    window.history.replaceState(null, "", `?preset=${code}`);
  }, [code]);

  const url = `${origin}/r/presets/${code}.json`;
  const runner = PACKAGE_MANAGERS[pm];
  const command =
    mode === "new"
      ? `${runner} init --template ${framework} --base radix --name ${toProjectName(name)} --preset ${url}`
      : `${runner} init --force --no-reinstall --preset ${url}`;

  const shuffle = () =>
    setChoice((c) => ({
      ...c,
      theme: pick(APPEARANCE_VALUES.theme),
      mode: pick(APPEARANCE_VALUES.mode),
      font: pick(APPEARANCE_VALUES.font),
      size: pick(APPEARANCE_VALUES.size),
      radius: pick(APPEARANCE_VALUES.radius),
      shading: pick(APPEARANCE_VALUES.shading),
    }));

  return (
    <div className="mx-auto grid w-full max-w-[100rem] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
      {/* Grid areas: phones show title + command, then options, then the
          preview; on lg the options column spans both rows on the left. */}
      <div className="min-w-0 lg:col-start-2 lg:row-start-1">
        <div className="mb-6">
          <h1 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest break-words">Create</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick your colors, font and sizes. The page previews exactly what your project gets; Display settings are paused here.
          </p>
        </div>
        {/* ── Command ──────────────────────────────────────────── */}
        <div className="pixel-raised space-y-3 bg-card p-4">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <div className="space-y-1">
              <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Project</div>
              <Segmented
                label="Project"
                value={mode}
                onChange={setMode}
                options={[{ id: "new", label: "New" }, { id: "existing", label: "Existing" }]}
              />
            </div>
            <div className="space-y-1">
              <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Package manager</div>
              <Segmented
                label="Package manager"
                value={pm}
                onChange={setPm}
                options={(Object.keys(PACKAGE_MANAGERS) as PackageManager[]).map((id) => ({ id, label: id }))}
              />
            </div>
            {mode === "new" && (
              <div className="min-w-0 basis-40 space-y-1">
                <label htmlFor="create-framework" className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">Framework</label>
                <PixelSelect value={framework} onValueChange={(v) => setFramework(v as Framework)}>
                  <PixelSelectTrigger id="create-framework" className="h-auto min-h-10 text-[0.7rem] uppercase tracking-widest">
                    <PixelSelectValue />
                  </PixelSelectTrigger>
                  <PixelSelectContent>
                    {(Object.keys(FRAMEWORKS) as Framework[]).map((id) => (
                      <PixelSelectItem key={id} value={id} className="text-[0.7rem] uppercase tracking-widest">{FRAMEWORKS[id]}</PixelSelectItem>
                    ))}
                  </PixelSelectContent>
                </PixelSelect>
              </div>
            )}
            {mode === "new" && (
              <div className="min-w-0 flex-1 basis-48 space-y-1">
                <label htmlFor="project-name" className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Project name</label>
                <PixelInput id="project-name" value={name} onChange={(e) => setName(e.target.value)} spellCheck={false} />
              </div>
            )}
          </div>
          <CommandBox command={command} />
          <p className="text-[0.65rem] leading-relaxed text-muted-foreground">
            {mode === "new"
              ? `Creates a ${FRAMEWORKS[framework]} app with this preset, its font and every component already configured.`
              : "Run inside your project root. Replaces components.json and theme variables with this preset."}
          </p>
        </div>
      </div>

      {/* ── Options ───────────────────────────────────────────── */}
      <aside aria-label="Preset options" className="pixel-raised lg:col-start-1 lg:row-span-2 lg:row-start-1 bg-card lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100dvh-5.5rem)] lg:self-start lg:overflow-y-auto">
        <div className="space-y-4 p-4">
          <AppearanceSelects value={choice} onChange={update} idPrefix="create" />
          <label className="flex items-center justify-between gap-3 text-[0.7rem] uppercase tracking-widest">
            Install all components
            <PixelSwitch checked={choice.components} onCheckedChange={(v) => update({ components: v })} />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <PixelButton variant="outline" size="sm" onClick={shuffle}><Shuffle className="h-3.5 w-3.5" /> Shuffle</PixelButton>
            <PixelButton variant="ghost" size="sm" onClick={() => setChoice(DEFAULT_CHOICE)}><RotateCcw className="h-3.5 w-3.5" /> Reset</PixelButton>
          </div>
        </div>

      </aside>

      {/* ── Preview ───────────────────────────────────────────── */}
      <section aria-label="Preset preview" className="min-w-0 lg:col-start-2 lg:row-start-2">
        <CreatePreview />
      </section>
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "border-[length:var(--pixel-line,2px)] px-2 py-1 text-[0.65rem] uppercase tracking-widest transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === o.id ? "border-foreground bg-primary text-primary-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CommandBox({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    // Optimistic: confirm right away, roll back if the clipboard refuses.
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
    navigator.clipboard.writeText(command).catch(() => {
      clearTimeout(timer.current);
      setCopied(false);
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      <pre className="min-w-0 flex-1 overflow-auto whitespace-pre-wrap wrap-anywhere border-[length:var(--pixel-line,2px)] border-border bg-muted p-3 font-mono text-[0.6875rem] leading-relaxed">
        <code>{command}</code>
      </pre>
      <PixelButton className="shrink-0" onClick={copy} aria-live="polite">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy command"}
      </PixelButton>
    </div>
  );
}
