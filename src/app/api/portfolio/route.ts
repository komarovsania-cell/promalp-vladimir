import { NextResponse } from "next/server";
import { listFolder } from "@/lib/yandex";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FOLDER = process.env.YANDEX_DISK_PORTFOLIO_PATH || "/portfolio-uploads";
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

export async function GET() {
  try {
    const token = process.env.YANDEX_DISK_TOKEN;
    if (!token) {
      return NextResponse.json({ items: [] });
    }
    const items = await listFolder(token, FOLDER);
    const images = items
      .filter((it) => IMAGE_EXT.test(it.name))
      .map((it) => ({
        name: it.name,
        src: `/api/portfolio/image/${encodeURIComponent(it.name)}`,
      }));
    return NextResponse.json({ items: images });
  } catch (err) {
    console.error("Portfolio list error:", err);
    return NextResponse.json({ items: [] });
  }
}
