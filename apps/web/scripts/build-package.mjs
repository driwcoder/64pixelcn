#!/usr/bin/env node
// Builds the npm package in packages/kit/dist from the kit:
//   pixelcn.js, pixelcn.min.js, pixelcn.css, fonts/  (scripts/build-kit.mjs)
//   types/                                            (.d.ts from src/kit + src/lib)
// Run by `npm run build` / `prepublishOnly` in packages/kit.
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG = join(APP, "..", "..", "packages", "kit");
const DIST = join(PKG, "dist");

execFileSync(process.execPath, [join(APP, "scripts", "build-kit.mjs")], { stdio: "inherit" });

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
for (const f of ["pixelcn.js", "pixelcn.min.js", "pixelcn.css"]) cpSync(join(APP, "public", "kit", f), join(DIST, f));
cpSync(join(APP, "public", "kit", "fonts"), join(DIST, "fonts"), { recursive: true });

// Declarations: emit from a throwaway tsconfig that extends the app's.
const TYPES = join(DIST, "types");
const tsconfig = join(APP, `tsconfig.kit-types.${process.pid}.json`);
writeFileSync(
  tsconfig,
  JSON.stringify({
    extends: "./tsconfig.json",
    compilerOptions: { noEmit: false, declaration: true, emitDeclarationOnly: true, outDir: TYPES, rootDir: "./src", incremental: false, plugins: [] },
    include: ["src/kit/index.ts"],
  })
);
try {
  execFileSync(process.execPath, [join(APP, "node_modules", "typescript", "bin", "tsc"), "-p", tsconfig], { stdio: "inherit", cwd: APP });
} finally {
  rmSync(tsconfig, { force: true });
}
// The app's "@/lib/x" alias and ".ts" import extensions mean nothing to a
// consumer: point them at the emitted .js-named declarations instead.
const walk = (dir) => readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));
for (const file of walk(TYPES).filter((f) => f.endsWith(".d.ts"))) {
  const src = readFileSync(file, "utf8")
    .replace(/(from\s+|import\()"@\/([^"]+)"/g, (_, kw, p) => {
      let rel = relative(dirname(file), join(TYPES, p)).replace(/\\/g, "/");
      if (!rel.startsWith(".")) rel = `./${rel}`;
      return `${kw}"${rel}.js"`;
    })
    .replace(/(from\s+|import\()"(\.{1,2}\/[^"]+)\.ts"/g, '$1"$2.js"');
  writeFileSync(file, src);
}

console.log(`Package built: ${relative(process.cwd(), DIST) || DIST}`);
