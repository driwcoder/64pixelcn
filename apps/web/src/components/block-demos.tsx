"use client";

import * as React from "react";
import { Sword, Shield, Zap, Star, Trophy, Users, Rocket, Heart, Flame, Target } from "lucide-react";
import {
  PixelButton, PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription,
  PixelBadge, PixelInput, PixelSeparator, PixelAvatar, PixelAvatarFallback, PixelTabs, PixelTabsList,
  PixelTabsTrigger, PixelTabsContent, PixelProgress, PixelHealthBar, PixelManaBar, PixelXpBar,
  PixelAccordion, PixelAccordionItem, PixelAccordionTrigger, PixelAccordionContent,
  PixelSlider, PixelSwitch, PixelSelect, PixelSelectContent, PixelSelectItem, PixelSelectTrigger, PixelSelectValue,
  PixelCalendar,
} from "@/components/ui/index";

// ─── HERO ─────────────────────────────────────────────────────
export function HeroCentered() {
  return (
    <div className="text-center py-10 px-4 border-2 border-foreground bg-card">
      <PixelBadge variant="outline" className="mb-4">NEW v0.1.0</PixelBadge>
      <h1 className="font-[family-name:var(--pixel-font)] text-2xl sm:text-3xl uppercase tracking-widest mb-3 break-words">64pixelcn</h1>
      <p className="text-xs text-muted-foreground mb-6 max-w-md mx-auto">A pixel art component library for retro UIs.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <PixelButton>Get Started</PixelButton>
        <PixelButton variant="outline">GitHub</PixelButton>
      </div>
    </div>
  );
}

export function HeroSplit() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-foreground bg-card">
      <div className="min-w-0 p-[1.5em] flex flex-col justify-center">
        <PixelBadge variant="outline" className="mb-3 w-fit">RETRO UI</PixelBadge>
        <h2 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest mb-3 wrap-anywhere">Build retro apps</h2>
        <p className="text-xs text-muted-foreground mb-5">Pixel-perfect components with modern React.</p>
        <PixelButton className="w-fit">Explore</PixelButton>
      </div>
      <div className="bg-muted border-t-2 md:border-t-0 md:border-l-2 border-foreground flex items-center justify-center p-8 min-h-[160px]">
        <Rocket className="h-16 w-16 text-primary" strokeWidth={2} />
      </div>
    </div>
  );
}

export function HeroGameTitle() {
  return (
    <div className="border-2 border-foreground bg-card p-8 text-center">
      <div className="text-[0.7rem] uppercase tracking-widest text-muted-foreground mb-2">PRESS START</div>
      <h2 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest mb-4 text-primary">PIXEL QUEST</h2>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-widest">
        <span>SCORE 99900</span>
        <span>HI 100000</span>
        <span>LV 42</span>
      </div>
    </div>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────
export function FeaturesCardGrid() {
  const items = [
    { icon: Sword, title: "Components", desc: "70+ pixel art components" },
    { icon: Shield, title: "Presets", desc: "5 retro themes built-in" },
    { icon: Zap, title: "Multi-size", desc: "8px to 128px" },
  ];
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-[0.6em]">
      {items.map((f) => (
        <PixelCard key={f.title} className="h-full">
          <PixelCardContent className="flex-1 pt-[1.5em] text-center flex flex-col items-center justify-center gap-[0.5em]">
            <f.icon className="h-[2em] w-[2em] text-primary shrink-0" strokeWidth={2} />
            <PixelCardTitle className="leading-relaxed">{f.title}</PixelCardTitle>
            <PixelCardDescription className="leading-relaxed">{f.desc}</PixelCardDescription>
          </PixelCardContent>
        </PixelCard>
      ))}
    </div>
  );
}

export function FeaturesList() {
  const steps = ["Install via CLI", "Pick a preset", "Build your UI"];
  return (
    <div className="border-2 border-foreground bg-card p-[0.9em] space-y-[0.5em]">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-[0.6em]">
          <span className="font-[family-name:var(--pixel-font)] text-[0.75em] border-2 border-foreground bg-primary text-primary-foreground h-[1.8em] w-[1.8em] flex items-center justify-center shrink-0 leading-none">{i + 1}</span>
          <span className="text-[0.8em] uppercase tracking-widest leading-relaxed">{s}</span>
        </div>
      ))}
    </div>
  );
}

// ─── PRICING ──────────────────────────────────────────────────
export function PricingTiers() {
  const tiers = [
    { name: "Free", price: "$0", features: ["10 components", "MIT license"] },
    { name: "Pro", price: "$29", features: ["All 70 components", "Priority support"], highlight: true },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-[0.6em]">
      {tiers.map((t) => (
        <PixelCard key={t.name} className={t.highlight ? "border-primary h-full" : "h-full"}>
          <PixelCardContent className="pt-[0.9em] pb-[0.9em] px-[0.9em] flex flex-col gap-[0.4em]">
            <PixelCardTitle className="text-[0.8em] leading-tight">{t.name}</PixelCardTitle>
            <div className="font-[family-name:var(--pixel-font)] text-[1.6em] leading-tight">{t.price}</div>
            <ul className="space-y-[0.3em] flex-1">
              {t.features.map((f) => <li key={f} className="text-[0.7em] leading-relaxed text-muted-foreground">✓ {f}</li>)}
            </ul>
            <PixelButton variant={t.highlight ? "default" : "outline"} size="sm" className="mt-[0.4em] w-full">Choose</PixelButton>
          </PixelCardContent>
        </PixelCard>
      ))}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────
export function FaqAccordion() {
  return (
    <PixelAccordion type="single" collapsible className="border-2 border-foreground bg-card">
      <PixelAccordionItem value="q1">
        <PixelAccordionTrigger>Is it accessible?</PixelAccordionTrigger>
        <PixelAccordionContent>Yes, built on Radix primitives.</PixelAccordionContent>
      </PixelAccordionItem>
      <PixelAccordionItem value="q2">
        <PixelAccordionTrigger>Can I customize?</PixelAccordionTrigger>
        <PixelAccordionContent>Yes, presets and themes included.</PixelAccordionContent>
      </PixelAccordionItem>
    </PixelAccordion>
  );
}

// ─── SOCIAL PROOF ─────────────────────────────────────────────
export function StatsBar() {
  const stats = [
    { value: "70", label: "Components" },
    { value: "5", label: "Themes" },
    { value: "MIT", label: "License" },
    { value: "∞", label: "Fun" },
  ];
  return (
    // gap + foreground background draws the dividers, so they stay correct
    // however many columns fit (4 on wide screens, 2 on phones).
    <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-[2px] border-2 border-foreground bg-foreground">
      {stats.map((s) => (
        <div key={s.label} className="min-w-0 bg-card p-[0.7em] text-center flex flex-col items-center justify-center gap-[0.2em]">
          <div className="font-[family-name:var(--pixel-font)] text-[1.3em] leading-tight text-primary">{s.value}</div>
          <div className="max-w-full text-[0.65em] uppercase tracking-wider leading-relaxed text-muted-foreground break-words">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {["Amazing retro vibes!", "Best pixel UI kit."].map((q, i) => (
        <PixelCard key={i}>
          <PixelCardContent className="pt-4">
            <p className="text-xs mb-2">&ldquo;{q}&rdquo;</p>
            <div className="flex items-center gap-2">
              <PixelAvatar className="h-6 w-6"><PixelAvatarFallback>U{i}</PixelAvatarFallback></PixelAvatar>
              <span className="text-[0.7rem] text-muted-foreground">@user{i}</span>
            </div>
          </PixelCardContent>
        </PixelCard>
      ))}
    </div>
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────
export function TimelineVertical() {
  const steps = ["Design", "Build", "Ship"];
  return (
    <div className="border-2 border-foreground bg-card p-4 space-y-4">
      {steps.map((s, i) => (
        <div key={s} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 border-2 border-foreground bg-primary" />
            {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-foreground" />}
          </div>
          <div className="pb-2">
            <div className="text-xs uppercase tracking-widest">{s}</div>
            <div className="text-[0.7rem] text-muted-foreground">Step {i + 1} description</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CTA ──────────────────────────────────────────────────────
export function CtaComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <PixelCard className="border-destructive">
        <PixelCardContent className="pt-4">
          <PixelCardTitle className="text-xs text-destructive mb-2">Without 64pixelcn</PixelCardTitle>
          <ul className="text-[0.7rem] space-y-1 text-muted-foreground"><li>✗ Boring UI</li><li>✗ No themes</li></ul>
        </PixelCardContent>
      </PixelCard>
      <PixelCard className="border-primary">
        <PixelCardContent className="pt-4">
          <PixelCardTitle className="text-xs text-primary mb-2">With 64pixelcn</PixelCardTitle>
          <ul className="text-[0.7rem] space-y-1 text-muted-foreground"><li>✓ Pixel perfect</li><li>✓ 5 themes</li></ul>
        </PixelCardContent>
      </PixelCard>
    </div>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────
export function TeamGrid() {
  const team = [
    { name: "Alice", role: "Dev" },
    { name: "Bob", role: "Design" },
    { name: "Carol", role: "PM" },
  ];
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-3">
      {team.map((m) => (
        <PixelCard key={m.name} className="min-w-0">
          <PixelCardContent className="pt-4 px-[0.75em] text-center break-words">
            <PixelAvatar className="mx-auto mb-2 h-12 w-12"><PixelAvatarFallback>{m.name[0]}</PixelAvatarFallback></PixelAvatar>
            <div className="text-xs uppercase tracking-widest">{m.name}</div>
            <div className="text-[0.7rem] text-muted-foreground">{m.role}</div>
          </PixelCardContent>
        </PixelCard>
      ))}
    </div>
  );
}

// ─── ADVANCED ─────────────────────────────────────────────────
export function MetricsDashboard() {
  return (
    <div className="border-2 border-foreground bg-card p-4 space-y-4">
      <div className="font-[family-name:var(--pixel-font)] text-xs uppercase tracking-widest">Dashboard</div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-2">
        <div className="border-2 border-foreground p-2 text-center"><div className="text-lg text-primary">1.2k</div><div className="text-[0.7rem] text-muted-foreground">Users</div></div>
        <div className="border-2 border-foreground p-2 text-center"><div className="text-lg text-primary">98%</div><div className="text-[0.7rem] text-muted-foreground">Uptime</div></div>
        <div className="border-2 border-foreground p-2 text-center"><div className="text-lg text-primary">70</div><div className="text-[0.7rem] text-muted-foreground">Items</div></div>
      </div>
      <PixelProgress value={72} />
    </div>
  );
}

export function Newsletter() {
  return (
    <PixelCard className="max-w-sm mx-auto">
      <PixelCardContent className="pt-4 text-center space-y-3">
        <PixelCardTitle className="text-xs">Subscribe</PixelCardTitle>
        <PixelInput placeholder="you@example.com" />
        <PixelButton className="w-full">Sign Up</PixelButton>
      </PixelCardContent>
    </PixelCard>
  );
}

export function DemoShell() {
  const lines = ["$ npx shadcn init", "✓ Installing...", "✓ Done!"];
  return (
    <div className="border-2 border-foreground bg-muted p-3 font-mono text-xs space-y-1">
      {lines.map((l, i) => <div key={i} className="text-green-400">{l}</div>)}
      <div className="text-muted-foreground">$ <span className="animate-pulse">_</span></div>
    </div>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────────
export function FooterBlock() {
  return (
    <div className="border-2 border-foreground bg-card p-4 grid md:grid-cols-3 gap-4 text-[0.7rem]">
      <div className="font-[family-name:var(--pixel-font)] uppercase tracking-widest">64pixelcn</div>
      <div className="space-y-1"><div className="uppercase tracking-widest text-muted-foreground">Product</div><div>Components</div><div>Blocks</div></div>
      <div className="space-y-1"><div className="uppercase tracking-widest text-muted-foreground">Social</div><div>GitHub</div><div>Docs</div></div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="border-2 border-foreground bg-card p-10 text-center">
      <h2 className="font-[family-name:var(--pixel-font)] text-5xl text-primary mb-3">404</h2>
      <p className="text-xs text-muted-foreground mb-4">Page not found. The pixel is elsewhere.</p>
      <PixelButton variant="outline" size="sm">Go Home</PixelButton>
    </div>
  );
}

// ─── GAME ─────────────────────────────────────────────────────
export function GameHeroXp() {
  return (
    <div className="border-2 border-foreground bg-card p-6 space-y-3">
      <h2 className="font-[family-name:var(--pixel-font)] text-xl uppercase tracking-widest">Player One</h2>
      <PixelHealthBar value={85} showIcon />
      <PixelManaBar value={60} showIcon />
      <PixelXpBar value={45} level={12} showIcon />
    </div>
  );
}

export function GameSkillTree() {
  const skills = [
    { icon: Sword, name: "Attack", level: 3 },
    { icon: Shield, name: "Defense", level: 2 },
    { icon: Flame, name: "Fire", level: 5 },
  ];
  return (
    <div className="border-2 border-foreground bg-card p-4 grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-2">
      {skills.map((s) => (
        <div key={s.name} className="min-w-0 border-2 border-foreground p-2 text-center break-words">
          <s.icon className="h-6 w-6 mx-auto mb-1 text-primary" strokeWidth={2} />
          <div className="text-[0.7rem] uppercase tracking-widest">{s.name}</div>
          <div className="text-[0.7rem] text-muted-foreground">Lv {s.level}</div>
        </div>
      ))}
    </div>
  );
}

export function GamePartyGrid() {
  const party = ["Warrior", "Mage", "Healer", "Rogue"];
  return (
    <div className="border-2 border-foreground bg-card p-4">
      <div className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Party</div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-2">
        {party.map((p) => (
          <div key={p} className="min-w-0 border-2 border-foreground p-2 text-center text-[0.7rem] uppercase break-words">{p}</div>
        ))}
      </div>
    </div>
  );
}

// ─── GAMING CLASSIC ───────────────────────────────────────────
export function GameMainMenu() {
  const items = ["New Game", "Continue", "Options", "Quit"];
  return (
    <div className="border-2 border-foreground bg-card p-6 space-y-2">
      <div className="font-[family-name:var(--pixel-font)] text-lg text-primary mb-3 text-center">PIXEL QUEST</div>
      {items.map((it, i) => (
        <div key={it} className={`text-xs uppercase tracking-widest px-3 py-1.5 border-2 ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-transparent text-muted-foreground"}`}>▶ {it}</div>
      ))}
    </div>
  );
}

export function GameLoadingScreen() {
  return (
    <div className="border-2 border-foreground bg-card p-10 text-center space-y-4">
      <div className="text-xs uppercase tracking-widest">Loading...</div>
      <PixelProgress value={66} />
      <div className="text-[0.7rem] text-muted-foreground">Loading assets 66%</div>
    </div>
  );
}

export function GameOverScreen() {
  return (
    <div className="border-2 border-foreground bg-destructive p-10 text-center">
      <h2 className="font-[family-name:var(--pixel-font)] text-2xl text-destructive-foreground mb-3">GAME OVER</h2>
      <p className="text-xs text-destructive-foreground/80 mb-4">Final Score: 12,450</p>
      <PixelButton variant="outline" size="sm">Retry</PixelButton>
    </div>
  );
}

export function GameVictoryScreen() {
  return (
    <div className="border-2 border-foreground bg-card p-8 text-center space-y-3">
      <Trophy className="h-12 w-12 mx-auto text-primary" strokeWidth={2} />
      <h2 className="font-[family-name:var(--pixel-font)] text-xl text-primary">VICTORY!</h2>
      <div className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">+500 XP · +100 Gold</div>
    </div>
  );
}

export function GameSaveSlots() {
  return (
    <div className="border-2 border-foreground bg-card p-4 space-y-2">
      {["Slot 1", "Slot 2", "Slot 3"].map((s) => (
        <div key={s} className="flex justify-between border-2 border-foreground px-3 py-2 text-xs uppercase tracking-widest">
          <span>{s}</span><span className="text-muted-foreground">Empty</span>
        </div>
      ))}
    </div>
  );
}

export function GameLeaderboard() {
  const entries = [
    { rank: 1, name: "Alice", score: 99900 },
    { rank: 2, name: "Bob", score: 85000 },
    { rank: 3, name: "Carol", score: 72000 },
  ];
  return (
    <div className="border-2 border-foreground bg-card p-4 space-y-1">
      {entries.map((e) => (
        <div key={e.rank} className="flex justify-between border-2 border-foreground px-3 py-1.5 text-[0.7rem] uppercase">
          <span>#{e.rank} {e.name}</span><span className="text-primary">{e.score}</span>
        </div>
      ))}
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────
export function LoginForm() {
  return (
    <PixelCard className="max-w-sm mx-auto">
      <PixelCardContent className="pt-4 space-y-3">
        <PixelCardTitle className="text-xs text-center">Login</PixelCardTitle>
        <PixelInput placeholder="Email" />
        <PixelInput type="password" placeholder="Password" />
        <PixelButton className="w-full">Sign In</PixelButton>
      </PixelCardContent>
    </PixelCard>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────
export function CalendarBlockDemo() {
  return (
    <div className="border-2 border-foreground p-2 inline-block">
      <PixelCalendar mode="single" />
    </div>
  );
}

// ─── CHARTS ───────────────────────────────────────────────────
export function ChartBarDemo() {
  return <div className="border-2 border-foreground bg-card p-3 text-center text-[0.7rem] text-muted-foreground">Bar Chart (see Chart component)</div>;
}
