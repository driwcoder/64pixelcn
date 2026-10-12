import { expect, test } from "@playwright/test";
import { MODE_IDS, PRESET_IDS, paletteTokens } from "../src/lib/tokens";
import { CONTRAST_PAIRS, contrastRatio } from "../src/lib/contrast";

// WCAG AA for every preset in both modes: 4.5:1 for text on its surface,
// 3:1 for focus rings, primary fills and input borders against the page.
// Pure computation from lib/tokens.ts, no browser needed.
for (const preset of PRESET_IDS) {
  for (const mode of MODE_IDS) {
    test(`contrast ${preset} ${mode}`, () => {
      const palette = paletteTokens(preset, mode);
      const failures = CONTRAST_PAIRS.flatMap(([text, surface, min]) => {
        const ratio = contrastRatio(palette[text], palette[surface]);
        return ratio < min ? [`${text} on ${surface}: ${ratio.toFixed(2)} < ${min}`] : [];
      });
      expect(failures).toEqual([]);
    });
  }
}
