"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { Icon } from "./IconMap";
import { IconArrowRight, IconRuble } from "./icons";
import { calculatorCategories, type CalcItem } from "@/data/calculator";

type FlatItem = CalcItem & { categoryId: string; categoryTitle: string; categoryIcon: string };

const ALL_ITEMS: FlatItem[] = calculatorCategories.flatMap((c) =>
  c.items.map((i) => ({ ...i, categoryId: c.id, categoryTitle: c.title, categoryIcon: c.icon }))
);

type Line = {
  key: string;
  item: FlatItem;
  qty: number;
};

function formatRub(n: number) {
  return Math.round(n).toLocaleString("ru-RU") + " ₽";
}

export default function Calculator() {
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selected, setSelected] = useState<FlatItem | null>(null);
  const [qty, setQty] = useState(1);
  const [lines, setLines] = useState<Line[]>([]);

  const isSearching = query.trim().length >= 2;
  const activeCategory = activeCategoryId ? calculatorCategories.find((c) => c.id === activeCategoryId) : null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return ALL_ITEMS.filter(
      (i) => i.name.toLowerCase().includes(q) || i.categoryTitle.toLowerCase().includes(q)
    ).slice(0, 60);
  }, [query]);

  const categoryItems = useMemo(() => {
    if (!activeCategoryId) return [];
    return ALL_ITEMS.filter((i) => i.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  function selectItem(item: FlatItem) {
    setSelected(item);
    setQuery("");
    setActiveCategoryId(null);
    setQty(1);
  }

  function openCategory(id: string) {
    setActiveCategoryId(id);
    setQuery("");
    setSelected(null);
  }

  function addLine() {
    if (!selected || !qty || qty <= 0) return;
    setLines((prev) => [...prev, { key: `${Date.now()}-${selected.id}`, item: selected, qty }]);
  }

  function removeLine(key: string) {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }

  const total = lines.reduce((acc, l) => acc + l.item.price * l.qty, 0);
  const previewSum = selected ? selected.price * (qty || 0) : 0;

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
            Полный каталог работ по ценам для Владимира. Точная стоимость — после
            бесплатного осмотра объекта нашим специалистом.
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <Reveal className="rounded-2xl border border-ink-border bg-ink-surface/40 p-6 md:p-8">
            <label className="block mb-3">
              <span className="block text-xs uppercase tracking-wide text-paper-muted mb-2">
                Поиск по прайсу ({ALL_ITEMS.length}+ позиций)
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim().length >= 2) setActiveCategoryId(null);
                }}
                placeholder="Например: остекление, кровля, дымоход..."
                className="w-full rounded-xl border border-ink-border bg-ink px-4 py-3 text-sm text-paper focus:outline-none focus:border-gold/60"
              />
            </label>

            {!isSearching && !selected && !activeCategoryId && (
              <div className="mb-2">
                <span className="block text-xs uppercase tracking-wide text-paper-muted mb-2">
                  Или выберите категорию ({calculatorCategories.length})
                </span>
                <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                  {calculatorCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => openCategory(c.id)}
                      className="text-xs rounded-full border border-ink-border text-paper-muted hover:text-gold hover:border-gold/40 px-3 py-1.5 transition-colors"
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && activeCategory && !selected && (
              <div className="mt-2">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-sm text-paper font-medium">{activeCategory.title}</span>
                  <button
                    onClick={() => setActiveCategoryId(null)}
                    className="text-xs text-paper-muted hover:text-paper shrink-0"
                  >
                    Все категории
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto rounded-xl border border-ink-border divide-y divide-ink-border">
                  {categoryItems.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => selectItem(r)}
                      className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 hover:bg-ink-surface/70 transition-colors"
                    >
                      <span className="block text-sm text-paper leading-snug">{r.name}</span>
                      <span className="shrink-0 text-sm font-display font-semibold text-gold whitespace-nowrap">
                        {r.price.toLocaleString("ru-RU")} ₽/{r.unit}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSearching && (
              <div className="mt-2 max-h-80 overflow-y-auto rounded-xl border border-ink-border divide-y divide-ink-border">
                {results.length === 0 ? (
                  <p className="text-sm text-paper-muted px-4 py-4">Ничего не найдено — попробуйте другой запрос или выберите категорию ниже.</p>
                ) : (
                  results.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => selectItem(r)}
                      className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 hover:bg-ink-surface/70 transition-colors"
                    >
                      <span>
                        <span className="block text-sm text-paper leading-snug">{r.name}</span>
                        <span className="block text-xs text-paper-muted mt-0.5">{r.categoryTitle}</span>
                      </span>
                      <span className="shrink-0 text-sm font-display font-semibold text-gold whitespace-nowrap">
                        {r.price.toLocaleString("ru-RU")} ₽/{r.unit}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}

            {selected && (
              <div className="mt-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Icon name={selected.categoryIcon} className="w-4 h-4 text-gold shrink-0" />
                    <div>
                      <p className="text-sm text-paper leading-snug">{selected.name}</p>
                      <p className="text-xs text-paper-muted mt-0.5">{selected.categoryTitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-xs text-paper-muted hover:text-paper shrink-0"
                  >
                    Изменить
                  </button>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-4 items-end mb-4">
                  <label className="block">
                    <span className="block text-xs uppercase tracking-wide text-paper-muted mb-2">
                      Кол-во, {selected.unit}
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
                  <button
                    onClick={addLine}
                    className="btn-primary rounded-full bg-gold text-ink text-sm font-semibold px-5 py-3 whitespace-nowrap"
                  >
                    Добавить · {formatRub(Math.max(previewSum, 0))}
                  </button>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-ink-border bg-ink-surface/40 p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <IconRuble className="w-5 h-5 text-gold" />
              <h3 className="font-display font-semibold text-paper text-lg">Ваш расчёт</h3>
            </div>

            {lines.length === 0 ? (
              <p className="text-sm text-paper-muted flex-1">
                Добавьте виды работ слева, чтобы собрать предварительную смету.
              </p>
            ) : (
              <RevealGroup className="flex flex-col gap-3 mb-6 flex-1" stagger={0.04}>
                {lines.map((l) => (
                  <div key={l.key} className="flex items-start justify-between gap-3 text-sm border-b border-ink-border pb-3">
                    <div>
                      <p className="text-paper leading-snug">{l.item.name}</p>
                      <p className="text-paper-muted text-xs mt-1">
                        {l.qty} {l.item.unit} × {l.item.price.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-display font-semibold text-gold">{formatRub(l.item.price * l.qty)}</span>
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
