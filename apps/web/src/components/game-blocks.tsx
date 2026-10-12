"use client";

// Game screens for the Blocks page, built from pixelcn components. They are
// small but playable, and lean on text RPGs: story log with choices, dialogue,
// character sheet, inventory, shop and a turn-based battle.

import * as React from "react";
import { Coins, Crown, Flame, Heart, Play, Shield, Sparkles, Star, Sword, Zap } from "@/components/ui/icons";
import { PixelButton } from "@/components/ui/button";
import { PixelCoinCounter } from "@/components/ui/coin-counter";
import { PixelDialogueBox } from "@/components/ui/dialogue-box";
import { PixelEnemyHealthDisplay } from "@/components/ui/enemy-health-display";
import { PixelHealthBar } from "@/components/ui/health-bar";
import { PixelInventory, type PixelInventoryItem } from "@/components/ui/inventory";
import { PixelManaBar } from "@/components/ui/mana-bar";
import { PixelSlider } from "@/components/ui/slider";
import { PixelXpBar } from "@/components/ui/xp-bar";
import { cn } from "@/lib/utils";

const frame = "border-[length:var(--pixel-line,2px)] border-foreground bg-card";

/** Vertical menu with keyboard focus; the first item starts highlighted. */
function MenuList({ items, onSelect }: { items: string[]; onSelect?: (item: string) => void }) {
  return (
    <ul className="space-y-1.5" role="menu">
      {items.map((it, i) => (
        <li key={it} role="none">
          <button
            type="button"
            role="menuitem"
            onClick={() => onSelect?.(it)}
            className={cn(
              "group flex w-full items-center gap-2 border-[length:var(--pixel-line,2px)] px-3 py-1.5 text-left text-xs uppercase tracking-widest",
              "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none",
              i === 0 && "border-primary bg-primary text-primary-foreground hover:text-primary-foreground"
            )}
          >
            <Play className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" />
            {it}
          </button>
        </li>
      ))}
    </ul>
  );
}

// ─── Title & menus ─────────────────────────────────────────────
export function GameTitleScreen() {
  return (
    <div className={cn(frame, "space-y-6 p-[clamp(1rem,6%,2.5rem)] text-center")}>
      <div className="space-y-2">
        <Crown className="mx-auto h-10 w-10 text-primary" />
        <h2 className="text-2xl uppercase tracking-widest text-primary wrap-anywhere">Pixel Quest</h2>
        <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">The Lost Crown</p>
      </div>
      <div className="mx-auto max-w-56">
        <MenuList items={["New game", "Continue", "Options", "Credits"]} />
      </div>
      <p className="animate-pulse text-[0.65rem] uppercase tracking-widest text-muted-foreground">Press start</p>
    </div>
  );
}

export function GamePauseMenu() {
  return (
    <div className="bg-foreground/40 p-[clamp(0.75rem,6%,2rem)]">
      <div className={cn(frame, "mx-auto max-w-72 space-y-4 p-4 shadow-[var(--pixel-shadow)]")}>
        <h2 className="text-center text-sm uppercase tracking-widest">Paused</h2>
        <MenuList items={["Resume", "Save game", "Options", "Quit to title"]} />
        <div className="space-y-2 border-t-[length:var(--pixel-line,2px)] border-border pt-3">
          <div className="flex justify-between text-[0.65rem] uppercase tracking-widest text-muted-foreground"><span>Music</span><span>70%</span></div>
          <PixelSlider defaultValue={[70]} max={100} step={10} aria-label="Music volume" />
        </div>
      </div>
    </div>
  );
}

// ─── Story & dialogue ──────────────────────────────────────────
export function GameRpgDialogue() {
  const [done, setDone] = React.useState(false);
  const [answer, setAnswer] = React.useState<string | null>(null);
  return (
    <div className="space-y-3">
      <PixelDialogueBox
        speaker="Old Sage"
        portrait={<Sparkles className="h-8 w-8 text-primary" />}
        lines={["The crown was stolen from the castle three nights ago.", "Will you bring it back, young hero?"]}
        onComplete={() => setDone(true)}
      />
      {done && !answer && (
        <div className="flex flex-wrap gap-2">
          <PixelButton size="sm" onClick={() => setAnswer("I will find it.")}>Accept quest</PixelButton>
          <PixelButton size="sm" variant="outline" onClick={() => setAnswer("Not today.")}>Decline</PixelButton>
        </div>
      )}
      {answer && <p className="text-xs text-muted-foreground">You: &ldquo;{answer}&rdquo;</p>}
    </div>
  );
}

interface StoryNode {
  text: string;
  choices: { label: string; to: string }[];
}

const STORY: Record<string, StoryNode> = {
  gate: {
    text: "You stand before the castle gate. A guard dozes on a stool; a narrow path leads around the wall.",
    choices: [{ label: "Sneak past the guard", to: "hall" }, { label: "Take the path", to: "garden" }],
  },
  hall: {
    text: "The great hall is empty. On the throne, a note: \"The crown is in the cellar.\"",
    choices: [{ label: "Go down to the cellar", to: "cellar" }, { label: "Back to the gate", to: "gate" }],
  },
  garden: {
    text: "Moonlit hedges. Something glints under a bush: a rusty key.",
    choices: [{ label: "Take the key and enter", to: "hall" }],
  },
  cellar: {
    text: "Torchlight. A goblin clutches the crown and grins. Roll for initiative!",
    choices: [{ label: "Start over", to: "gate" }],
  },
};

/** The core of a text RPG: narration log plus numbered choices. */
export function GameStoryLog() {
  const [log, setLog] = React.useState<{ id: number; text: string; you?: boolean }[]>([{ id: 0, text: STORY.gate.text }]);
  const [node, setNode] = React.useState("gate");
  const logRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  const choose = (label: string, to: string) => {
    setNode(to);
    setLog((l) => [...l, { id: l.length, text: label, you: true }, { id: l.length + 1, text: STORY[to].text }]);
  };

  return (
    <div className={cn(frame, "space-y-3 p-4")}>
      <div ref={logRef} aria-live="polite" className="max-h-48 space-y-2 overflow-y-auto pr-1 text-xs leading-relaxed">
        {log.map((e) => (
          <p key={e.id} className={e.you ? "text-primary" : undefined}>{e.you ? `> ${e.text}` : e.text}</p>
        ))}
      </div>
      <ol className="space-y-1.5 border-t-[length:var(--pixel-line,2px)] border-border pt-3">
        {STORY[node].choices.map((c, i) => (
          <li key={c.label}>
            <button
              type="button"
              onClick={() => choose(c.label, c.to)}
              className="w-full border-[length:var(--pixel-line,2px)] border-border px-3 py-1.5 text-left text-xs hover:border-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {i + 1}. {c.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Character ─────────────────────────────────────────────────
export function GameCharacterSheet() {
  const stats = [
    { name: "STR", value: 14, icon: Sword },
    { name: "DEF", value: 11, icon: Shield },
    { name: "MAG", value: 8, icon: Zap },
    { name: "LUK", value: 12, icon: Star },
  ];
  return (
    <div className={cn(frame, "space-y-4 p-4")}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm uppercase tracking-widest">Aria</h2>
        <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Knight · Lv 7</span>
      </div>
      <div className="space-y-2">
        <PixelHealthBar value={64} showIcon />
        <PixelManaBar value={30} showIcon />
        <PixelXpBar value={72} level={7} showIcon />
      </div>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-2">
        {stats.map((s) => (
          <div key={s.name} className="flex min-w-0 items-center justify-between gap-2 border-[length:var(--pixel-line,2px)] border-border px-2 py-1.5 text-xs">
            <dt className="flex items-center gap-1.5 uppercase tracking-widest text-muted-foreground"><s.icon className="h-3.5 w-3.5 shrink-0" />{s.name}</dt>
            <dd className="text-primary">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const BAG: (PixelInventoryItem | null)[] = [
  { id: "sword", name: "Iron Sword", icon: <Sword className="h-5 w-5" /> },
  { id: "shield", name: "Oak Shield", icon: <Shield className="h-5 w-5" /> },
  { id: "potion", name: "Potion", icon: <Heart className="h-5 w-5" />, count: 3 },
  { id: "ember", name: "Ember Stone", icon: <Flame className="h-5 w-5" /> },
  null, null, null, null,
];

const ITEM_TEXT: Record<string, string> = {
  sword: "A plain blade. ATK +4.",
  shield: "Light and sturdy. DEF +3.",
  potion: "Restores 30 HP.",
  ember: "Warm to the touch. Used by smiths.",
};

export function GameInventoryScreen() {
  const [selected, setSelected] = React.useState<PixelInventoryItem | null>(BAG[0]);
  return (
    // Wraps by available width (not viewport): details drop below the grid
    // when the block is narrow.
    <div className={cn(frame, "flex flex-wrap gap-4 p-4")}>
      <PixelInventory slots={BAG} columns={4} defaultSelectedId="sword" onSelectedIdChange={(_, item) => setSelected(item)} aria-label="Bag" />
      <div className="min-w-0 flex-1 basis-40 space-y-2 text-xs wrap-anywhere">
        <h3 className="uppercase tracking-widest">{selected?.name ?? "Empty slot"}</h3>
        <p className="text-muted-foreground">{selected ? ITEM_TEXT[selected.id] : "Nothing here."}</p>
        {selected && (
          <div className="flex flex-wrap gap-2 pt-1">
            <PixelButton size="sm">{selected.id === "potion" ? "Use" : "Equip"}</PixelButton>
            <PixelButton size="sm" variant="ghost">Drop</PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shop & combat ─────────────────────────────────────────────
const WARES = [
  { id: "potion", name: "Potion", price: 25, icon: Heart },
  { id: "ether", name: "Ether", price: 60, icon: Zap },
  { id: "shield", name: "Steel Shield", price: 120, icon: Shield },
];

export function GameShop() {
  const [gold, setGold] = React.useState(150);
  const [bought, setBought] = React.useState<string | null>(null);
  return (
    <div className={cn(frame, "space-y-3 p-4")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm uppercase tracking-widest">Merchant</h2>
        <PixelCoinCounter value={gold} icon={<Coins className="h-4 w-4" />} />
      </div>
      <p className="text-xs text-muted-foreground">&ldquo;Finest goods this side of the river!&rdquo;</p>
      <ul className="space-y-1.5">
        {WARES.map((w) => (
          <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 border-[length:var(--pixel-line,2px)] border-border px-3 py-1.5 text-xs">
            <span className="flex min-w-0 items-center gap-2"><w.icon className="h-4 w-4 shrink-0 text-primary" />{w.name}</span>
            <PixelButton
              size="sm"
              variant="outline"
              disabled={gold < w.price}
              onClick={() => {
                setGold((g) => g - w.price);
                setBought(w.name);
              }}
            >
              {w.price} G
            </PixelButton>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="min-h-[1.5em] text-[0.7rem] text-primary">{bought ? `Bought ${bought}!` : ""}</p>
    </div>
  );
}

export function GameBattle() {
  const MAX = 100;
  const [enemy, setEnemy] = React.useState(MAX);
  const [hp, setHp] = React.useState(80);
  const [log, setLog] = React.useState<string[]>(["A wild Goblin appears!"]);
  const over = enemy <= 0 || hp <= 0;

  const act = (action: "attack" | "magic" | "potion") => {
    if (over) return;
    const dmg = action === "attack" ? 18 : action === "magic" ? 30 : 0;
    const heal = action === "potion" ? 30 : 0;
    const nextEnemy = Math.max(0, enemy - dmg);
    const hit = nextEnemy > 0 ? 12 : 0;
    setEnemy(nextEnemy);
    setHp((h) => Math.max(0, Math.min(100, h + heal - hit)));
    setLog((l) =>
      [
        ...l,
        action === "potion" ? "You drink a potion (+30 HP)." : `You use ${action === "attack" ? "Attack" : "Fireball"} for ${dmg} damage.`,
        nextEnemy > 0 ? `Goblin strikes back for ${hit}.` : "The Goblin is defeated! +40 XP",
      ].slice(-4)
    );
  };

  return (
    <div className={cn(frame, "space-y-3 p-4")}>
      <PixelEnemyHealthDisplay name="Goblin" level={5} value={enemy} max={MAX} segments={10} />
      <PixelHealthBar value={hp} showIcon />
      <div aria-live="polite" className="min-h-[5.5em] space-y-1 border-[length:var(--pixel-line,2px)] border-border p-2 text-[0.7rem] leading-relaxed">
        {log.map((line, i) => <p key={i}>{line}</p>)}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-2">
        <PixelButton size="sm" onClick={() => act("attack")} disabled={over}><Sword className="h-3.5 w-3.5" /> Attack</PixelButton>
        <PixelButton size="sm" variant="secondary" onClick={() => act("magic")} disabled={over}><Flame className="h-3.5 w-3.5" /> Magic</PixelButton>
        <PixelButton size="sm" variant="outline" onClick={() => act("potion")} disabled={over}><Heart className="h-3.5 w-3.5" /> Potion</PixelButton>
        {over && (
          <PixelButton size="sm" variant="ghost" onClick={() => { setEnemy(MAX); setHp(80); setLog(["A wild Goblin appears!"]); }}>
            Again
          </PixelButton>
        )}
      </div>
    </div>
  );
}
