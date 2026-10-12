// Icon sets for pixelcn. One mapping from our icon names to each set, read
// from the npm packages at build time, and one renderer used for both:
//  - src/components/ui/icons.tsx: the site's switchable module (all sets,
//    picks the one named by <html data-icons>), written by `pnpm icons:build`;
//  - registry items icons-<set>.json: a static icons.tsx with just that set,
//    written by build-registry.mjs and installed by the chosen preset.
//
// Licenses: pixelarticons (MIT, Gerrit Halfmann); HackerNoon Pixel Icon
// Library icons (CC BY 4.0 - attribution required, see ATTRIBUTION below);
// lucide-react (ISC).

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const PA_DIR = join(dirname(require.resolve("pixelarticons/package.json")), "svg");
const HN_DIR = join(dirname(require.resolve("@hackernoon/pixel-icon-library/package.json")), "icons", "SVG", "regular");

// Set ids, labels and credits come from the token source of truth.
const { ICON_SETS: SETS, DEFAULT_APPEARANCE } = await import("../src/lib/tokens.ts");
export const ICON_SETS = Object.keys(SETS);
export const DEFAULT_ICON_SET = DEFAULT_APPEARANCE.icons;
export const ATTRIBUTION = Object.fromEntries(
  Object.entries(SETS).map(([id, s]) => [id, `Icons: ${s.attribution} - ${s.url}${id === "hackernoon" ? " - https://creativecommons.org/licenses/by/4.0/" : ""}`])
);

// Pixel icons drawn for pixelcn where neither set has one (24x24 grid).
const CUSTOM = {
  // 2x3 grip dots.
  grip: [["rect", { x: 8, y: 5, width: 3, height: 3 }], ["rect", { x: 13, y: 5, width: 3, height: 3 }], ["rect", { x: 8, y: 11, width: 3, height: 3 }], ["rect", { x: 13, y: 11, width: 3, height: 3 }], ["rect", { x: 8, y: 17, width: 3, height: 3 }], ["rect", { x: 13, y: 17, width: 3, height: 3 }]],
  // Filled pixel disc (radio / menu indicator).
  dot: [["path", { d: "M10 6h4v2h2v2h2v4h-2v2h-2v2h-4v-2H8v-2H6v-4h2V8h2V6Z" }]],
};

// name -> [pixelarticons file, hackernoon file, lucide export].
// A missing pixel icon falls back to the other pixel set, then to CUSTOM.
const MAP = {
  ArrowDown: ["arrow-down", "arrow-down", "ArrowDown"],
  ArrowLeft: ["arrow-left", "arrow-left", "ArrowLeft"],
  ArrowRight: ["arrow-right", "arrow-right", "ArrowRight"],
  Bell: ["bell", "bell", "Bell"],
  Bold: [null, "bold", "Bold"],
  Calendar: ["calendar", "calendar-alt", "Calendar"],
  Check: ["check", "check", "Check"],
  ChevronDown: ["chevron-down", "angle-down", "ChevronDown"],
  ChevronLeft: ["chevron-left", "angle-left", "ChevronLeft"],
  ChevronRight: ["chevron-right", "angle-right", "ChevronRight"],
  ChevronUp: ["chevron-up", "angle-up", "ChevronUp"],
  ChevronsUpDown: ["chevrons-vertical", "sort", "ChevronsUpDown"],
  Circle: ["custom:dot", "custom:dot", "Circle"],
  Coins: ["coins", "coins", "Coins"],
  Copy: ["copy", "copy", "Copy"],
  Crown: [null, "crown", "Crown"],
  Flame: ["fire", "fire", "Flame"],
  GripVertical: ["custom:grip", "custom:grip", "GripVertical"],
  Heart: ["heart", "heart", "Heart"],
  Italic: [null, "italics", "Italic"],
  Loader: ["loader", "spinner", "Loader2"],
  Lock: ["lock", "lock", "Lock"],
  Menu: ["menu", "bars", "Menu"],
  MessageSquare: ["message", "message-dots", "MessageSquare"],
  Minus: ["minus", "minus", "Minus"],
  Monitor: ["monitor", null, "Monitor"],
  Moon: ["moon", "moon", "Moon"],
  MoreHorizontal: ["more-horizontal", null, "MoreHorizontal"],
  Palette: ["colors-swatch", null, "Palette"],
  Paperclip: ["attachment", "paperclip", "Paperclip"],
  Play: ["play", "play", "Play"],
  Plus: ["plus", "plus", "Plus"],
  RotateCcw: ["undo", "refresh", "RotateCcw"],
  Search: ["search", "search", "Search"],
  Settings: ["settings-cog", "cog", "Settings"],
  Settings2: ["sliders-horizontal", null, "Settings2"],
  Shield: ["shield", null, "Shield"],
  Shuffle: ["shuffle", "shuffle", "Shuffle"],
  Skull: ["skull", null, "Skull"],
  Sparkles: ["sparkles", "sparkles", "Sparkles"],
  Star: ["star", "star", "Star"],
  Sun: ["sun", "sun", "Sun"],
  Sword: ["sword", null, "Sword"],
  Trophy: ["trophy", "trophy", "Trophy"],
  Tv: ["tv", null, "Tv"],
  Underline: [null, "underline", "Underline"],
  User: ["user", "user", "User"],
  Users: ["users", "users", "Users"],
  X: ["close", "times", "X"],
  Zap: ["zap", "bolt", "Zap"],
};

export const ICON_NAMES = Object.keys(MAP);

const num = (v) => (Number.isNaN(Number(v)) ? v : Number(v));

/** Shapes of an SVG file as [tag, attrs] tuples (path/polygon/rect only). */
function readShapes(file) {
  const svg = readFileSync(file, "utf8");
  const shapes = [];
  for (const m of svg.matchAll(/<(path|polygon|rect)\b([^>]*?)\/?>/g)) {
    const [, tag, rawAttrs] = m;
    const attrs = {};
    for (const a of rawAttrs.matchAll(/([a-zA-Z-]+)="([^"]*)"/g)) {
      const [, k, v] = a;
      if (["d", "points", "x", "y", "width", "height", "transform"].includes(k)) attrs[k] = num(v);
    }
    shapes.push([tag, attrs]);
  }
  if (!shapes.length) throw new Error(`No shapes in ${file}`);
  return shapes;
}

function pixelShapes(set, name) {
  const [pa, hn] = MAP[name];
  const order = set === "hackernoon" ? [["hn", hn], ["pa", pa]] : [["pa", pa], ["hn", hn]];
  for (const [kind, file] of order) {
    if (!file) continue;
    if (file.startsWith("custom:")) return CUSTOM[file.slice(7)];
    return readShapes(join(kind === "pa" ? PA_DIR : HN_DIR, `${file}.svg`));
  }
  throw new Error(`No pixel icon for ${name}`);
}

const HEADER = (set) =>
  `// GENERATED by apps/web/scripts/icons.mjs - do not edit.\n// ${
    set ? ATTRIBUTION[set] : ICON_SETS.filter((s) => s !== "lucide").map((s) => ATTRIBUTION[s]).join("\n// ")
  }\n`;

const PIXEL_RENDERER = `
type Shape = [tag: "path" | "polygon" | "rect", attrs: Record<string, string | number>];

export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string };

function PixelSvg({ shapes, size = 24, className, ...props }: IconProps & { shapes: Shape[] }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
      // Filled pixel shapes have no stroke; ignore Lucide's strokeWidth prop.
      strokeWidth={undefined}
    >
      {shapes.map(([Tag, attrs], i) => <Tag key={i} {...attrs} />)}
    </svg>
  );
}
`;

/** icons.tsx with a single, fixed set (registry variant). */
export function renderStaticModule(set) {
  if (set === "lucide") {
    const exports = ICON_NAMES.map((n) => (MAP[n][2] === n ? n : `${MAP[n][2]} as ${n}`));
    return `${HEADER(set)}export { ${exports.join(", ")} } from "lucide-react";\nexport type { LucideProps as IconProps } from "lucide-react";\n`;
  }
  const data = Object.fromEntries(ICON_NAMES.map((n) => [n, pixelShapes(set, n)]));
  return `${HEADER(set)}import * as React from "react";
${PIXEL_RENDERER}
const ICONS: Record<string, Shape[]> = ${JSON.stringify(data)};

function icon(name: string) {
  const Icon = (props: IconProps) => <PixelSvg shapes={ICONS[name]} {...props} />;
  Icon.displayName = name;
  return Icon;
}

${ICON_NAMES.map((n) => `export const ${n} = icon("${n}");`).join("\n")}
`;
}

/** The site's icons.tsx: every set, switching on <html data-icons>. */
export function renderSwitchableModule() {
  const pixel = Object.fromEntries(
    ["pixelarticons", "hackernoon"].map((set) => [set, Object.fromEntries(ICON_NAMES.map((n) => [n, pixelShapes(set, n)]))])
  );
  const lucideImports = [...new Set(ICON_NAMES.map((n) => MAP[n][2]))].map((l) => `${l} as Lucide${l}`);
  return `${HEADER()}// ${ATTRIBUTION.lucide}
"use client";

import * as React from "react";
import { ${lucideImports.join(", ")} } from "lucide-react";
import { DEFAULT_APPEARANCE, ICON_SET_IDS, type IconSet } from "@/lib/tokens";
${PIXEL_RENDERER}
const DEFAULT_ICON_SET = DEFAULT_APPEARANCE.icons;

const PIXEL: Record<"pixelarticons" | "hackernoon", Record<string, Shape[]>> = ${JSON.stringify(pixel)};

const LUCIDE: Record<string, React.ComponentType<IconProps>> = {
${ICON_NAMES.map((n) => `  ${n}: Lucide${MAP[n][2]},`).join("\n")}
};

// The active set lives on <html data-icons> (set by the Display menu, /create
// and the pre-paint script), so every icon follows it without a context.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-icons"] });
  return () => observer.disconnect();
}
function getSet(): IconSet {
  const value = document.documentElement.dataset.icons as IconSet | undefined;
  return value && ICON_SET_IDS.includes(value) ? value : DEFAULT_ICON_SET;
}
export function useIconSet(): IconSet {
  return React.useSyncExternalStore(subscribe, getSet, () => DEFAULT_ICON_SET);
}

function icon(name: string) {
  const Icon = (props: IconProps) => {
    const set = useIconSet();
    if (set === "lucide") {
      const Lucide = LUCIDE[name];
      return <Lucide {...props} />;
    }
    return <PixelSvg shapes={PIXEL[set][name]} {...props} />;
  };
  Icon.displayName = name;
  return Icon;
}

${ICON_NAMES.map((n) => `export const ${n} = icon("${n}");`).join("\n")}
`;
}
