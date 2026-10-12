#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Components live only in apps/web/src/components/ui (the docs site renders
// them directly); this writes the shadcn registry JSON that the same app serves.
const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = join(__dirname, "..");
const SRC_DIR = join(APP_DIR, "src");
const PUBLIC_DIR = join(APP_DIR, "public", "r");

// LF only, so the generated JSON is identical on Windows (CRLF checkouts) and in CI.
function readFile(filePath) {
  try { return readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n"); } catch { return null; }
}

function getComponentFiles(name) {
  const componentPath = join(SRC_DIR, "components", "ui", `${name}.tsx`);
  const content = readFile(componentPath);
  if (content) return [{ path: `components/ui/${name}.tsx`, content, type: "registry:ui" }];
  return [];
}

// Where this registry is served. Sibling components are referenced by full
// URL so the shadcn CLI installs the pixelcn version, not shadcn's own
// component of the same name (e.g. "button").
const REGISTRY_URL = (process.env.PIXELCN_REGISTRY_URL || "https://pixelcn.vercel.app").replace(/\/$/, "");

// Dependencies are derived from the component's actual imports so they can't
// drift from the code (hand-written lists had missing and non-existent packages).
function getComponentDeps(name) {
  const content = readFile(join(SRC_DIR, "components", "ui", `${name}.tsx`)) || "";
  const specifiers = [...content.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
  const npm = new Set();
  const local = new Set();
  for (const spec of specifiers) {
    if (spec === "react" || spec.startsWith("@/")) continue;
    // ./icons comes from the preset (icons-<set>.json), not a fixed item.
    if (spec === "./icons") continue;
    if (spec.startsWith("./")) { local.add(spec.slice(2)); continue; }
    npm.add(spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
  }
  return {
    dependencies: [...npm].sort(),
    // Every component styles itself through the role classes (pixel-raised...).
    registryDependencies: ["utils", `${REGISTRY_URL}/r/roles.json`, ...[...local].sort().map((n) => `${REGISTRY_URL}/r/${n}.json`)],
  };
}

function buildMainRegistry(components) {
  const items = components.map((c) => ({
    name: c.name, type: c.type || "registry:ui", title: c.title, description: c.description,
    ...getComponentDeps(c.name),
    files: getComponentFiles(c.name),
  }));
  return { $schema: "https://ui.shadcn.com/schema/registry.json", name: "pixelcn", homepage: REGISTRY_URL, items };
}

// The component list is the docs' metadata (src/lib/components.ts), so the
// site and the registry can't disagree about what exists. Node >= 22.18
// strips the TypeScript types natively.
const { componentsMeta: components } = await import("../src/lib/components.ts");

if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

let built = 0, skipped = 0;
for (const comp of components) {
  const files = getComponentFiles(comp.name);
  if (files.length === 0) { skipped++; continue; }
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: comp.name, type: comp.type || "registry:ui", title: comp.title, description: comp.description,
    ...getComponentDeps(comp.name), files,
  };
  writeFileSync(join(PUBLIC_DIR, `${comp.name}.json`), JSON.stringify(item, null, 2));
  built++;
}

// One static icons.tsx per icon set; the preset installs the chosen one.
const { ICON_SETS, renderStaticModule } = await import("./icons.mjs");
for (const set of ICON_SETS) {
  writeFileSync(join(PUBLIC_DIR, `icons-${set}.json`), JSON.stringify({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `icons-${set}`, type: "registry:ui", title: `Icons (${set})`,
    description: `pixelcn icon set: ${set}`,
    dependencies: set === "lucide" ? ["lucide-react"] : [],
    files: [{ path: "components/ui/icons.tsx", content: renderStaticModule(set), type: "registry:ui" }],
  }, null, 2));
}

// API + accessibility docs for each component page.
const { buildComponentApi } = await import("./component-api.mjs");
const api = buildComponentApi(join(SRC_DIR, "components", "ui"), components.map((c) => c.name));
writeFileSync(join(SRC_DIR, "lib", "component-api.json"), JSON.stringify(api, null, 2) + "\n");

const registry = buildMainRegistry(components);
writeFileSync(join(PUBLIC_DIR, "registry.json"), JSON.stringify(registry, null, 2));

// pixelcn.json (the base install item) is served by apps/web/app/r/pixelcn.json
// from the same token source as /create presets, so it is not written here.

console.log(`Registry build complete! Built: ${built}, Skipped (no source file): ${skipped}`);
