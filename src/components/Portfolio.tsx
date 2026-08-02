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

export default function Portfolio() {
  const [images, setImages] = useState<string[]>(STATIC_IMAGES);

  useEffect(() => {
    fetch("/api/portfolio", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const dynamic = (data.items || []).map((it: { src: string }) => it.src);
        if (dynamic.length) setImages([...dynamic, ...STATIC_IMAGES]);
      })
      .catch(() => {});
  }, []);

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
          Реальные фото с высотных работ — фасады, кровли, атриумы и остекление.
        </Reveal>

        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" stagger={0.06}>
          {images.map((src, i) => (
            <div
              key={src + i}
              className="card-hover relative aspect-[3/4] rounded-xl overflow-hidden border border-ink-border bg-ink-surface"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Промышленный альпинизм — выполненные работы"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
