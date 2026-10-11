"use client";

import { PixelButton } from "@/components/ui/button";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardFooter } from "@/components/ui/card";
import { PixelInput } from "@/components/ui/input";
import { PixelBadge } from "@/components/ui/badge";
import { PixelCheckbox } from "@/components/ui/checkbox";
import { PixelSwitch } from "@/components/ui/switch";
import { PixelAlert, PixelAlertTitle, PixelAlertDescription } from "@/components/ui/alert";
import { PixelTabs, PixelTabsContent, PixelTabsList, PixelTabsTrigger } from "@/components/ui/tabs";
import { PixelProgress } from "@/components/ui/progress";
import { PixelDialog, PixelDialogContent, PixelDialogDescription, PixelDialogHeader, PixelDialogTitle, PixelDialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function DocsPage() {
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [progress] = useState(65);

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest mb-2">Components</h1>
          <p className="text-sm text-muted-foreground">Pixel art versions of shadcn/ui components.</p>
        </div>

        {/* Buttons */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Button</PixelCardTitle></PixelCardHeader>
          <PixelCardContent className="flex flex-wrap gap-3">
            <PixelButton>Default</PixelButton>
            <PixelButton variant="secondary">Secondary</PixelButton>
            <PixelButton variant="destructive">Destructive</PixelButton>
            <PixelButton variant="outline">Outline</PixelButton>
            <PixelButton variant="ghost">Ghost</PixelButton>
            <PixelButton size="sm">Small</PixelButton>
            <PixelButton size="lg">Large</PixelButton>
            <PixelButton size="icon">★</PixelButton>
          </PixelCardContent>
        </PixelCard>

        {/* Badge */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Badge</PixelCardTitle></PixelCardHeader>
          <PixelCardContent className="flex flex-wrap gap-2">
            <PixelBadge>Default</PixelBadge>
            <PixelBadge variant="secondary">Secondary</PixelBadge>
            <PixelBadge variant="destructive">Error</PixelBadge>
            <PixelBadge variant="outline">Outline</PixelBadge>
            <PixelBadge variant="muted">Muted</PixelBadge>
          </PixelCardContent>
        </PixelCard>

        {/* Input */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Input</PixelCardTitle></PixelCardHeader>
          <PixelCardContent className="space-y-3 max-w-md">
            <PixelInput placeholder="Type something..." />
            <PixelInput placeholder="Disabled" disabled />
          </PixelCardContent>
        </PixelCard>

        {/* Checkbox & Switch */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Selection</PixelCardTitle></PixelCardHeader>
          <PixelCardContent className="space-y-4">
            <label className="flex items-center gap-3 text-xs">
              <PixelCheckbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
              Accept terms
            </label>
            <label className="flex items-center gap-3 text-xs">
              <PixelSwitch checked={switched} onCheckedChange={setSwitched} />
              Enable notifications
            </label>
          </PixelCardContent>
        </PixelCard>

        {/* Alert */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Alert</PixelCardTitle></PixelCardHeader>
          <PixelCardContent className="space-y-3">
            <PixelAlert>
              <PixelAlertTitle>Heads up!</PixelAlertTitle>
              <PixelAlertDescription>This is a default pixel alert.</PixelAlertDescription>
            </PixelAlert>
            <PixelAlert variant="destructive">
              <PixelAlertTitle>Error</PixelAlertTitle>
              <PixelAlertDescription>Something went wrong.</PixelAlertDescription>
            </PixelAlert>
            <PixelAlert variant="success">
              <PixelAlertTitle>Success</PixelAlertTitle>
              <PixelAlertDescription>Operation completed.</PixelAlertDescription>
            </PixelAlert>
          </PixelCardContent>
        </PixelCard>

        {/* Tabs */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Tabs</PixelCardTitle></PixelCardHeader>
          <PixelCardContent>
            <PixelTabs defaultValue="overview">
              <PixelTabsList>
                <PixelTabsTrigger value="overview">Overview</PixelTabsTrigger>
                <PixelTabsTrigger value="analytics">Analytics</PixelTabsTrigger>
                <PixelTabsTrigger value="settings">Settings</PixelTabsTrigger>
              </PixelTabsList>
              <PixelTabsContent value="overview" className="text-xs">Overview content here.</PixelTabsContent>
              <PixelTabsContent value="analytics" className="text-xs">Analytics content here.</PixelTabsContent>
              <PixelTabsContent value="settings" className="text-xs">Settings content here.</PixelTabsContent>
            </PixelTabs>
          </PixelCardContent>
        </PixelCard>

        {/* Progress */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Progress</PixelCardTitle></PixelCardHeader>
          <PixelCardContent className="space-y-3">
            <PixelProgress value={progress} />
            <p className="text-xs text-muted-foreground">{progress}% complete</p>
          </PixelCardContent>
        </PixelCard>

        {/* Dialog */}
        <PixelCard>
          <PixelCardHeader><PixelCardTitle>Dialog</PixelCardTitle></PixelCardHeader>
          <PixelCardContent>
            <PixelDialog>
              <PixelDialogTrigger asChild>
                <PixelButton variant="outline">Open Dialog</PixelButton>
              </PixelDialogTrigger>
              <PixelDialogContent>
                <PixelDialogHeader>
                  <PixelDialogTitle>Pixel Dialog</PixelDialogTitle>
                  <PixelDialogDescription>A retro styled modal dialog.</PixelDialogDescription>
                </PixelDialogHeader>
                <div className="mt-4 text-xs">Dialog content goes here.</div>
              </PixelDialogContent>
            </PixelDialog>
          </PixelCardContent>
        </PixelCard>
      </div>
    </main>
  );
}
