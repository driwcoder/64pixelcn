import { buildPresetItem, DEFAULT_CHOICE } from "@/lib/preset-registry";

// GET /r/pixelcn.json -> the default preset (kept for the original install URL).
export async function GET(request: Request) {
  return Response.json(buildPresetItem(DEFAULT_CHOICE, new URL(request.url).origin));
}
