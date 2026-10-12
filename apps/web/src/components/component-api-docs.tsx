import api from "@/lib/component-api.json";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";

interface Prop {
  owner: string;
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  description: string;
}
interface ComponentApi {
  exports: string[];
  props: Prop[];
  variants: { name: string; options: string[]; default: string | null }[];
  slots: string[];
  accessibility: string[];
}

const API = api as Record<string, ComponentApi>;

const th = "border-b-2 border-border px-2 py-1.5 text-left font-normal uppercase tracking-widest text-muted-foreground";
const td = "border-b-2 border-border px-2 py-1.5 align-top wrap-anywhere";

/** API reference + accessibility notes, generated from the component source (scripts/component-api.mjs). */
export function ComponentApiDocs({ name }: { name: string }) {
  const doc = API[name];
  if (!doc) return null;
  return (
    <div data-api-docs>
      <PixelCard className="mb-6">
        <PixelCardHeader>
          <PixelCardTitle className="text-xs">API Reference</PixelCardTitle>
        </PixelCardHeader>
        <PixelCardContent className="space-y-5 text-[0.7rem] leading-relaxed">
          <div>
            <h3 className="mb-2 uppercase tracking-widest text-muted-foreground">Exports</h3>
            <p className="flex flex-wrap gap-1.5">
              {doc.exports.map((e) => (
                <code key={e} className="max-w-full border-2 border-border bg-muted px-1.5 py-0.5 font-mono wrap-anywhere">{e}</code>
              ))}
            </p>
            <p className="mt-2 text-muted-foreground">
              Every part also accepts the props of the element or Radix primitive it renders, plus <code className="font-mono">className</code>.
            </p>
          </div>

          {doc.variants.length > 0 && (
            <div className="overflow-x-auto">
              <h3 className="mb-2 uppercase tracking-widest text-muted-foreground">Variants</h3>
              <table className="w-full min-w-[20rem] border-collapse">
                <thead>
                  <tr><th className={th}>Prop</th><th className={th}>Options</th><th className={th}>Default</th></tr>
                </thead>
                <tbody>
                  {doc.variants.map((v) => (
                    <tr key={v.name}>
                      <td className={td}><code className="font-mono">{v.name}</code></td>
                      <td className={td}>{v.options.map((o) => <code key={o} className="mr-1.5 inline-block font-mono">{o}</code>)}</td>
                      <td className={td}><code className="font-mono">{v.default ?? "-"}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {doc.props.length > 0 && (
            <div className="overflow-x-auto">
              <h3 className="mb-2 uppercase tracking-widest text-muted-foreground">Props</h3>
              <table className="w-full min-w-[24rem] border-collapse">
                <thead>
                  <tr><th className={th}>Prop</th><th className={th}>Type</th><th className={th}>Default</th></tr>
                </thead>
                <tbody>
                  {doc.props.map((p) => (
                    <tr key={`${p.owner}.${p.name}`}>
                      <td className={td}>
                        <code className="font-mono">{p.name}{p.required ? "" : "?"}</code>
                        {p.description && <div className="mt-1 text-muted-foreground">{p.description}</div>}
                      </td>
                      <td className={td}><code className="font-mono">{p.type}</code></td>
                      <td className={td}><code className="font-mono">{p.default ?? "-"}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {doc.slots.length > 0 && (
            <div>
              <h3 className="mb-2 uppercase tracking-widest text-muted-foreground">Styling hooks</h3>
              <p className="text-muted-foreground">
                Parts carry <code className="font-mono">data-slot</code>:{" "}
                {doc.slots.map((s) => <code key={s} className="mr-1.5 inline-block font-mono text-foreground">{s}</code>)}
              </p>
            </div>
          )}
        </PixelCardContent>
      </PixelCard>

      {doc.accessibility.length > 0 && (
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Accessibility</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <ul className="list-disc space-y-2 pl-5 text-[0.7rem] leading-relaxed">
              {doc.accessibility.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </PixelCardContent>
        </PixelCard>
      )}
    </div>
  );
}
