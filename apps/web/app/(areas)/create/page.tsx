import { Suspense } from "react";
import type { Metadata } from "next";
import { PresetBuilder } from "@/components/preset-builder";

export const metadata: Metadata = {
  title: "Create — 64pixelcn",
  description: "Build a pixelcn preset and get a command that scaffolds your project with it.",
};

export default function CreatePage() {
  // The builder reads ?preset=&font=... (useSearchParams) so it renders on the
  // client under a Suspense boundary.
  return (
    <Suspense>
      <PresetBuilder />
    </Suspense>
  );
}
