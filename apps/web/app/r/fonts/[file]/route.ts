import { FONT_IDS, type PixelFont } from "@/lib/tokens";
import { buildFontItem } from "@/lib/preset-registry";

// GET /r/fonts/<font>.json -> registry:font item (Google font via next/font).
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const font = file.replace(/\.json$/, "") as PixelFont;
  const item = FONT_IDS.includes(font) ? buildFontItem(font) : null;
  if (!item) return Response.json({ error: "Unknown font" }, { status: 404 });
  return Response.json(item);
}
