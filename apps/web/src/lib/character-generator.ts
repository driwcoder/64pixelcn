// Rule-based pixel art characters on a 24x24 grid, front view, chibi style.
// The body is painted on the left half and mirrored; class gear (helmet, hat,
// hood, weapons) is added after. The seed varies hair, beard, cape and the
// secondary colors; outfit tone and skin come from the options.

import { SKINS, SPRITE_TONES, painter, pick, rng, shadeSprite, type SpritePixel, type SpriteTone } from "@/lib/sprite-core";

export const CHARACTER_SIZE = 24;

export const CHARACTER_CLASSES = ["knight", "mage", "rogue", "archer", "villager"] as const;
export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export const CHARACTER_LABELS: Record<CharacterClass, string> = {
  knight: "Knight",
  mage: "Mage",
  rogue: "Rogue",
  archer: "Archer",
  villager: "Villager",
};

export const SKIN_OPTIONS = SKINS.map((s, i) => ({ id: i, label: s.label, swatch: s.ramp[3] }));

type Paint = ReturnType<typeof painter>;
type HairStyle = "short" | "long" | "spiky" | "bun" | "bald";

/** Head, eyes, neck, torso, arms, hands, belt and legs (left half, mirrored). */
function body(c: Paint, opts: { robe?: boolean; armor?: boolean }) {
  // Head: 8px wide, rows 4-11, rounded corners.
  for (let y = 4; y <= 11; y++) c.rect(8, y, y === 4 || y === 11 ? 3 : 4, 1, "skin");
  c.put(8, 4, null);
  c.put(8, 11, null);
  c.put(9, 8, "eye"); // eyes (mirrored to x 14)
  c.rect(11, 12, 1, 1, "skin"); // neck
  const torso = opts.armor ? "metal" : "main";
  // Torso rows 13-17, shoulders wider.
  c.rect(8, 13, 4, 5, torso);
  // Arms (sleeves) and hands.
  c.rect(6, 13, 2, 4, torso);
  c.rect(6, 17, 2, 1, "skin");
  if (opts.robe) {
    // Robe flares to the feet, hiding the legs.
    for (let y = 18; y <= 21; y++) c.rect(12 - 4 - (y > 19 ? 1 : 0), y, 4 + (y > 19 ? 1 : 0), 1, "main");
    c.rect(9, 22, 2, 1, "wood");
  } else {
    c.rect(8, 17, 4, 1, "wood"); // belt
    c.rect(9, 18, 2, 3, "cloth"); // legs
    c.rect(8, 21, 3, 1, "wood"); // boots
  }
  c.mirror();
}

function hair(c: Paint, style: HairStyle) {
  if (style === "bald") return;
  c.rect(9, 3, 6, 1, "hair");
  c.rect(8, 4, 8, 1, "hair");
  c.rect(8, 5, 1, 2, "hair");
  c.rect(15, 5, 1, 2, "hair");
  c.rect(10, 5, 3, 1, "hair"); // fringe
  if (style === "long") {
    c.rect(7, 5, 1, 8, "hair");
    c.rect(16, 5, 1, 8, "hair");
  }
  if (style === "spiky") {
    for (const x of [9, 11, 13]) c.put(x, 2, "hair");
    c.put(10, 1, "hair");
    c.put(14, 1, "hair");
    c.rect(7, 4, 1, 2, "hair");
    c.rect(16, 4, 1, 2, "hair");
  }
  if (style === "bun") c.disc(12, 2, 1.8, "hair");
}

function beard(c: Paint) {
  c.rect(9, 10, 6, 1, "hair");
  c.rect(10, 11, 4, 1, "hair");
}

function cape(c: Paint) {
  // Peeks out behind the arms and below the torso.
  c.rect(5, 13, 1, 7, "cape");
  c.rect(18, 13, 1, 7, "cape");
}

const GEAR: Record<CharacterClass, (c: Paint, r: () => number) => void> = {
  knight(c, r) {
    // Helmet with cheek guards and an optional plume.
    c.rect(9, 3, 6, 1, "metal");
    c.rect(8, 4, 8, 3, "metal");
    c.rect(8, 7, 1, 3, "metal");
    c.rect(15, 7, 1, 3, "metal");
    if (r() > 0.4) c.rect(11, 1, 2, 2, "main");
    // Tabard over the armor.
    c.rect(11, 13, 2, 5, "main");
    // Sword in the right hand (viewer's right).
    c.rect(19, 6, 1, 10, "metal");
    c.rect(18, 16, 3, 1, "main");
    c.rect(19, 17, 1, 2, "wood");
    // Shield on the left arm.
    if (r() > 0.5) {
      c.rect(2, 13, 4, 5, "cloth");
      c.rect(3, 18, 2, 1, "cloth");
    }
  },
  mage(c, r) {
    // Pointed hat with a brim.
    c.rect(11, 0, 2, 1, "main");
    c.rect(11, 1, 3, 1, "main");
    c.rect(10, 2, 4, 1, "main");
    c.rect(9, 3, 6, 1, "main");
    c.rect(6, 4, 12, 1, "main");
    if (r() > 0.5) c.rect(9, 3, 6, 1, "gem"); // hat band
    // Staff with an orb.
    c.rect(4, 6, 1, 17, "wood");
    c.disc(4.5, 4.5, 1.7, "gem");
  },
  rogue(c, r) {
    // Hood framing the face, and a mask.
    c.rect(9, 3, 6, 1, "main");
    c.rect(8, 4, 8, 1, "main");
    c.rect(7, 5, 1, 7, "main");
    c.rect(16, 5, 1, 7, "main");
    c.rect(8, 5, 1, 2, "main");
    c.rect(15, 5, 1, 2, "main");
    if (r() > 0.4) c.rect(9, 10, 6, 2, "cloth");
    // Dagger.
    c.rect(19, 13, 1, 4, "metal");
    c.rect(18, 17, 3, 1, "wood");
  },
  archer(c, r) {
    // Cap with a feather.
    c.rect(9, 3, 6, 1, "main");
    c.rect(8, 4, 8, 1, "main");
    if (r() > 0.4) {
      c.put(16, 3, "gem");
      c.put(17, 2, "gem");
    }
    // Bow (curved wood) and string.
    for (let y = 8; y <= 19; y++) {
      const curve = y < 10 || y > 17 ? 4 : 3;
      c.put(curve, y, "wood");
    }
    c.rect(5, 9, 1, 10, "white");
  },
  villager(c, r) {
    // Apron or overalls.
    if (r() > 0.5) c.rect(10, 14, 4, 4, "cloth");
  },
};

/** Variation from the seed: hair, extras and the secondary ramps. */
export function generateCharacter(cls: CharacterClass, seed: number, tone: SpriteTone, skin: number): SpritePixel[][] {
  const r = rng(seed * 104729 + CHARACTER_CLASSES.indexOf(cls) * 31 + 7);
  const others = SPRITE_TONES.filter((t) => t !== tone);
  const ramps: Record<string, string> = {
    main: tone,
    cloth: pick(r, others),
    hair: pick(r, ["secondary", "accent", "destructive", "metal", "primary"].filter((t) => t !== tone)),
    cape: pick(r, others),
    gem: pick(r, others),
    skin: `skin-${skin}`,
    metal: "metal",
    wood: "secondary",
    eye: "eye",
    white: "white",
  };
  const c = painter(CHARACTER_SIZE);
  const style = pick<HairStyle>(r, ["short", "long", "spiky", "bun", "bald"]);
  const hasCape = r() > 0.6;
  body(c, { robe: cls === "mage", armor: cls === "knight" });
  if (cls === "villager" || cls === "archer" || cls === "mage") hair(c, cls === "mage" ? "long" : style);
  if (cls === "villager" && r() > 0.6) beard(c);
  if (cls === "knight" && r() > 0.7) beard(c);
  if (hasCape && cls !== "mage") cape(c);
  GEAR[cls](c, r);
  // Re-draw the eyes in case gear covered them.
  c.put(9, 8, "eye");
  c.put(14, 8, "eye");
  return shadeSprite(c.g, (m) => ramps[m] ?? tone, ["eye", "white"]);
}
