"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";

const STATIC_IMAGES = [
  "/portfolio/portfolio-01-uteplenie.jpg",
  "/portfolio/portfolio-08-steklomoy.jpg",
  "/portfolio/portfolio-07-krysha.jpg",
  "/portfolio/portfolio-04-opory.jpg",
  "/portfolio/portfolio-05-atrium.jpg",
  "/portfolio/portfolio-02-uteplenie.jpg",
  "/portfolio/portfolio-09-steklomoy.jpg",
  "/portfolio/portfolio-06-shaft.jpg",
  "/portfolio/portfolio-03-uteplenie.jpg",
];

type Meta = { title: string; desc: string };

const KEYWORD_META: { match: string; title: string; desc: string }[] = [
  {
    match: "uteplenie",
    title: "Утепление и монтаж вентфасада",
    desc: "Монтаж теплоизоляции и фасадных панелей на высоте — от подготовки поверхности до финишной облицовки.",
  },
  {
    match: "steklomoy",
    title: "Мойка остекления",
    desc: "Высотная мойка окон, витражей и фасадного остекления вручную и с применением спецоборудования.",
  },
  {
    match: "krysha",
    title: "Кровельные работы",
    desc: "Ремонт, обслуживание и очистка кровли — от гидроизоляции до устранения протечек.",
  },
  {
    match: "opory",
    title: "Обслуживание опор и конструкций",
    desc: "Диагностика, окраска и антикоррозийная защита металлических опор и несущих конструкций.",
  },
  {
    match: "atrium",
    title: "Работы в атриуме",
    desc: "Высотные работы во внутренних пространствах — мойка, монтаж и обслуживание на большой высоте под перекрытием.",
  },
  {
    match: "shaft",
    title: "Работы в шахте и колодце",
    desc: "Обслуживание и ремонт в стеснённых условиях — лифтовые шахты, колодцы и технические проёмы.",
  },
];

function metaFor(src: string): Meta {
  const found = KEYWORD_META.find((k) => src.toLowerCase().includes(k.match));
  if (found) return { title: found.title, desc: found.desc };
  return {
    title: "Объект компании ВинСтарКом",
    desc: "Высотные работы, выполненные нашей бригадой промышленных альпинистов во Владимире и области.",
  };
}

export default function Portfolio() {
  const [images, setImages] = useState<string[]>(STATIC_IMAGES);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/portfolio", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const dynamic = (data.items || []).map((it: { src: string }) => it.src);
        if (dynamic.length) setImages([...dynamic, ...STATIC_IMAGES]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = activeIndex !== null ? images[activeIndex] : null;
  const activeMeta = active ? metaFor(active) : null;

  return (
    <section id="portfolio" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
          Портфолио
        </Reveal>
        <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight mb-6 max-w-xl">
          Объекты, на которых мы работали
        </Reveal>
        <Reveal delay={0.1} className="text-paper-muted leading-relaxed mb-12 max-w-lg">
          Реальные фото с высотных работ — фасады, кровли, атриумы и остекление. Нажмите на фото, чтобы посмотреть подробности.
        </Reveal>

        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" stagger={0.06}>
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActiveIndex(i)}
              className="card-hover relative aspect-[3/4] rounded-xl overflow-hidden border border-ink-border bg-ink-surface text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Промышленный альпинизм — выполненные работы"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-medium text-paper leading-snug">{metaFor(src).title}</span>
              </div>
            </button>
          ))}
        </RevealGroup>
      </div>

      {active && activeMeta && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-ink/90 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl border border-ink-border bg-ink-surface overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveIndex(null)}
              aria-label="Закрыть"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-ink/80 border border-ink-border text-paper flex items-center justify-center text-lg hover:text-gold hover:border-gold/40 transition-colors"
            >
              ×
            </button>
            <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active} alt={activeMeta.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wide text-gold mb-3">Портфолио</span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-paper mb-3 leading-snug">
                {activeMeta.title}
              </h3>
              <p className="text-sm text-paper-muted leading-relaxed mb-6">{activeMeta.desc}</p>
              <a
                href="#contact"
                onClick={() => setActiveIndex(null)}
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink font-semibold px-6 py-3 text-sm w-fit"
              >
                Хочу так же — оставить заявку
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
