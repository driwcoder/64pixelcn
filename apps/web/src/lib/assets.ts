// The Assets area: generators and downloadable pixel art. Status "soon" items
// are on the roadmap (item icons first, then characters).

export interface AssetSection {
  slug: string;
  title: string;
  description: string;
  status: "ready" | "soon";
}

export const ASSET_SECTIONS: AssetSection[] = [
  { slug: "icons", title: "Icon sets", description: "50 UI icons in pixelarticons, HackerNoon Pixel or Lucide, following your Display choice.", status: "ready" },
  { slug: "items", title: "Item icons", description: "Generate swords, potions, coins, shields, keys and gems in your theme's palette, as PNG or SVG.", status: "ready" },
  { slug: "characters", title: "Characters", description: "Rule-based heroes and NPCs: pick body, outfit and palette, export a sprite.", status: "soon" },
  { slug: "enemies", title: "Enemies", description: "Monsters and villains built from parts, recolored to your theme.", status: "soon" },
];
