"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { Icon } from "./IconMap";
import { serviceCategories } from "@/data/services";
import { IconArrowRight } from "./icons";

export default function Services() {
  const [active, setActive] = useState(serviceCategories[0].id);
  const current = serviceCategories.find((c) => c.id === active)!;

  return (
    <section id="services" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Прайс-лист
            </Reveal>
            <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight">
              Услуги и цены
            </Reveal>
          </div>
          <Reveal as="p" delay={0.1} className="text-sm text-paper-muted max-w-sm">
            Полный прайс-лист — {serviceCategories.length} категорий, {serviceCategories.reduce((a, c) => a + c.items.length, 0)}+
            позиций с ценами для Владимира. Точная стоимость — на бесплатном расчёте.
            Минимальная сумма заказа — 5 000 ₽.
          </Reveal>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 max-h-56 overflow-y-auto pr-1 rounded-xl border border-ink-border p-3">
          {serviceCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm transition-all border ${
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

        <RevealGroup
          key={active}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[36rem] overflow-y-auto pr-1"
          stagger={0.03}
        >
          {current.items.map((item, idx) => (
            <div
              key={`${current.id}-${idx}`}
              className="card-hover flex items-start justify-between gap-4 rounded-2xl border border-ink-border bg-ink-surface/40 p-6"
            >
              <span className="text-sm text-paper leading-snug">{item.name}</span>
              <span className="shrink-0 font-display font-semibold text-gold text-sm whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="btn-primary group inline-flex items-center gap-2.5 rounded-full bg-gold text-ink font-semibold px-7 py-3.5 text-sm"
          >
            Рассчитать стоимость моей задачи
            <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
