#!/usr/bin/env node
// Writes the site's switchable icon module from the icon sets (see icons.mjs).
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderSwitchableModule, ICON_NAMES } from "./icons.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "components", "ui", "icons.tsx");
writeFileSync(out, renderSwitchableModule());
console.log(`Icons written: ${ICON_NAMES.length} icons -> src/components/ui/icons.tsx`);
