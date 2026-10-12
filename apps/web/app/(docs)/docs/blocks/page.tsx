"use client";

import {
  HeroCentered, HeroSplit, HeroGameTitle,
  FeaturesCardGrid, FeaturesList,
  PricingTiers, FaqAccordion,
  StatsBar, Testimonials, TimelineVertical, CtaComparison,
  TeamGrid, MetricsDashboard, Newsletter, DemoShell,
  FooterBlock, NotFoundPage,
  GameHeroXp, GameSkillTree, GamePartyGrid,
  GameMainMenu, GameLoadingScreen, GameOverScreen, GameVictoryScreen,
  GameSaveSlots, GameLeaderboard, LoginForm, CalendarBlockDemo, ChartBarDemo,
} from "@/components/block-demos";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription } from "@/components/ui/card";

interface BlockDef {
  name: string;
  desc: string;
  Demo: () => React.ReactNode;
}

const CATEGORIES: { title: string; blocks: BlockDef[] }[] = [
  {
    title: "Hero",
    blocks: [
      { name: "Centered", desc: "Centered hero with badges and CTAs", Demo: HeroCentered },
      { name: "Split", desc: "Text left, visual slot right", Demo: HeroSplit },
      { name: "Game Title", desc: "Game-style title screen with stats", Demo: HeroGameTitle },
    ],
  },
  {
    title: "Features",
    blocks: [
      { name: "Card Grid", desc: "Feature cards with icons and badges", Demo: FeaturesCardGrid },
      { name: "List", desc: "Step-by-step feature list", Demo: FeaturesList },
    ],
  },
  {
    title: "Pricing",
    blocks: [
      { name: "Tier Cards", desc: "Side-by-side pricing tiers", Demo: PricingTiers },
    ],
  },
  {
    title: "FAQ",
    blocks: [
      { name: "Accordion", desc: "Collapsible Q and A", Demo: FaqAccordion },
    ],
  },
  {
    title: "Social Proof",
    blocks: [
      { name: "Stats Bar", desc: "Big number stats row", Demo: StatsBar },
      { name: "Testimonials", desc: "Quote cards with avatars", Demo: Testimonials },
    ],
  },
  {
    title: "Timeline",
    blocks: [
      { name: "Vertical", desc: "Steps with connecting line", Demo: TimelineVertical },
    ],
  },
  {
    title: "CTA",
    blocks: [
      { name: "Comparison", desc: "Us vs them table", Demo: CtaComparison },
    ],
  },
  {
    title: "Team",
    blocks: [
      { name: "Team Grid", desc: "Member cards with avatars", Demo: TeamGrid },
    ],
  },
  {
    title: "Advanced",
    blocks: [
      { name: "Metrics Dashboard", desc: "KPI cards with progress bars", Demo: MetricsDashboard },
      { name: "Newsletter", desc: "Email signup card", Demo: Newsletter },
      { name: "Demo Shell", desc: "Fake terminal with commands", Demo: DemoShell },
    ],
  },
  {
    title: "Layout",
    blocks: [
      { name: "Footer", desc: "Page footer with link columns", Demo: FooterBlock },
      { name: "404 Page", desc: "Retro 404 with pixel ogre", Demo: NotFoundPage },
    ],
  },
  {
    title: "Game",
    blocks: [
      { name: "XP Progress Hero", desc: "Hero with health, mana and XP bars", Demo: GameHeroXp },
      { name: "Skill Tree", desc: "Feature grid with skill levels", Demo: GameSkillTree },
      { name: "Party Grid", desc: "Team as party members", Demo: GamePartyGrid },
    ],
  },
  {
    title: "Gaming (Classic)",
    blocks: [
      { name: "Main Menu", desc: "Classic game main menu", Demo: GameMainMenu },
      { name: "Loading Screen", desc: "Retro loading with progress", Demo: GameLoadingScreen },
      { name: "Game Over", desc: "Game over with retry", Demo: GameOverScreen },
      { name: "Victory Screen", desc: "Post-battle rewards", Demo: GameVictoryScreen },
      { name: "Save Slots", desc: "Save/load interface", Demo: GameSaveSlots },
      { name: "Leaderboard", desc: "Top scores ranking", Demo: GameLeaderboard },
    ],
  },
  {
    title: "Authentication",
    blocks: [
      { name: "Login Form", desc: "Email and password login", Demo: LoginForm },
    ],
  },
  {
    title: "Calendar",
    blocks: [
      { name: "Calendar Block", desc: "Basic date selection", Demo: CalendarBlockDemo },
    ],
  },
  {
    title: "Charts",
    blocks: [
      { name: "Bar Chart", desc: "Simple bar chart", Demo: ChartBarDemo },
    ],
  },
];

export default function BlocksPage() {
  const total = CATEGORIES.reduce((a, c) => a + c.blocks.length, 0);

  return (
    <div className="px-6 py-8 pb-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest mb-2">Blocks</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Pre-built, ready-to-use block templates for your retro projects. {total} blocks across {CATEGORIES.length} categories.
        </p>

        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="mb-12">
            <h2 className="font-[family-name:var(--pixel-font)] text-sm uppercase tracking-widest text-primary mb-4">
              {cat.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.blocks.map((b) => (
                <PixelCard key={b.name}>
                  <PixelCardHeader>
                    <PixelCardTitle className="text-xs">{b.name}</PixelCardTitle>
                    <PixelCardDescription className="text-[10px]">{b.desc}</PixelCardDescription>
                  </PixelCardHeader>
                  <PixelCardContent>
                    <div className="pixel-demo border-2 border-dashed border-border p-[0.75em] overflow-hidden">
                      <b.Demo />
                    </div>
                  </PixelCardContent>
                </PixelCard>
              ))}
            </div>
          </section>
        ))}

        <footer className="border-t-2 border-border pt-6 text-center text-[10px] text-muted-foreground">
          64pixelcn ·{" "}
          <a href="https://pixelcn.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            pixelcn.vercel.app
          </a>
        </footer>
      </div>
    </div>
  );
}
