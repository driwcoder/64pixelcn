import { buildPresetItem, decodePreset } from "@/lib/preset-registry";

// GET /r/presets/<code>.json -> registry:base item for `shadcn init --preset <url>`.
export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const choice = decodePreset(file.replace(/\.json$/, ""));
  if (!choice) return Response.json({ error: "Unknown preset" }, { status: 404 });
  return Response.json(buildPresetItem(choice, new URL(request.url).origin));
}
