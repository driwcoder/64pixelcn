import type { Metadata } from "next";
import { KitExample } from "@/components/kit-example";

export const metadata: Metadata = {
  title: "Text RPG kit — 64pixelcn",
  description: "A playable text RPG in one HTML file with the pixelcn kit: story, choices, stats, shop and battle.",
};

export default function TextRpgKitPage() {
  return (
    <KitExample
      slug="text-rpg"
      title="Text RPG"
      intro={
        <p>
          A complete text adventure in one HTML file, no framework: story log with choices, HP and gold, a bag, a shop and a turn-based
          battle. Styling comes from the pixelcn kit (theme, pixel font, <code className="font-mono">.pixel-raised</code> panels), so
          switching theme restyles the whole game. Progress saves in the browser; number keys pick choices.
        </p>
      }
      steps={[
        <>Download the file and open it from any web server (for example <code className="font-mono">npx serve</code>).</>,
        <>Replace <code className="font-mono">/kit/pixelcn.css</code> and <code className="font-mono">/kit/pixelcn.min.js</code> with full URLs to this site, or <code className="font-mono">npm install pixelcn</code> and import from <code className="font-mono">&quot;pixelcn&quot;</code>.</>,
        <>Write your story in <code className="font-mono">STORY</code>: each scene has <code className="font-mono">text</code> and <code className="font-mono">choices</code>; a choice can <code className="font-mono">run</code> code (give gold, start a fight) and <code className="font-mono">go</code> to another scene.</>,
        <>Pick a look with the attributes on <code className="font-mono">&lt;html&gt;</code> (theme, size, shading...), or build one in Create and copy the values.</>,
      ]}
    />
  );
}
