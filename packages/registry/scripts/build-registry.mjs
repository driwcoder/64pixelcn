#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_DIR = join(__dirname, "..");
const SRC_DIR = join(REGISTRY_DIR, "src");
const PUBLIC_DIR = join(REGISTRY_DIR, "public", "r");

function readFile(filePath) {
  try { return readFileSync(filePath, "utf-8"); } catch { return null; }
}

function getComponentFiles(name) {
  const componentPath = join(SRC_DIR, "components", "ui", `${name}.tsx`);
  const content = readFile(componentPath);
  if (content) return [{ path: `components/ui/${name}.tsx`, content, type: "registry:ui" }];
  return [];
}

function buildMainRegistry(components) {
  const items = components.map((c) => ({
    name: c.name, type: c.type || "registry:ui", title: c.title, description: c.description,
    dependencies: c.dependencies || [], registryDependencies: c.registryDependencies || [],
    files: getComponentFiles(c.name),
  }));
  return { $schema: "https://ui.shadcn.com/schema/registry.json", name: "pixelcn", homepage: "https://pixelcn.vercel.app", items };
}

const components = [
  // Batch 1 - Core
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
  // Batch 2 - Extended
  { name: "accordion", title: "Accordion", description: "Pixel art accordion", dependencies: ["@radix-ui/react-accordion"], registryDependencies: ["utils"] },
  { name: "avatar", title: "Avatar", description: "Pixel art avatar", dependencies: ["@radix-ui/react-avatar"], registryDependencies: ["utils"] },
  { name: "breadcrumb", title: "Breadcrumb", description: "Pixel art breadcrumb", dependencies: ["@radix-ui/react-breadcrumb"], registryDependencies: ["utils"] },
  { name: "carousel", title: "Carousel", description: "Pixel art carousel", dependencies: ["embla-carousel-react"], registryDependencies: ["utils", "button"] },
  { name: "collapsible", title: "Collapsible", description: "Pixel art collapsible", dependencies: ["@radix-ui/react-collapsible"], registryDependencies: ["utils"] },
  { name: "combobox", title: "Combobox", description: "Pixel art combobox", dependencies: ["@radix-ui/react-popover", "cmdk"], registryDependencies: ["utils", "input"] },
  { name: "context-menu", title: "Context Menu", description: "Pixel art context menu", dependencies: ["@radix-ui/react-context-menu"], registryDependencies: ["utils"] },
  { name: "dropdown-menu", title: "Dropdown Menu", description: "Pixel art dropdown menu", dependencies: ["@radix-ui/react-dropdown-menu"], registryDependencies: ["utils"] },
  { name: "hover-card", title: "Hover Card", description: "Pixel art hover card", dependencies: ["@radix-ui/react-hover-card"], registryDependencies: ["utils"] },
  { name: "label", title: "Label", description: "Pixel art label", dependencies: ["@radix-ui/react-label"], registryDependencies: ["utils"] },
  { name: "menubar", title: "Menubar", description: "Pixel art menubar", dependencies: ["@radix-ui/react-menubar"], registryDependencies: ["utils"] },
  { name: "navigation-menu", title: "Navigation Menu", description: "Pixel art navigation menu", dependencies: ["@radix-ui/react-navigation-menu"], registryDependencies: ["utils"] },
  { name: "popover", title: "Popover", description: "Pixel art popover", dependencies: ["@radix-ui/react-popover"], registryDependencies: ["utils"] },
  { name: "radio-group", title: "Radio Group", description: "Pixel art radio group", dependencies: ["@radix-ui/react-radio-group"], registryDependencies: ["utils"] },
  { name: "scroll-area", title: "Scroll Area", description: "Pixel art scroll area", dependencies: ["@radix-ui/react-scroll-area"], registryDependencies: ["utils"] },
  { name: "select", title: "Select", description: "Pixel art select", dependencies: ["@radix-ui/react-select"], registryDependencies: ["utils"] },
  { name: "separator", title: "Separator", description: "Pixel art separator", dependencies: ["@radix-ui/react-separator"], registryDependencies: ["utils"] },
  { name: "sheet", title: "Sheet", description: "Pixel art sheet", dependencies: ["@radix-ui/react-dialog"], registryDependencies: ["utils"] },
  { name: "skeleton", title: "Skeleton", description: "Pixel art skeleton", registryDependencies: ["utils"] },
  { name: "slider", title: "Slider", description: "Pixel art slider", dependencies: ["@radix-ui/react-slider"], registryDependencies: ["utils"] },
  { name: "textarea", title: "Textarea", description: "Pixel art textarea", registryDependencies: ["utils"] },
  { name: "toast", title: "Toast", description: "Pixel art toast", dependencies: ["@radix-ui/react-toast"], registryDependencies: ["utils"] },
  { name: "toggle", title: "Toggle", description: "Pixel art toggle", dependencies: ["@radix-ui/react-toggle"], registryDependencies: ["utils"] },
  { name: "toggle-group", title: "Toggle Group", description: "Pixel art toggle group", dependencies: ["@radix-ui/react-toggle-group"], registryDependencies: ["utils"] },
  { name: "tooltip", title: "Tooltip", description: "Pixel art tooltip", dependencies: ["@radix-ui/react-tooltip"], registryDependencies: ["utils"] },
  { name: "button-group", title: "Button Group", description: "Pixel art button group", dependencies: ["class-variance-authority"], registryDependencies: ["utils", "button"] },
  { name: "input-group", title: "Input Group", description: "Pixel art input group", dependencies: ["class-variance-authority"], registryDependencies: ["utils", "input"] },
  { name: "input-otp", title: "Input OTP", description: "Pixel art input OTP", dependencies: ["input-otp"], registryDependencies: ["utils", "input"] },
  { name: "kbd", title: "Kbd", description: "Pixel art keyboard key", dependencies: ["class-variance-authority"], registryDependencies: ["utils"] },
  { name: "empty", title: "Empty", description: "Pixel art empty state", registryDependencies: ["utils"] },
  { name: "item", title: "Item", description: "Pixel art item", registryDependencies: ["utils"] },
  { name: "spinner", title: "Spinner", description: "Pixel art spinner", registryDependencies: ["utils"] },
  { name: "aspect-ratio", title: "Aspect Ratio", description: "Pixel art aspect ratio", dependencies: ["@radix-ui/react-aspect-ratio"], registryDependencies: ["utils"] },
  { name: "table", title: "Table", description: "Pixel art table", registryDependencies: ["utils"] },
  { name: "typography", title: "Typography", description: "Pixel art typography", registryDependencies: ["utils"] },
  { name: "sidebar", title: "Sidebar", description: "Pixel art sidebar", dependencies: ["@radix-ui/react-slot"], registryDependencies: ["utils", "button", "input", "separator", "sheet", "skeleton", "tooltip"] },
  { name: "calendar", title: "Calendar", description: "Pixel art calendar", dependencies: ["react-day-picker"], registryDependencies: ["utils", "button"] },
  { name: "date-picker", title: "Date Picker", description: "Pixel art date picker", dependencies: ["react-day-picker", "@radix-ui/react-popover"], registryDependencies: ["utils", "button", "calendar", "popover"] },
  { name: "chart", title: "Chart", description: "Pixel art chart", dependencies: ["recharts"], registryDependencies: ["utils"] },
  { name: "data-table", title: "Data Table", description: "Pixel art data table", dependencies: ["@tanstack/react-table"], registryDependencies: ["utils", "table"] },
  { name: "drawer", title: "Drawer", description: "Pixel art drawer", dependencies: ["vaul"], registryDependencies: ["utils"] },
  { name: "field", title: "Field", description: "Pixel art field", dependencies: ["class-variance-authority"], registryDependencies: ["utils", "label"] },
  { name: "native-select", title: "Native Select", description: "Pixel art native select", registryDependencies: ["utils"] },
  { name: "message", title: "Message", description: "Pixel art message", registryDependencies: ["utils"] },
  { name: "message-scroller", title: "Message Scroller", description: "Pixel art message scroller", registryDependencies: ["utils"] },
  { name: "bubble", title: "Bubble", description: "Pixel art bubble", registryDependencies: ["utils"] },
  { name: "attachment", title: "Attachment", description: "Pixel art attachment", registryDependencies: ["utils"] },
  { name: "marker", title: "Marker", description: "Pixel art marker", registryDependencies: ["utils"] },
  { name: "questionnaire", title: "Questionnaire", description: "Pixel art questionnaire", registryDependencies: ["utils"] },
  { name: "resizable", title: "Resizable", description: "Pixel art resizable panels", dependencies: ["react-resizable-panels"], registryDependencies: ["utils"] },
  { name: "command", title: "Command", description: "Pixel art command palette", dependencies: ["cmdk"], registryDependencies: ["utils", "dialog"] },
  { name: "direction", title: "Direction", description: "Pixel art direction provider", dependencies: ["@radix-ui/react-direction"], registryDependencies: ["utils"] },
  { name: "alert-dialog", title: "Alert Dialog", description: "Pixel art alert dialog", dependencies: ["@radix-ui/react-alert-dialog"], registryDependencies: ["utils", "button"] },
  { name: "pagination", title: "Pagination", description: "Pixel art pagination", dependencies: ["lucide-react"], registryDependencies: ["utils", "button"] },
  { name: "health-bar", title: "Health Bar", description: "Player health indicator bar", dependencies: ["class-variance-authority", "lucide-react"], registryDependencies: ["utils"] },
  { name: "mana-bar", title: "Mana Bar", description: "Magic/resource bar", dependencies: ["class-variance-authority", "lucide-react"], registryDependencies: ["utils"] },
  { name: "xp-bar", title: "XP Bar", description: "Experience progression bar", dependencies: ["class-variance-authority", "lucide-react"], registryDependencies: ["utils"] },
  { name: "enemy-health-display", title: "Enemy Health Display", description: "Boss and enemy health UI", dependencies: ["lucide-react"], registryDependencies: ["utils"] },
  { name: "retro-mode-switcher", title: "Retro Mode Switcher", description: "Toggle retro visual effects", dependencies: ["class-variance-authority", "lucide-react"], registryDependencies: ["utils"] },
  { name: "theme-selector", title: "Theme Selector", description: "Switch between retro themes", dependencies: ["lucide-react"], registryDependencies: ["utils"] },
];

if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

let built = 0, skipped = 0;
for (const comp of components) {
  const files = getComponentFiles(comp.name);
  if (files.length === 0) { skipped++; continue; }
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: comp.name, type: comp.type || "registry:ui", title: comp.title, description: comp.description,
    dependencies: comp.dependencies || [], registryDependencies: comp.registryDependencies || [], files,
  };
  writeFileSync(join(PUBLIC_DIR, `${comp.name}.json`), JSON.stringify(item, null, 2));
  built++;
}

const registry = buildMainRegistry(components);
writeFileSync(join(PUBLIC_DIR, "registry.json"), JSON.stringify(registry, null, 2));

const baseItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "pixelcn", type: "registry:base", title: "pixelcn base",
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

console.log(`Registry build complete! Built: ${built}, Skipped (no source file): ${skipped}`);
