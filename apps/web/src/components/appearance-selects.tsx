"use client";

import * as React from "react";
import { PixelSelect, PixelSelectContent, PixelSelectItem, PixelSelectTrigger, PixelSelectValue } from "@/components/ui/select";
import {
  APPEARANCE_VALUES,
  FONTS,
  ICON_SETS,
  MODES,
  THEMES,
  RADII,
  SHADINGS,
  TEXT_SCALES,
  type Appearance,
  type FontSpec,
} from "@/lib/tokens";

type Field = keyof Appearance;

/** Label of every option, plus an optional visual hint shown in the list. */
const FIELD_META: { [K in Field]: { label: string; option: (v: Appearance[K]) => { label: string; hint?: React.ReactNode } } } = {
  theme: {
    label: "Theme",
    option: (v) => ({
      label: THEMES[v].label,
      hint: <span aria-hidden className="inline-block h-3 w-3 shrink-0 border-[length:var(--pixel-line,2px)] border-current" style={{ backgroundColor: THEMES[v].swatch }} />,
    }),
  },
  mode: { label: "Mode", option: (v) => ({ label: MODES[v].label }) },
  font: {
    label: "Font",
    option: (v) => {
      const spec: FontSpec = FONTS[v];
      // Sample in the font itself, so fonts can be compared before picking.
      const family = spec.cssVar ? `var(${spec.cssVar})` : spec.fallback;
      return { label: spec.label, hint: <span aria-hidden className="text-sm normal-case tracking-normal" style={{ fontFamily: family }}>Aa</span> };
    },
  },
  size: { label: "Pixel size", option: (v) => ({ label: `${v}x` }) },
  textScale: { label: "Text size", option: (v) => ({ label: TEXT_SCALES[v].label }) },
  icons: { label: "Icons", option: (v) => ({ label: ICON_SETS[v].label }) },
  radius: { label: "Corners", option: (v) => ({ label: RADII[v].label, hint: <CornerHint steps={RADII[v].steps} /> }) },
  shading: { label: "Shading", option: (v) => ({ label: SHADINGS[v].label }) },
};

/** Order of the selects, matching ui.shadcn.com/create's sidebar grouping. */
export const APPEARANCE_FIELDS: Field[] = ["theme", "mode", "font", "textScale", "icons", "size", "radius", "shading"];

/** Tiny pixel drawing of a stepped corner. */
function CornerHint({ steps }: { steps: number }) {
  const n = 5;
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const cut = x + y < steps;
      const edge = !cut && (x === 0 || y === 0 || x + y === steps);
      if (edge) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
    }
  }
  return (
    <svg aria-hidden viewBox={`0 0 ${n} ${n}`} className="h-3 w-3 shrink-0" fill="currentColor" shapeRendering="crispEdges">
      {cells}
    </svg>
  );
}

export function AppearanceSelect<K extends Field>({
  field,
  value,
  onChange,
  id,
}: {
  field: K;
  value: Appearance[K];
  onChange: (v: Appearance[K]) => void;
  id?: string;
}) {
  const meta = FIELD_META[field];
  const values = APPEARANCE_VALUES[field] as readonly Appearance[K][];
  const current = meta.option(value);
  const selectId = id ?? `appearance-${field}`;
  return (
    <div className="min-w-0 space-y-1">
      <label htmlFor={selectId} className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        {meta.label}
      </label>
      <PixelSelect
        value={String(value)}
        // Options are matched by their string form (pixel sizes are numbers).
        onValueChange={(v) => onChange(values.find((o) => String(o) === v) as Appearance[K])}
      >
        <PixelSelectTrigger id={selectId} className="h-auto min-h-10 gap-2 text-left text-[0.7rem] uppercase tracking-widest">
          <PixelSelectValue aria-label={current.label}>
            <span className="flex min-w-0 items-center gap-2">
              {current.hint}
              <span className="min-w-0 truncate">{current.label}</span>
            </span>
          </PixelSelectValue>
        </PixelSelectTrigger>
        <PixelSelectContent>
          {values.map((v) => {
            const o = meta.option(v);
            return (
              <PixelSelectItem key={String(v)} value={String(v)} className="text-[0.7rem] uppercase tracking-widest">
                <span className="flex min-w-0 items-center gap-2">
                  {o.hint}
                  <span className="min-w-0">{o.label}</span>
                </span>
              </PixelSelectItem>
            );
          })}
        </PixelSelectContent>
      </PixelSelect>
    </div>
  );
}

/** One select per Appearance field. */
export function AppearanceSelects({
  value,
  onChange,
  idPrefix = "appearance",
  fields = APPEARANCE_FIELDS,
}: {
  value: Appearance;
  onChange: (patch: Partial<Appearance>) => void;
  idPrefix?: string;
  fields?: Field[];
}) {
  return (
    <>
      {fields.map((f) => (
        <AppearanceSelect
          key={f}
          id={`${idPrefix}-${f}`}
          field={f}
          value={value[f]}
          onChange={(v) => onChange({ [f]: v } as Partial<Appearance>)}
        />
      ))}
    </>
  );
}
