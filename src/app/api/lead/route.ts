import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DISK_PATH = process.env.YANDEX_DISK_LEADS_PATH || "/leads.xlsx";
const API_BASE = "https://cloud-api.yandex.net/v1/disk/resources";

const HEADERS = ["Дата", "Имя", "Телефон", "Тип работ", "Комментарий"];

function authHeaders(token) {
  return { Authorization: `OAuth ${token}` };
}

async function downloadExistingWorkbook(token) {
  const linkRes = await fetch(
    `${API_BASE}/download?path=${encodeURIComponent(DISK_PATH)}`,
    { headers: authHeaders(token) }
  );

  if (linkRes.status === 404) return null;
  if (!linkRes.ok) {
    throw new Error(`Yandex Disk download-link error: ${linkRes.status}`);
  }

  const { href } = await linkRes.json();
  const fileRes = await fetch(href);
  if (!fileRes.ok) throw new Error(`Yandex Disk file fetch error: ${fileRes.status}`);

  const buf = await fileRes.arrayBuffer();
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf);
  return wb;
}

function createWorkbook() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Заявки");
  ws.columns = [
    { header: HEADERS[0], key: "date", width: 18 },
    { header: HEADERS[1], key: "name", width: 22 },
    { header: HEADERS[2], key: "phone", width: 18 },
    { header: HEADERS[3], key: "service", width: 28 },
    { header: HEADERS[4], key: "message", width: 40 },
  ];
  ws.getRow(1).font = { bold: true };
  return wb;
}

async function uploadWorkbook(token, wb) {
  const uploadLinkRes = await fetch(
    `${API_BASE}/upload?path=${encodeURIComponent(DISK_PATH)}&overwrite=true`,
    { headers: authHeaders(token) }
  );
  if (!uploadLinkRes.ok) {
    throw new Error(`Yandex Disk upload-link error: ${uploadLinkRes.status}`);
  }
  const { href, method } = await uploadLinkRes.json();

  const buffer = await wb.xlsx.writeBuffer();

  const putRes = await fetch(href, {
    method: method || "PUT",
    body: buffer,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });

  if (!putRes.ok && putRes.status !== 201 && putRes.status !== 202) {
    throw new Error(`Yandex Disk upload error: ${putRes.status}`);
  }
}

export async function POST(req) {
  try {
    const token = process.env.YANDEX_DISK_TOKEN;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Сервис временно недоступен. Позвоните нам напрямую." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Укажите имя и телефон." },
        { status: 400 }
      );
    }

    let wb = await downloadExistingWorkbook(token);
    if (!wb) wb = createWorkbook();

    let ws = wb.getWorksheet("Заявки");
    if (!ws) {
      ws = wb.addWorksheet("Заявки");
      ws.addRow(HEADERS);
      ws.getRow(1).font = { bold: true };
    }

    const now = new Date();
    const dateStr = now.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    ws.addRow([dateStr, name, phone, service, message]);

    await uploadWorkbook(token, wb);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Попробуйте позвонить нам." },
      { status: 500 }
    );
  }
}
