import * as React from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PixelMessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  onScrollToBottom?: () => void;
}

const PixelMessageScroller = React.forwardRef<HTMLDivElement, PixelMessageScrollerProps>(
  ({ className, children, onScrollToBottom, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [atBottom, setAtBottom] = React.useState(true);

    React.useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      const handleScroll = () => {
        const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
        setAtBottom(distance < 40);
      };
      el.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToBottom = () => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      onScrollToBottom?.();
    };

    return (
      <div className="relative">
        <div
          ref={(node) => {
            scrollRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          data-slot="message-scroller"
          className={cn("flex flex-col gap-4 overflow-y-auto", className)}
          {...props}
        >
          {children}
        </div>
        {!atBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            className={cn(
              "absolute bottom-2 left-1/2 -translate-x-1/2 h-8 w-8",
              "flex items-center justify-center border-2 border-foreground bg-popover shadow-[var(--pixel-shadow)]",
              "hover:bg-accent transition-colors"
            )}
          >
            <ArrowDown className="h-4 w-4" strokeWidth={3} />
          </button>
        )}
      </div>
    );
  }
);
PixelMessageScroller.displayName = "PixelMessageScroller";

export { PixelMessageScroller };
