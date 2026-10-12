"use client";

/**
 * Inline <script> that runs during HTML parsing (before first paint).
 * Rendered as text/plain on the client so React doesn't warn about, or try
 * to re-run, a script that already executed.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
