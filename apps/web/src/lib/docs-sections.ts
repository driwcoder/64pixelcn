// Plain module (not "use client") so both the server docs layout and the
// client nav components can read the values.
/** The five areas in the top navigation. */
export const SECTIONS = [
  { href: "/create", label: "Create", description: "Pick theme, font, pixel size, corners and icons. Get one command that sets up your project." },
  { href: "/docs/components", label: "Components", description: "Buttons, inputs, menus and game pieces: health bars, inventory, dialogue, scoreboard." },
  { href: "/docs/blocks", label: "Blocks", description: "Ready-made screens built from components: menus, HUDs, shops, title and game over." },
  { href: "/kits", label: "Engine kits", description: "The same look outside React: plain HTML for text RPGs, canvas and game engines." },
  { href: "/assets", label: "Assets", description: "Pixel art in your palette: icon sets now; items, characters and enemies next." },
];

/** Extra links in the docs sidebar / mobile menu. */
export const DOC_LINKS = [
  { href: "/docs", label: "Get Started" },
  { href: "/docs/changelog", label: "Changelog" },
];
