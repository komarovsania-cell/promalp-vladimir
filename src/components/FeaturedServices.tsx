"use client";

import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { Icon } from "./IconMap";
import { IconArrowRight } from "./icons";
import { featuredServices } from "@/data/featured";

export default function FeaturedServices() {
  return (
    <section id="featured-services" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-12">
          <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Популярные направления
          </Reveal>
          <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight">
            С чем чаще всего обращаются
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" stagger={0.05}>
          {featuredServices.map((f) => (
            <a
              key={f.slug}
              href={`/uslugi/${f.slug}`}
              className="card-hover flex flex-col rounded-2xl border border-ink-border bg-ink-surface/40 p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <Icon name={f.icon} className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-paper text-base mb-2 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-paper-muted leading-relaxed mb-5 flex-1">{f.desc}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-display font-semibold text-gold text-sm whitespace-nowrap">
                  {f.price}
                </span>
                <span className="group inline-flex items-center gap-1.5 text-xs font-medium text-paper">
                  Подробнее
                  <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
