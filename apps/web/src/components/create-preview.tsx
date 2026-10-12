"use client";

import * as React from "react";
import { Bell, Bold, Italic, Sword, Underline } from "@/components/ui/icons";
import {
  PixelAlert,
  PixelAlertDescription,
  PixelAlertTitle,
  PixelAvatar,
  PixelAvatarFallback,
  PixelBadge,
  PixelButton,
  PixelCard,
  PixelCardContent,
  PixelCardDescription,
  PixelCardFooter,
  PixelCardHeader,
  PixelCardTitle,
  PixelCheckbox,
  PixelEnemyHealthDisplay,
  PixelHealthBar,
  PixelInput,
  PixelKbd,
  PixelLabel,
  PixelManaBar,
  PixelProgress,
  PixelSelect,
  PixelSelectContent,
  PixelSelectItem,
  PixelSelectTrigger,
  PixelSelectValue,
  PixelSlider,
  PixelSwitch,
  PixelTable,
  PixelTableBody,
  PixelTableCell,
  PixelTableHead,
  PixelTableHeader,
  PixelTableRow,
  PixelTabs,
  PixelTabsContent,
  PixelTabsList,
  PixelTabsTrigger,
  PixelToggleGroup,
  PixelToggleGroupItem,
  PixelXpBar,
} from "@/components/ui/index";

function SignInCard() {
  return (
    <PixelCard>
      <PixelCardHeader>
        <PixelCardTitle>Continue?</PixelCardTitle>
        <PixelCardDescription>Sign in to load your save file.</PixelCardDescription>
      </PixelCardHeader>
      <PixelCardContent className="space-y-3">
        <div className="space-y-1.5">
          <PixelLabel htmlFor="create-email">Email</PixelLabel>
          <PixelInput id="create-email" type="email" placeholder="player1@arcade.dev" />
        </div>
        <div className="space-y-1.5">
          <PixelLabel htmlFor="create-pass">Password</PixelLabel>
          <PixelInput id="create-pass" type="password" placeholder="••••••••" />
        </div>
        <label className="flex items-center gap-2 text-xs">
          <PixelCheckbox defaultChecked /> Remember me
        </label>
      </PixelCardContent>
      <PixelCardFooter className="justify-between">
        <PixelButton variant="ghost" size="sm">New game</PixelButton>
        <PixelButton size="sm">Start</PixelButton>
      </PixelCardFooter>
    </PixelCard>
  );
}

function PlayerCard() {
  const [hp, setHp] = React.useState(72);
  return (
    <PixelCard>
      <PixelCardHeader>
        <div className="flex items-center gap-3">
          <PixelAvatar><PixelAvatarFallback>P1</PixelAvatarFallback></PixelAvatar>
          <div className="min-w-0">
            <PixelCardTitle>Pixel Knight</PixelCardTitle>
            <PixelCardDescription>Level 7 · Warrior</PixelCardDescription>
          </div>
        </div>
      </PixelCardHeader>
      <PixelCardContent className="space-y-3">
        <PixelHealthBar value={hp} showIcon />
        <PixelManaBar value={45} showIcon />
        <PixelXpBar value={65} level={7} showIcon />
      </PixelCardContent>
      <PixelCardFooter>
        <PixelButton size="sm" variant="destructive" onClick={() => setHp((v) => Math.max(0, v - 20))}>Hit</PixelButton>
        <PixelButton size="sm" variant="secondary" onClick={() => setHp((v) => Math.min(100, v + 20))}>Heal</PixelButton>
      </PixelCardFooter>
    </PixelCard>
  );
}

function SettingsCard() {
  return (
    <PixelCard>
      <PixelCardHeader>
        <PixelCardTitle>Options</PixelCardTitle>
        <PixelCardDescription>Audio, video and difficulty.</PixelCardDescription>
      </PixelCardHeader>
      <PixelCardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <PixelLabel htmlFor="create-music">Music</PixelLabel>
          <PixelSwitch id="create-music" defaultChecked />
        </div>
        <div className="flex items-center justify-between gap-3">
          <PixelLabel htmlFor="create-crt">CRT filter</PixelLabel>
          <PixelSwitch id="create-crt" />
        </div>
        <div className="space-y-2">
          <PixelLabel>Volume</PixelLabel>
          <PixelSlider defaultValue={[60]} max={100} step={10} />
        </div>
        <div className="space-y-2">
          <PixelLabel>Difficulty</PixelLabel>
          <PixelSelect defaultValue="normal">
            <PixelSelectTrigger aria-label="Difficulty"><PixelSelectValue /></PixelSelectTrigger>
            <PixelSelectContent>
              <PixelSelectItem value="easy">Easy</PixelSelectItem>
              <PixelSelectItem value="normal">Normal</PixelSelectItem>
              <PixelSelectItem value="hard">Hard</PixelSelectItem>
            </PixelSelectContent>
          </PixelSelect>
        </div>
      </PixelCardContent>
    </PixelCard>
  );
}

function InventoryCard() {
  const items = [
    { name: "Potion", qty: 3, rarity: "Common" },
    { name: "Ether", qty: 1, rarity: "Rare" },
    { name: "Phoenix", qty: 1, rarity: "Epic" },
  ];
  return (
    <PixelCard>
      <PixelCardHeader>
        <PixelCardTitle>Inventory</PixelCardTitle>
      </PixelCardHeader>
      <PixelCardContent>
        <PixelTable>
          <PixelTableHeader>
            <PixelTableRow>
              <PixelTableHead>Item</PixelTableHead>
              <PixelTableHead>Qty</PixelTableHead>
              <PixelTableHead>Rarity</PixelTableHead>
            </PixelTableRow>
          </PixelTableHeader>
          <PixelTableBody>
            {items.map((i) => (
              <PixelTableRow key={i.name}>
                <PixelTableCell>{i.name}</PixelTableCell>
                <PixelTableCell>{i.qty}</PixelTableCell>
                <PixelTableCell><PixelBadge variant={i.rarity === "Epic" ? "default" : "outline"}>{i.rarity}</PixelBadge></PixelTableCell>
              </PixelTableRow>
            ))}
          </PixelTableBody>
        </PixelTable>
      </PixelCardContent>
    </PixelCard>
  );
}

function BossCard() {
  return (
    <PixelCard>
      <PixelCardHeader>
        <PixelCardTitle>Boss fight</PixelCardTitle>
        <PixelCardDescription>Press <PixelKbd>A</PixelKbd> to attack.</PixelCardDescription>
      </PixelCardHeader>
      <PixelCardContent className="space-y-3">
        <PixelEnemyHealthDisplay name="Dark Lord" level={42} value={30} max={100} segments={10} />
        <div className="flex flex-wrap gap-2">
          <PixelButton size="sm"><Sword className="h-4 w-4" /> Attack</PixelButton>
          <PixelButton size="sm" variant="outline">Defend</PixelButton>
          <PixelButton size="sm" variant="ghost">Run</PixelButton>
        </div>
      </PixelCardContent>
    </PixelCard>
  );
}

function QuestCard() {
  return (
    <PixelCard>
      <PixelCardContent className="pt-[1.5em]">
        <PixelTabs defaultValue="active">
          <PixelTabsList>
            <PixelTabsTrigger value="active">Active</PixelTabsTrigger>
            <PixelTabsTrigger value="done">Done</PixelTabsTrigger>
          </PixelTabsList>
          <PixelTabsContent value="active" className="space-y-3 pt-2">
            <div className="text-xs uppercase tracking-widest">Find the lost sword</div>
            <PixelProgress value={60} />
            <PixelToggleGroup type="multiple" variant="outline" aria-label="Text style">
              <PixelToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></PixelToggleGroupItem>
              <PixelToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></PixelToggleGroupItem>
              <PixelToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></PixelToggleGroupItem>
            </PixelToggleGroup>
          </PixelTabsContent>
          <PixelTabsContent value="done" className="pt-2 text-xs text-muted-foreground">
            Rescue the princess · Beat level 1
          </PixelTabsContent>
        </PixelTabs>
      </PixelCardContent>
    </PixelCard>
  );
}

function NoticeCard() {
  return (
    <PixelAlert>
      <Bell />
      <PixelAlertTitle>Achievement unlocked</PixelAlertTitle>
      <PixelAlertDescription>You built your first pixel preset.</PixelAlertDescription>
    </PixelAlert>
  );
}

/** Showcase rendered with the preset being built (it drives <html> on /create). */
export function CreatePreview() {
  return (
    <div className="pixel-demo columns-1 gap-4 md:columns-2 2xl:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
      <PlayerCard />
      <SignInCard />
      <NoticeCard />
      <SettingsCard />
      <BossCard />
      <InventoryCard />
      <QuestCard />
    </div>
  );
}
