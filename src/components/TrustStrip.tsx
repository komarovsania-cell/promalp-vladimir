"use client";

import Reveal from "./Reveal";
import { IconDocument, IconShield, IconClock } from "./icons";

const badges = [
  {
    icon: IconDocument,
    title: "Бесплатная диагностика",
    text: "Выезд и оценка объекта — без оплаты",
  },
  {
    icon: IconShield,
    title: "Гарантия от 2 лет",
    text: "На все виды работ и материалы",
  },
  {
    icon: IconClock,
    title: "Работаем по договору",
    text: "Фиксируем стоимость и сроки заранее",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
        <Reveal className="grid sm:grid-cols-3 gap-5 md:gap-6">
          {badges.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-4 rounded-2xl border border-ink-border bg-ink-surface/40 px-5 py-4"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gold/10 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-paper leading-snug">{b.title}</div>
                <div className="text-xs text-paper-muted mt-0.5">{b.text}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
