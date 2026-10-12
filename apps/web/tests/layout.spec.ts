import { expect, test, type Page } from "@playwright/test";
import { componentsMeta } from "../src/lib/components";
import { FONT_IDS, RADII, RADIUS_IDS } from "../src/lib/tokens";

const CORNER_STEPS = Object.fromEntries(RADIUS_IDS.map((r) => [r, RADII[r].steps]));

// Guards against the bug class this library is most prone to: pixel fonts
// differ wildly in size (Press Start 2P is ~70% wider than the others), so
// text can touch or cross borders, or push the page into horizontal scroll.
// Every page is checked with every font, at phone and desktop widths, with the
// largest text scale. Corners are set to the roundest stepped corners at the
// largest pixel size, so text clipped by a corner is caught too (layout itself
// doesn't depend on corners or shading).

const PAGES = ["/", "/docs", "/docs/components", "/docs/blocks", "/docs/changelog", "/docs/kit", "/create"];
const WIDTHS = [375, 1280];

interface Issue {
  kind: string;
  detail: string;
}

/** Runs in the browser. Returns layout problems inside `rootSelector`. */
function audit({ rootSelector, CORNER_STEPS }: { rootSelector: string; CORNER_STEPS: Record<string, number> }): { issues: Issue[]; roots: number; textNodes: number } {
  const issues: Issue[] = [];
  let textNodes = 0;
  const doc = document;
  const win = window;
  const isBox = (el: Element) => {
    const s = win.getComputedStyle(el);
    const border = (["Left", "Right", "Top", "Bottom"] as const).some(
      (k) =>
        parseFloat(s.getPropertyValue(`border-${k.toLowerCase()}-width`)) > 0 &&
        s.getPropertyValue(`border-${k.toLowerCase()}-style`) !== "none" &&
        s.getPropertyValue(`border-${k.toLowerCase()}-color`) !== "rgba(0, 0, 0, 0)"
    );
    const bg = s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent";
    return border || bg;
  };
  const scrolls = (el: Element) => /(auto|scroll)/.test(win.getComputedStyle(el).overflowX + win.getComputedStyle(el).overflowY);
  // Nearest bordered/filled ancestor, unless a scroll container sits in between
  // (content may legitimately extend past a scroller's box).
  const boxAncestor = (el: Element, root: Element) => {
    let a = el.parentElement;
    while (a && a !== root && a !== doc.body) {
      if (scrolls(a)) return null;
      if (isBox(a)) return a;
      a = a.parentElement;
    }
    return null;
  };
  const describe = (el: Element) => `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").slice(0, 60)}`;
  const ignored = (el: Element) =>
    !!el.closest("svg,pre,[aria-hidden=true],.sr-only,.truncate,[data-radix-scroll-area-viewport],[data-slot=resizable-handle]");

  if (doc.documentElement.scrollWidth > win.innerWidth + 1) {
    issues.push({ kind: "page-hscroll", detail: `${doc.documentElement.scrollWidth}px > ${win.innerWidth}px` });
  }

  for (const root of doc.querySelectorAll(rootSelector)) {
    // Boxes escaping their bordered container.
    for (const el of root.querySelectorAll("*")) {
      if (!isBox(el) || ignored(el)) continue;
      const s = win.getComputedStyle(el);
      if (s.position === "absolute" || s.position === "fixed" || s.display === "none") continue;
      const a = boxAncestor(el, root);
      if (!a) continue;
      const er = el.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      if (er.width === 0) continue;
      if (er.left < ar.left - 1 || er.right > ar.right + 1) {
        issues.push({ kind: "box-overflow", detail: `${describe(el)} escapes ${describe(a)}` });
      }
    }
    // Text crossing the inner edge of its container.
    const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent?.trim();
      const el = node.parentElement;
      if (!text || !el || ignored(el)) continue;
      const cs = win.getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const range = doc.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
      if (!rects.length) continue;
      textNodes++;
      const left = Math.min(...rects.map((r) => r.left));
      const right = Math.max(...rects.map((r) => r.right));
      const a = isBox(el) ? el : boxAncestor(el, root);
      if (!a || scrolls(a)) continue;
      const s = win.getComputedStyle(a);
      const ar = a.getBoundingClientRect();
      const innerLeft = ar.left + parseFloat(s.borderLeftWidth);
      const innerRight = ar.right - parseFloat(s.borderRightWidth);
      if (left < innerLeft - 0.5 || right > innerRight + 0.5) {
        issues.push({ kind: "text-overflow", detail: `"${text.slice(0, 30)}" in ${describe(a)}` });
      }
      // Text inside the staircase a stepped corner cuts away. Line boxes are
      // taller than the glyphs, so their top/bottom fifth is ignored.
      const clipped = el.closest(".pixel-rounded");
      if (clipped && root.contains(clipped) && win.getComputedStyle(clipped).clipPath !== "none") {
        const step = parseFloat(win.getComputedStyle(clipped).getPropertyValue("--pixel-corner"));
        const steps = CORNER_STEPS[doc.documentElement.dataset.radius ?? ""] ?? 0;
        const cr = clipped.getBoundingClientRect();
        const cut = (dx: number, dy: number) => dx >= 0 && dy >= 0 && Math.floor(dx / step) + Math.floor(dy / step) < steps;
        for (const r of rects) {
          const pad = r.height / 5;
          const [t, b] = [r.top + pad, r.bottom - pad];
          if (
            cut(r.left - cr.left, t - cr.top) ||
            cut(cr.right - r.right, t - cr.top) ||
            cut(r.left - cr.left, cr.bottom - b) ||
            cut(cr.right - r.right, cr.bottom - b)
          ) {
            issues.push({ kind: "corner-clip", detail: `"${text.slice(0, 30)}" in ${describe(clipped)}` });
            break;
          }
        }
      }
    }
  }
  return { issues, roots: doc.querySelectorAll(rootSelector).length, textNodes };
}

async function auditAllFonts(page: Page, rootSelector: string, requireText = true) {
  const found: string[] = [];
  for (const font of FONT_IDS) {
    await page.evaluate(
      async ({ font }) => {
        const html = document.documentElement;
        html.dataset.font = font;
        html.dataset.textScale = "xl";
        html.dataset.radius = "lg";
        html.dataset.size = "128";
        html.dataset.shading = "deep";
        html.dataset.border = "frame";
        await document.fonts.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      },
      { font }
    );
    const { issues, roots, textNodes } = await page.evaluate(audit, { rootSelector, CORNER_STEPS });
    // A missing root or no text means we're not auditing the real page
    // (wrong server, error page...), which must fail rather than pass empty.
    expect(roots, `${rootSelector} present`).toBeGreaterThan(0);
    if (requireText) expect(textNodes, "text was audited").toBeGreaterThan(0);
    for (const i of issues) found.push(`[${font}] ${i.kind}: ${i.detail}`);
  }
  return [...new Set(found)];
}

for (const width of WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const path of PAGES) {
      test(`page ${path}`, async ({ page }) => {
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        await page.waitForLoadState("networkidle");
        expect(await auditAllFonts(page, "body")).toEqual([]);
      });
    }

    for (const { name } of componentsMeta) {
      test(`component ${name}`, async ({ page }) => {
        const res = await page.goto(`/docs/components/${name}`);
        expect(res?.status()).toBe(200);
        await page.waitForLoadState("networkidle");
        // The demo and the generated API docs (the rest of the page is shared
        // and covered by the page tests). Some demos have no text at all.
        expect(await auditAllFonts(page, ".pixel-demo, [data-api-docs]", false)).toEqual([]);
      });
    }
  });
}
