"use client";

import * as React from "react";
import { Coins, Crown, Heart, Shield, Sparkles, Star, Sword, Zap } from "@/components/ui/icons";
import { PixelAchievement } from "@/components/ui/achievement";
import { PixelButton } from "@/components/ui/button";
import { PixelCoinCounter } from "@/components/ui/coin-counter";
import { PixelContinueScreen } from "@/components/ui/continue-screen";
import { PixelDialogueBox } from "@/components/ui/dialogue-box";
import { PixelInventory, type PixelInventoryItem } from "@/components/ui/inventory";
import { PixelScoreboard } from "@/components/ui/scoreboard";

// Demos for the game components; their code is in lib/code-snippets.ts.

function DialogueBoxDemo() {
  const [round, setRound] = React.useState(0);
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <PixelDialogueBox
        key={round}
        speaker="Old Man"
        portrait={<Sparkles />}
        lines={["It's dangerous to go alone!", "Take this.", "Press Enter or click to continue."]}
        onComplete={() => setRound((r) => r + 1)}
      />
    </div>
  );
}

const ITEMS: (PixelInventoryItem | null)[] = [
  { id: "sword", name: "Sword", icon: <Sword /> },
  { id: "shield", name: "Shield", icon: <Shield /> },
  { id: "potion", name: "Potion", icon: <Heart />, count: 3 },
  { id: "coins", name: "Coins", icon: <Coins />, count: 42 },
  { id: "star", name: "Star", icon: <Star /> },
  null,
  { id: "bolt", name: "Bolt", icon: <Zap />, count: 9 },
  null,
];

function InventoryDemo() {
  const [selected, setSelected] = React.useState<string | null>("sword");
  const item = ITEMS.find((i) => i?.id === selected);
  return (
    <div className="flex flex-col items-center gap-3">
      <PixelInventory slots={ITEMS} columns={4} selectedId={selected} onSelectedIdChange={setSelected} />
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{item ? `Equipped: ${item.name}` : "Nothing equipped"}</p>
    </div>
  );
}

function ScoreboardDemo() {
  return (
    <PixelScoreboard
      className="max-w-sm"
      highlight="YOU"
      entries={[
        { name: "AAA", score: 98200 },
        { name: "YOU", score: 45150 },
        { name: "BOB", score: 61000 },
        { name: "ZED", score: 12000 },
        { name: "KIM", score: 30500 },
      ]}
    />
  );
}

function CoinCounterDemo() {
  const [coins, setCoins] = React.useState(42);
  return (
    <div className="flex flex-col items-center gap-3">
      <PixelCoinCounter value={coins} />
      <div className="flex flex-wrap justify-center gap-2">
        <PixelButton size="sm" onClick={() => setCoins((c) => c + 1)}>+1</PixelButton>
        <PixelButton size="sm" variant="secondary" onClick={() => setCoins((c) => c + 100)}>+100</PixelButton>
        <PixelButton size="sm" variant="outline" onClick={() => setCoins(0)}>Spend</PixelButton>
      </div>
    </div>
  );
}

function ContinueScreenDemo() {
  const [state, setState] = React.useState<"playing" | "continue" | "over">("continue");
  const [run, setRun] = React.useState(0);
  if (state === "continue") {
    return <PixelContinueScreen key={run} className="max-w-sm" seconds={9} onContinue={() => setState("playing")} onQuit={() => setState("over")} />;
  }
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-sm uppercase tracking-widest">{state === "playing" ? "Player 1 ready!" : "Game over"}</p>
      <PixelButton
        onClick={() => {
          setRun((r) => r + 1);
          setState("continue");
        }}
      >
        Lose a life
      </PixelButton>
    </div>
  );
}

function AchievementDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <PixelAchievement title="First blood" description="Defeat your first enemy." points={10} />
      <PixelAchievement title="Treasure hunter" description="Find all 7 crowns." icon={<Crown />} points={50} unlocked={false} />
    </div>
  );
}

export const gameDemos: Record<string, () => React.ReactNode> = {
  "dialogue-box": () => <DialogueBoxDemo />,
  inventory: () => <InventoryDemo />,
  scoreboard: () => <ScoreboardDemo />,
  "coin-counter": () => <CoinCounterDemo />,
  "continue-screen": () => <ContinueScreenDemo />,
  achievement: () => <AchievementDemo />,
};
