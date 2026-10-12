import type { Metadata } from "next";
import { KitExample } from "@/components/kit-example";

export const metadata: Metadata = {
  title: "Phaser kit — 64pixelcn",
  description: "pixelcn panels and themes inside a Phaser game: HUD and dialogue drawn with drawPanel().",
};

export default function PhaserKitPage() {
  return (
    <KitExample
      slug="phaser"
      title="Phaser"
      height={460}
      intro={
        <p>
          A tiny Phaser 4 game (collect 10 coins, arrows or WASD) whose HUD and dialogue box are drawn by pixelcn&apos;s{" "}
          <code className="font-mono">drawPanel()</code> into Phaser canvas textures, and whose colors come from the active theme. Change
          the theme under the game and both the page and the canvas update.
        </p>
      }
      steps={[
        <>Download the file; it loads Phaser from a CDN and the kit from this site (or <code className="font-mono">npm install pixelcn phaser</code>).</>,
        <><code className="font-mono">panelTexture(scene, key, w, h, tone)</code> turns any pixelcn panel into a texture; put text or sprites inside the returned content box.</>,
        <><code className="font-mono">color(&quot;primary&quot;)</code> reads a theme color; <code className="font-mono">toNumber()</code> converts it for Phaser shapes.</>,
        <>Keep menus, inventory and dialogue in HTML with the kit&apos;s classes when you prefer DOM UI over canvas: both share the same theme.</>,
      ]}
    />
  );
}
