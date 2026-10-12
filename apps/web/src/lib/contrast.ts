// WCAG 2.x contrast for the oklch() colors in lib/tokens.ts (used by
// tests/contrast.spec.ts to audit every preset in both modes).

/** oklch(L C H [/ A]) -> linear sRGB, or null for anything else. */
function oklchToLinearRgb(css: string): [number, number, number] | null {
  const m = css.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*[\d.]+\s*)?\)$/);
  if (!m) return null;
  const [l, c, h] = [Number(m[1]), Number(m[2]), (Number(m[3]) * Math.PI) / 180];
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return [
    clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

export function relativeLuminance(css: string): number {
  const rgb = oklchToLinearRgb(css);
  if (!rgb) throw new Error(`Not an oklch() color: ${css}`);
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** [text, surface, minimum ratio]: AA is 4.5 for text, 3 for UI boundaries. */
export const CONTRAST_PAIRS: [string, string, number][] = [
  ["foreground", "background", 4.5],
  ["muted-foreground", "background", 4.5],
  ["card-foreground", "card", 4.5],
  ["muted-foreground", "card", 4.5],
  ["popover-foreground", "popover", 4.5],
  ["primary-foreground", "primary", 4.5],
  ["secondary-foreground", "secondary", 4.5],
  ["muted-foreground", "muted", 4.5],
  ["accent-foreground", "accent", 4.5],
  ["destructive-foreground", "destructive", 4.5],
  ["primary", "background", 3],
  ["ring", "background", 3],
  ["input", "background", 3],
];
