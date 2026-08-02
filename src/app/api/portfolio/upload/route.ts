import { NextRequest, NextResponse } from "next/server";
import { ensureFolder, uploadFile, deleteFile } from "@/lib/yandex";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FOLDER = process.env.YANDEX_DISK_PORTFOLIO_PATH || "/portfolio-uploads";
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

function checkPassword(password: string) {
  const expected = process.env.ADMIN_UPLOAD_PASSWORD;
  return !!expected && password === expected;
}

function safeName(original: string) {
  const cleaned = original
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "_")
    .slice(-80);
  return `${Date.now()}-${cleaned}`;
}

export async function POST(req: NextRequest) {
  try {
    const token = process.env.YANDEX_DISK_TOKEN;
    if (!token) {
      return NextResponse.json({ ok: false, error: "Сервис недоступен." }, { status: 500 });
    }

    const form = await req.formData();
    const password = String(form.get("password") || "");
    const file = form.get("file") as File | null;

    if (!checkPassword(password)) {
      return NextResponse.json({ ok: false, error: "Неверный пароль." }, { status: 401 });
    }
    if (!file) {
      return NextResponse.json({ ok: false, error: "Файл не выбран." }, { status: 400 });
    }
    if (!IMAGE_EXT.test(file.name)) {
      return NextResponse.json(
        { ok: false, error: "Разрешены только JPG, PNG, WEBP." },
        { status: 400 }
      );
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Файл больше 10 МБ." }, { status: 400 });
    }

    await ensureFolder(token, FOLDER);
    const name = safeName(file.name);
    const buf = Buffer.from(await file.arrayBuffer());
    await uploadFile(token, `${FOLDER}/${name}`, buf, file.type || "application/octet-stream");

    return NextResponse.json({ ok: true, name });
  } catch (err) {
    console.error("Portfolio upload error:", err);
    return NextResponse.json({ ok: false, error: "Не удалось загрузить фото." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = process.env.YANDEX_DISK_TOKEN;
    if (!token) {
      return NextResponse.json({ ok: false, error: "Сервис недоступен." }, { status: 500 });
    }
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password") || "";
    const name = searchParams.get("name") || "";

    if (!checkPassword(password)) {
      return NextResponse.json({ ok: false, error: "Неверный пароль." }, { status: 401 });
    }
    if (!name) {
      return NextResponse.json({ ok: false, error: "Не указан файл." }, { status: 400 });
    }

    await deleteFile(token, `${FOLDER}/${name}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Portfolio delete error:", err);
    return NextResponse.json({ ok: false, error: "Не удалось удалить фото." }, { status: 500 });
  }
}
