#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_DIR = join(__dirname, "..");
const SRC_DIR = join(REGISTRY_DIR, "src");
const PUBLIC_DIR = join(REGISTRY_DIR, "public", "r");

function readFile(filePath) {
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function getComponentFiles(name) {
  const uiDir = join(SRC_DIR, "components", "ui");
  const componentPath = join(uiDir, `${name}.tsx`);
  const content = readFile(componentPath);
  if (content) {
    return [{ path: `components/ui/${name}.tsx`, content, type: "registry:ui" }];
  }
  return [];
}

function buildMainRegistry(components) {
  const items = components.map((c) => ({
    name: c.name,
    type: c.type || "registry:ui",
    title: c.title || c.name,
    description: c.description || "",
    dependencies: c.dependencies || [],
    registryDependencies: c.registryDependencies || [],
    files: getComponentFiles(c.name),
  }));
  return { $schema: "https://ui.shadcn.com/schema/registry.json", name: "pixelcn", homepage: "https://pixelcn.vercel.app", items };
}

const components = [
  { name: "button", title: "Button", description: "Pixel art button with retro gaming aesthetics", dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"], registryDependencies: ["utils"] },
  { name: "card", title: "Card", description: "Pixel art card with stepped borders and shadows", registryDependencies: ["utils"] },
  { name: "input", title: "Input", description: "Pixel art input with retro styling", registryDependencies: ["utils"] },
  { name: "badge", title: "Badge", description: "Pixel art badge for status and labels", dependencies: ["class-variance-authority"], registryDependencies: ["utils"] },
  { name: "checkbox", title: "Checkbox", description: "Pixel art checkbox with stepped check mark", dependencies: ["@radix-ui/react-checkbox"], registryDependencies: ["utils"] },
  { name: "switch", title: "Switch", description: "Pixel art switch toggle", dependencies: ["@radix-ui/react-switch"], registryDependencies: ["utils"] },
  { name: "dialog", title: "Dialog", description: "Pixel art modal dialog", dependencies: ["@radix-ui/react-dialog"], registryDependencies: ["utils", "button"] },
  { name: "alert", title: "Alert", description: "Pixel art alert component", dependencies: ["class-variance-authority"], registryDependencies: ["utils"] },
  { name: "tabs", title: "Tabs", description: "Pixel art tabs with stepped indicators", dependencies: ["@radix-ui/react-tabs"], registryDependencies: ["utils"] },
  { name: "progress", title: "Progress", description: "Pixel art progress bar with block segments", dependencies: ["@radix-ui/react-progress"], registryDependencies: ["utils"] },
];

if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

for (const comp of components) {
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: comp.name,
    type: comp.type || "registry:ui",
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies || [],
    registryDependencies: comp.registryDependencies || [],
    files: getComponentFiles(comp.name),
  };
  writeFileSync(join(PUBLIC_DIR, `${comp.name}.json`), JSON.stringify(item, null, 2));
  console.log(`Built: ${comp.name}.json`);
}

const registry = buildMainRegistry(components);
writeFileSync(join(PUBLIC_DIR, "registry.json"), JSON.stringify(registry, null, 2));
console.log("Built: registry.json");

const baseItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "pixelcn",
  type: "registry:base",
  title: "pixelcn base",
  description: "Base configuration for pixelcn pixel art components",
  dependencies: ["tailwindcss", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
  registryDependencies: ["utils"],
  cssVars: {
    theme: {
      "--radius": "0px",
      "--background": "oklch(0.09 0.014 285)",
      "--foreground": "oklch(0.95 0.02 100)",
      "--card": "oklch(0.13 0.02 285)",
      "--card-foreground": "oklch(0.95 0.02 100)",
      "--popover": "oklch(0.11 0.02 285)",
      "--popover-foreground": "oklch(0.95 0.02 100)",
      "--primary": "oklch(0.75 0.18 35)",
      "--primary-foreground": "oklch(0.15 0.02 35)",
      "--secondary": "oklch(0.25 0.03 285)",
      "--secondary-foreground": "oklch(0.95 0.02 100)",
      "--muted": "oklch(0.2 0.02 285)",
      "--muted-foreground": "oklch(0.65 0.02 285)",
      "--accent": "oklch(0.8 0.15 200)",
      "--accent-foreground": "oklch(0.15 0.02 285)",
      "--destructive": "oklch(0.6 0.22 25)",
      "--destructive-foreground": "oklch(0.95 0.02 25)",
      "--border": "oklch(0.3 0.03 285)",
      "--input": "oklch(0.3 0.03 285)",
      "--ring": "oklch(0.75 0.18 35)",
      "--pixel-size": "2px",
      "--pixel-border": "2px",
      "--pixel-shadow": "2px 2px 0px var(--foreground)",
      "--pixel-font": "Press Start 2P, monospace",
    },
  },
  files: [{ path: "lib/utils.ts", type: "registry:lib", content: readFile(join(SRC_DIR, "lib", "utils.ts")) }],
};

writeFileSync(join(PUBLIC_DIR, "pixelcn.json"), JSON.stringify(baseItem, null, 2));
console.log("Built: pixelcn.json (base item)");
console.log("\nRegistry build complete!");
