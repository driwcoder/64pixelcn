import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PixelButton } from "./button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>[0];
type CarouselOptions = UseCarouselParameters;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CarouselPlugin = any;

interface CarouselProps { opts?: CarouselOptions; plugins?: CarouselPlugin; orientation?: "horizontal" | "vertical"; setApi?: (api: CarouselApi) => void; }
type CarouselContextProps = { carouselRef: ReturnType<typeof useEmblaCarousel>[0]; api: ReturnType<typeof useEmblaCarousel>[1]; scrollPrev: () => void; scrollNext: () => void; canScrollPrev: boolean; canScrollNext: boolean; } & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within a <Carousel />");
  return ctx;
}

const PixelCarousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    React.useEffect(() => { if (!api) return; onSelect(api); api.on("reInit", onSelect); api.on("select", onSelect); }, [api, onSelect]);
    React.useEffect(() => { if (api && setApi) setApi(api); }, [api, setApi]);
    return (
      <CarouselContext.Provider value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
        <div ref={ref} data-slot="carousel" className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
PixelCarousel.displayName = "PixelCarousel";

const PixelCarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} data-slot="carousel-content"
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
      </div>
    );
  }
);
PixelCarouselContent.displayName = "PixelCarouselContent";

const PixelCarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div ref={ref} data-slot="carousel-item" role="group" aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)} {...props} />
    );
  }
);
PixelCarouselItem.displayName = "PixelCarouselItem";

const PixelCarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof PixelButton>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <PixelButton ref={ref} data-slot="carousel-previous" variant={variant} size={size}
        className={cn("absolute h-8 w-8", orientation === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
        disabled={!canScrollPrev} onClick={scrollPrev} {...props}>
        <ArrowLeft strokeWidth={3} />
        <span className="sr-only">Previous slide</span>
      </PixelButton>
    );
  }
);
PixelCarouselPrevious.displayName = "PixelCarouselPrevious";

const PixelCarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof PixelButton>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <PixelButton ref={ref} data-slot="carousel-next" variant={variant} size={size}
        className={cn("absolute h-8 w-8", orientation === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
        disabled={!canScrollNext} onClick={scrollNext} {...props}>
        <ArrowRight strokeWidth={3} />
        <span className="sr-only">Next slide</span>
      </PixelButton>
    );
  }
);
PixelCarouselNext.displayName = "PixelCarouselNext";

export { type CarouselApi, PixelCarousel, PixelCarouselContent, PixelCarouselItem, PixelCarouselPrevious, PixelCarouselNext, useCarousel };
