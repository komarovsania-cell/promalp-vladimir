"use client";

import { useEffect, useRef, useState } from "react";

type Item = { name: string; src: string };

export default function AdminPortfolioPage() {
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("promalp_admin_pw");
    if (saved) setPassword(saved);
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      // ignore
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const files = fileRef.current?.files;
    if (!files || files.length === 0) {
      setStatus("Выберите хотя бы одно фото.");
      return;
    }
    window.localStorage.setItem("promalp_admin_pw", password);
    setBusy(true);
    let okCount = 0;
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("password", password);
      form.append("file", file);
      try {
        const res = await fetch("/api/portfolio/upload", { method: "POST", body: form });
        const data = await res.json();
        if (data.ok) okCount++;
        else setStatus(data.error || "Ошибка загрузки");
      } catch {
        setStatus("Ошибка сети при загрузке.");
      }
    }
    setBusy(false);
    if (okCount > 0) {
      setStatus(`Загружено фото: ${okCount} из ${files.length}.`);
      if (fileRef.current) fileRef.current.value = "";
      loadItems();
    }
  }

  async function handleDelete(name: string) {
    if (!confirm("Удалить это фото из портфолио?")) return;
    setBusy(true);
    try {
      const res = await fetch(
        `/api/portfolio/upload?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.ok) {
        setItems((prev) => prev.filter((it) => it.name !== name));
      } else {
        setStatus(data.error || "Не удалось удалить.");
      }
    } catch {
      setStatus("Ошибка сети при удалении.");
    }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-paper mb-2">
          Управление портфолио
        </h1>
        <p className="text-paper-muted text-sm mb-10">
          Загрузите фото ваших объектов — они сразу появятся на сайте в разделе «Портфолио».
        </p>

        <form
          onSubmit={handleUpload}
          className="rounded-2xl border border-ink-border bg-ink-surface/40 p-6 mb-12 space-y-5"
        >
          <div>
            <label className="block text-sm text-paper-muted mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-ink border border-ink-border px-4 py-2.5 text-paper text-sm outline-none focus:border-gold/50"
              placeholder="Введите пароль"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-paper-muted mb-2">Фото (JPG, PNG, WEBP, до 10 МБ)</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="w-full text-sm text-paper-muted file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-ink file:text-sm file:font-semibold"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="btn-primary rounded-full px-6 py-3 text-ink text-sm font-semibold bg-gold disabled:opacity-50"
          >
            {busy ? "Загрузка..." : "Загрузить"}
          </button>
          {status && <p className="text-sm text-paper-muted">{status}</p>}
        </form>

        <h2 className="font-display text-lg text-paper mb-4">Загруженные фото ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-paper-muted text-sm">Пока нет загруженных фото.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((it) => (
              <div key={it.name} className="relative rounded-xl overflow-hidden border border-ink-border group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt="" className="w-full h-32 object-cover" />
                <button
                  onClick={() => handleDelete(it.name)}
                  disabled={busy}
                  className="absolute top-2 right-2 rounded-full bg-ink/80 text-paper text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
