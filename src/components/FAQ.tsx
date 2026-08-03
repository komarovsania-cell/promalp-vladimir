"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

function IconChevron(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const faqItems = [
  {
    q: "Сколько стоит выезд и оценка объекта?",
    a: "Выезд специалиста, осмотр объекта и предварительная оценка стоимости — бесплатно. Точную цену называем после замера и согласовываем в договоре до начала работ.",
  },
  {
    q: "Сколько времени занимает выполнение работ?",
    a: "Разовые работы — мойка окон, очистка снега — обычно занимают 1 день. Комплексные проекты (утепление фасада, монтаж металлоконструкций) — от нескольких дней до нескольких недель в зависимости от объёма.",
  },
  {
    q: "Какие материалы вы используете?",
    a: "Работаем только с сертифицированными материалами от проверенных поставщиков, всё соответствует ГОСТ и СНиП. При необходимости можем закупить и поднять материалы на объект сами.",
  },
  {
    q: "Как происходит оценка стоимости работ?",
    a: "Специалист выезжает на объект, измеряет фактический объём работ и формирует смету по актуальному прайс-листу. Вы также можете предварительно прикинуть стоимость в нашем онлайн-калькуляторе.",
  },
  {
    q: "Работаете ли вы по договору и есть ли гарантия?",
    a: "Да, всегда заключаем договор — в нём фиксируются стоимость, сроки и условия. После завершения работ подписываем акт приёма-сдачи и предоставляем гарантию на работы и материалы.",
  },
  {
    q: "Какая минимальная сумма заказа?",
    a: `Минимальная сумма заказа — ${site.minOrder}. Работаем бригадами 2–4 мастера и подстраиваемся под объём вашей задачи.`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Вопросы и ответы
          </Reveal>
          <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight">
            Частые вопросы
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04} className="rounded-2xl border border-ink-border bg-ink-surface/40 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
                >
                  <span className="text-sm md:text-base font-medium text-paper">{item.q}</span>
                  <IconChevron
                    className={`w-5 h-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-paper-muted leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
