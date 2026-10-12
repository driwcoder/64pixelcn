import { PixelSkeleton } from "@/components/ui/skeleton";

// Instant fallback while a component page loads, mirroring its layout so
// nothing jumps when the real content arrives.
export default function Loading() {
  return (
    <div className="px-4 pt-4 pb-24 sm:px-6" aria-busy="true" aria-label="Loading component">
      <div className="mx-auto max-w-3xl">
        <PixelSkeleton className="mb-6 h-8 w-full" />
        <PixelSkeleton className="mb-2 h-7 w-48" />
        <PixelSkeleton className="mb-6 h-4 w-72 max-w-full" />
        <PixelSkeleton className="mb-6 h-72 w-full" />
        <PixelSkeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
