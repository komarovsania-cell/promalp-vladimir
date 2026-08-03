"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { Icon } from "./IconMap";
import { IconArrowRight, IconRuble } from "./icons";
import { calculatorCategories } from "@/data/calculator";

type Line = {
  key: string;
  categoryId: string;
  itemId: string;
  qty: number;
};

function formatRub(n: number) {
  return Math.round(n).toLocaleString("ru-RU") + " ₽";
}

export default function Calculator() {
  const [active, setActive] = useState(calculatorCategories[0].id);
  const category = calculatorCategories.find((c) => c.id === active)!;
  const [itemId, setItemId] = useState(category.items[0].id);
  const [qty, setQty] = useState(1);
  const [lines, setLines] = useState<Line[]>([]);

  const activeItem = category.items.find((i) => i.id === itemId) ?? category.items[0];

  function handleCategoryChange(id: string) {
    setActive(id);
    const cat = calculatorCategories.find((c) => c.id === id)!;
    setItemId(cat.items[0].id);
    setQty(1);
  }

  function addLine() {
    if (!qty || qty <= 0) return;
    setLines((prev) => [...prev, { key: `${Date.now()}-${itemId}`, categoryId: active, itemId, qty }]);
  }

  function removeLine(key: string) {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }

  const lineDetails = useMemo(
    () =>
      lines.map((l) => {
        const cat = calculatorCategories.find((c) => c.id === l.categoryId)!;
        const item = cat.items.find((i) => i.id === l.itemId)!;
        return { ...l, cat, item, sum: item.price * l.qty };
      }),
    [lines]
  );

  const total = lineDetails.reduce((acc, l) => acc + l.sum, 0);
  const previewSum = activeItem.price * (qty || 0);

  return (
    <section id="calculator" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Онлайн-калькулятор
            </Reveal>
            <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight">
              Рассчитайте стоимость сами
            </Reveal>
          </div>
          <Reveal as="p" delay={0.1} className="text-sm text-paper-muted max-w-sm">
            Предварительный расчёт по ценам для Владимира. Точная стоимость — после
            бесплатного осмотра объекта нашим специалистом.
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <Reveal className="rounded-2xl border border-ink-border bg-ink-surface/40 p-6 md:p-8">
            <div className="flex flex-wrap gap-2.5 mb-8">
              {calculatorCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategoryChange(c.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-all border ${
                    active === c.id
                      ? "bg-gold text-ink border-gold font-semibold"
                      : "border-ink-border text-paper-muted hover:border-gold/40 hover:text-paper"
                  }`}
                >
                  <Icon name={c.icon} className="w-4 h-4" />
                  {c.title}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mb-4">
              <label className="block">
                <span className="block text-xs uppercase tracking-wide text-paper-muted mb-2">Вид работ</span>
                <select
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className="w-full rounded-xl border border-ink-border bg-ink px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold/60"
                >
                  {category.items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} — {i.price.toLocaleString("ru-RU")} ₽/{i.unit}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-xs uppercase tracking-wide text-paper-muted mb-2">
                  Кол-во, {activeItem.unit}
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  value={qty}
                  onChange={(e) => setQty(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-ink-border bg-ink px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold/60"
                />
              </label>
            </div>

            <p className="text-xs text-paper-muted mb-6">
              Минимальная сумма заказа по разделу «{category.title}» — от{" "}
              {category.minOrder.toLocaleString("ru-RU")} ₽.
            </p>

            <div className="flex items-center justify-between gap-4 flex-wrap rounded-xl bg-ink border border-ink-border px-5 py-4">
              <span className="text-sm text-paper-muted">
                {activeItem.name}, {qty || 0} {activeItem.unit}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-display font-semibold text-gold text-lg">
                  ≈ {formatRub(Math.max(previewSum, 0))}
                </span>
                <button
                  onClick={addLine}
                  className="btn-primary rounded-full bg-gold text-ink text-sm font-semibold px-5 py-2.5"
                >
                  Добавить
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-ink-border bg-ink-surface/40 p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <IconRuble className="w-5 h-5 text-gold" />
              <h3 className="font-display font-semibold text-paper text-lg">Ваш расчёт</h3>
            </div>

            {lineDetails.length === 0 ? (
              <p className="text-sm text-paper-muted flex-1">
                Добавьте виды работ слева, чтобы собрать предварительную смету.
              </p>
            ) : (
              <RevealGroup className="flex flex-col gap-3 mb-6 flex-1" stagger={0.04}>
                {lineDetails.map((l) => (
                  <div key={l.key} className="flex items-start justify-between gap-3 text-sm border-b border-ink-border pb-3">
                    <div>
                      <p className="text-paper leading-snug">{l.item.name}</p>
                      <p className="text-paper-muted text-xs mt-1">
                        {l.qty} {l.item.unit} × {l.item.price.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-display font-semibold text-gold">{formatRub(l.sum)}</span>
                      <button
                        onClick={() => removeLine(l.key)}
                        aria-label="Удалить"
                        className="text-paper-muted hover:text-paper text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </RevealGroup>
            )}

            <div className="flex items-center justify-between border-t border-ink-border pt-5 mb-6">
              <span className="text-paper font-medium">Итого (предварительно)</span>
              <span className="font-display font-bold text-gold text-2xl">{formatRub(total)}</span>
            </div>

            <a
              href="#contact"
              className="btn-primary group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold text-ink font-semibold px-6 py-3.5 text-sm"
            >
              Отправить расчёт и получить точную цену
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

