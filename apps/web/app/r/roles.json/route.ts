import { buildRolesItem } from "@/lib/preset-registry";

// GET /r/roles.json -> the role classes every pixelcn component depends on.
export async function GET() {
  return Response.json(buildRolesItem());
}
