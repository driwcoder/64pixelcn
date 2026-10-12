// Rule-based pixel art enemies on a 24x24 grid. Each archetype paints a
// symmetric body on the left half, mirrors it, then adds asymmetric details.
// The tone colors the body; the seed varies size, features and accents.

import { SPRITE_TONES, int, painter, pick, rng, shadeSprite, type SpritePixel, type SpriteTone } from "@/lib/sprite-core";

export const ENEMY_SIZE = 24;

export const ENEMY_TYPES = ["slime", "goblin", "skeleton", "bat", "ghost", "eye", "mushroom"] as const;
export type EnemyType = (typeof ENEMY_TYPES)[number];

export const ENEMY_LABELS: Record<EnemyType, string> = {
  slime: "Slime",
  goblin: "Goblin",
  skeleton: "Skeleton",
  bat: "Bat",
  ghost: "Ghost",
  eye: "Floating Eye",
  mushroom: "Mushroom",
};

type Paint = ReturnType<typeof painter>;

/** Two eyes: white with a pupil, mirrored around the center. */
function eyes(c: Paint, y: number, x: number, big: boolean) {
  c.rect(x, y, 2, big ? 2 : 1, "white");
  c.put(x + 1, y + (big ? 1 : 0), "eye");
  c.rect(23 - x - 1, y, 2, big ? 2 : 1, "white");
  c.put(23 - x - 1, y + (big ? 1 : 0), "eye");
}

const ENEMIES: Record<EnemyType, (c: Paint, r: () => number) => void> = {
  slime(c, r) {
    const radius = int(r, 7, 10) + 0.5;
    const top = 21 - Math.round(radius * (0.8 + r() * 0.3));
    c.disc(12, 21, radius, "main");
    c.rect(0, 22, 24, 2, null);
    for (let y = 0; y < top; y++) c.rect(0, y, 24, 1, null);
    c.put(9, top + 2, "glass"); // shine
    c.put(8, top + 3, "glass");
    eyes(c, 15, 8, true);
    if (r() > 0.5) c.rect(11, 18, 2, 1, "eye"); // mouth
    if (r() > 0.5) c.rect(17, 22, 1, 1, "main"); // drip
  },
  goblin(c, r) {
    // Wide head with pointed ears.
    c.rect(8, 5, 4, 7, "main");
    const ear = int(r, 2, 4);
    for (let i = 0; i < ear; i++) c.put(7 - i, 7 - i, "main"); // pointed, up and out
    c.rect(9, 12, 3, 1, "main");
    // Ragged tunic, arms, legs.
    c.rect(8, 13, 4, 5, "cloth");
    c.rect(6, 13, 2, 3, "main");
    c.rect(9, 18, 2, 3, "main");
    c.mirror();
    eyes(c, 8, 9, false);
    // Teeth and a club.
    c.put(10, 11, "white");
    if (r() > 0.4) c.put(13, 11, "white");
    if (r() > 0.3) {
      c.rect(19, 9, 2, 3, "wood");
      c.rect(19, 12, 1, 5, "wood");
    }
  },
  skeleton(c, r) {
    // Skull, jaw, spine, ribs, limbs (bones are "metal": light in any mode).
    c.rect(8, 3, 4, 7, "metal");
    c.put(8, 3, null);
    c.rect(9, 6, 2, 2, "socket");
    c.rect(10, 10, 2, 1, "metal");
    c.rect(11, 11, 1, 8, "metal"); // spine (mirrored: 2px)
    for (const y of [12, 14, 16]) c.rect(8, y, 3, 1, "metal");
    c.rect(6, 12, 1, 6, "metal"); // arms
    c.rect(9, 19, 1, 3, "metal"); // legs
    c.rect(8, 22, 2, 1, "metal");
    c.mirror();
    // Teeth, helmet, sword.
    c.rect(10, 9, 4, 1, "eye");
    for (const x of [10, 12]) c.put(x, 9, "metal");
    if (r() > 0.5) {
      c.rect(8, 2, 8, 2, "main");
      c.rect(7, 4, 1, 2, "main");
      c.rect(16, 4, 1, 2, "main");
    }
    if (r() > 0.4) {
      c.rect(18, 8, 1, 10, "metal");
      c.rect(17, 17, 3, 1, "wood");
    }
  },
  bat(c, r) {
    const span = int(r, 0, 2);
    c.disc(12, 12, 3.6, "main"); // body
    c.rect(9, 6, 1, 3, "main"); // ears
    // Wings: stepped triangles getting longer, scalloped bottom.
    for (let i = 0; i < 6 + span; i++) {
      const x = 8 - i;
      const top = 9 + Math.floor(i / 2);
      const bottom = 13 + (i % 2 === 0 ? 1 : 0) + (r() > 0.7 ? 1 : 0);
      c.rect(x, top, 1, Math.max(1, bottom - top), "cloth");
    }
    c.mirror();
    c.put(10, 11, "white");
    c.put(13, 11, "white");
    if (r() > 0.4) { c.put(11, 14, "white"); c.put(12, 14, "white"); } // fangs
  },
  ghost(c, r) {
    const tall = int(r, 0, 2);
    c.disc(12, 10, 7.5, "main");
    c.rect(5, 10, 14, 9 + tall, "main");
    // Wavy hem.
    const hem = 19 + tall;
    for (let x = 5; x < 19; x++) if ((x + tall) % 3 === 0) c.put(x, hem - 1, null);
    eyes(c, 9, 8, true);
    const mouth = int(r, 0, 2);
    if (mouth === 1) c.rect(11, 13, 2, 2, "eye");
    if (mouth === 2) c.rect(10, 13, 4, 1, "eye");
    c.put(8, 6, "glass");
  },
  eye(c, r) {
    c.disc(12, 13, 7.5, "main");
    c.disc(12, 13, 4.5, "white");
    c.disc(12, 13, 2.6, "iris");
    c.disc(12, 13, 1.2, "eye");
    // Eyestalks with little eyes.
    const stalks = int(r, 2, 4);
    const xs = [6, 9, 15, 18].slice(0, stalks);
    for (const x of xs) {
      c.rect(x, 3, 1, 4, "main");
      c.put(x, 2, "white");
    }
    c.put(9, 9, "glass");
  },
  mushroom(c, r) {
    // Cap (dome) with spots, stem with a face, little feet.
    c.disc(12, 12, 9.5, "main");
    for (let y = 12; y < 24; y++) c.rect(0, y, 24, 1, null);
    for (let y = 0; y < 4; y++) c.rect(0, y, 24, 1, null);
    const spots = int(r, 3, 5);
    for (let i = 0; i < spots; i++) c.disc(int(r, 6, 17) + 0.5, int(r, 5, 9) + 0.5, 1.2, "white");
    c.rect(8, 12, 8, 8, "stem");
    c.put(10, 15, "eye");
    c.put(13, 15, "eye");
    if (r() > 0.5) c.rect(11, 17, 2, 1, "eye");
    c.rect(8, 20, 3, 2, "main");
    c.rect(13, 20, 3, 2, "main");
  },
};

export function generateEnemy(type: EnemyType, seed: number, tone: SpriteTone): SpritePixel[][] {
  const r = rng(seed * 15485863 + ENEMY_TYPES.indexOf(type) * 97 + 3);
  const others = SPRITE_TONES.filter((t) => t !== tone);
  const ramps: Record<string, string> = {
    main: tone,
    cloth: pick(r, others),
    iris: pick(r, others),
    socket: pick(r, ["destructive", "accent", "primary"]),
    stem: "skin-0", // light beige: the face stays visible on any theme
    metal: "metal",
    wood: "secondary",
    glass: "surface",
    eye: "eye",
    white: "white",
  };
  const c = painter(ENEMY_SIZE);
  ENEMIES[type](c, r);
  return shadeSprite(c.g, (m) => ramps[m] ?? tone, ["eye", "white", "socket"]);
}
