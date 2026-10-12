import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentPage } from "@/components/component-page";
import { componentsMeta, getComponentMeta } from "@/lib/components";

// One static page per component, built at deploy time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return componentsMeta.map((c) => ({ slug: c.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const meta = getComponentMeta((await params).slug);
  return meta ? { title: `${meta.title} — 64pixelcn`, description: meta.description } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getComponentMeta(slug)) notFound();
  return <ComponentPage slug={slug} />;
}
