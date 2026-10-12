// Engine kits, grouped by platform. Each kit has its own page under /kits.
// New platforms (PC, mobile...) are new groups here.

export type KitStatus = "ready" | "soon";

export interface Kit {
  slug: string;
  title: string;
  description: string;
  status: KitStatus;
}

export interface KitPlatform {
  id: string;
  title: string;
  description: string;
  kits: Kit[];
}

export const KIT_PLATFORMS: KitPlatform[] = [
  {
    id: "browser",
    title: "Browser games",
    description: "Games that run in a web page: text RPGs, canvas games and engines built on HTML5.",
    kits: [
      {
        slug: "html",
        title: "HTML & JS",
        description: "One CSS file and one ES module, no framework. The base for text RPGs and menus around any game.",
        status: "ready",
      },
      {
        slug: "text-rpg",
        title: "Text RPG",
        description: "A playable text adventure built with the HTML kit: story log, choices, stats, inventory and shop.",
        status: "ready",
      },
      {
        slug: "phaser",
        title: "Phaser",
        description: "Use pixelcn themes and panels inside a Phaser 3 game: HUD, dialogue and menus drawn on the canvas.",
        status: "ready",
      },
      {
        slug: "kaplay",
        title: "KAPLAY",
        description: "Themes and panels for KAPLAY (formerly Kaboom) games.",
        status: "soon",
      },
    ],
  },
  {
    id: "pc",
    title: "PC games",
    description: "Desktop builds (Electron, Tauri, Godot UI themes).",
    kits: [],
  },
  {
    id: "mobile",
    title: "Mobile games",
    description: "Touch-first layouts and app wrappers (Capacitor, React Native).",
    kits: [],
  },
];

export const ALL_KITS = KIT_PLATFORMS.flatMap((p) => p.kits.map((k) => ({ ...k, platform: p.id })));
