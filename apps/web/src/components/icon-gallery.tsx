"use client";

import * as Icons from "@/components/ui/icons";
import { useIconSet } from "@/components/ui/icons";
import { ICON_SETS } from "@/lib/tokens";

const NAMES = Object.keys(Icons).filter((k) => /^[A-Z]/.test(k) && k !== "ICON_SETS");

/** Every UI icon in the active icon set (switch it in the Display menu). */
export function IconGallery() {
  const set = useIconSet();
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Showing <span className="text-foreground">{ICON_SETS[set].label}</span>. Change the set in the Display menu or in Create.{" "}
        <a className="text-primary underline underline-offset-4" href={ICON_SETS[set].url} target="_blank" rel="noopener noreferrer">
          {ICON_SETS[set].attribution}
        </a>
      </p>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-2">
        {NAMES.map((name) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
          return (
            <li key={name} className="flex min-w-0 flex-col items-center gap-2 border-[length:var(--pixel-line,2px)] border-border p-3 text-center">
              <Icon className="h-6 w-6" />
              <span className="max-w-full text-[0.6rem] wrap-anywhere text-muted-foreground">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
