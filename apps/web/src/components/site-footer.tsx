import Link from "next/link";
import { ICON_SETS, ICON_SET_IDS } from "@/lib/tokens";
import { VERSION } from "@/lib/version";

// Credits are required by the icon licenses (HackerNoon's Pixel Icon Library
// is CC BY 4.0, which asks for attribution wherever the icons are shown).
export function SiteFooter() {
  return (
    <footer className="border-t-[length:var(--pixel-line,2px)] border-foreground px-4 py-6 text-[0.65rem] leading-relaxed text-muted-foreground sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <p className="min-w-0">
          64pixelcn{" "}
          <Link href="/docs/changelog" className="underline underline-offset-4 hover:text-foreground">
            v{VERSION}
          </Link>{" "}
          · built on shadcn/ui and Radix UI · fonts from Google Fonts (SIL OFL)
        </p>
        <ul aria-label="Icon credits" className="min-w-0 space-y-1 md:text-right">
          {ICON_SET_IDS.map((id) => (
            <li key={id}>
              Icons:{" "}
              <a href={ICON_SETS[id].url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
                {ICON_SETS[id].attribution}
              </a>
              {id === "hackernoon" && (
                <>
                  {" "}
                  ·{" "}
                  <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
                    license
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
