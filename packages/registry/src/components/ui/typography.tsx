import { cn } from "@/lib/utils";

function PixelTypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 data-slot="typography-h1" className={cn("scroll-m-20 text-2xl font-[family-name:var(--pixel-font)] uppercase tracking-widest", className)} {...props} />;
}

function PixelTypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="typography-h2" className={cn("scroll-m-20 text-xl font-[family-name:var(--pixel-font)] uppercase tracking-widest", className)} {...props} />;
}

function PixelTypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="typography-h3" className={cn("scroll-m-20 text-lg font-[family-name:var(--pixel-font)] uppercase tracking-widest", className)} {...props} />;
}

function PixelTypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 data-slot="typography-h4" className={cn("scroll-m-20 text-base font-[family-name:var(--pixel-font)] uppercase tracking-widest", className)} {...props} />;
}

function PixelTypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="typography-p" className={cn("leading-relaxed [&:not(:first-child)]:mt-4 font-[family-name:var(--pixel-font)] text-xs", className)} {...props} />;
}

function PixelTypographyBlockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote data-slot="typography-blockquote" className={cn("mt-6 border-l-4 border-foreground pl-6 italic", className)} {...props} />
  );
}

function PixelTypographyList({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="typography-list" className={cn("my-4 ml-6 list-disc [&>li]:mt-2 text-xs", className)} {...props} />;
}

function PixelTypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="typography-lead" className={cn("text-sm text-muted-foreground font-[family-name:var(--pixel-font)]", className)} {...props} />;
}

function PixelTypographyLarge({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="typography-large" className={cn("text-base font-[family-name:var(--pixel-font)] uppercase tracking-widest", className)} {...props} />;
}

function PixelTypographySmall({ className, ...props }: React.ComponentProps<"small">) {
  return <small data-slot="typography-small" className={cn("text-[10px] font-[family-name:var(--pixel-font)] leading-none", className)} {...props} />;
}

function PixelTypographyMuted({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="typography-muted" className={cn("text-xs text-muted-foreground font-[family-name:var(--pixel-font)]", className)} {...props} />;
}

function PixelTypographyInlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code data-slot="typography-inline-code" className={cn("relative border-2 border-foreground bg-muted px-[0.3rem] py-[0.2rem] text-[10px] font-mono", className)} {...props} />
  );
}

export {
  PixelTypographyH1, PixelTypographyH2, PixelTypographyH3, PixelTypographyH4,
  PixelTypographyP, PixelTypographyBlockquote, PixelTypographyList, PixelTypographyLead,
  PixelTypographyLarge, PixelTypographySmall, PixelTypographyMuted, PixelTypographyInlineCode,
};
