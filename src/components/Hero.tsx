"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IconArrowRight, IconRig } from "./icons";
import { site } from "@/lib/site";

const stats = [
  { value: "10+", label: "лет опыта" },
  { value: "2–4", label: "мастера в бригаде" },
  { value: "5 000 ₽", label: "минимальный заказ" },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-line", { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.3")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .fromTo(".hero-stat", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .fromTo(".hero-rope path", { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.15 }, "-=1");

      gsap.to(".hero-glow", {
        x: 40,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="hero-glow pointer-events-none absolute -top-40 right-[-10%] w-[560px] h-[560px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full bg-flame/10 blur-[120px]" />

      <div className="absolute inset-0 -z-10 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(#c9a24a 1px, transparent 1px), linear-gradient(90deg, #c9a24a 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-surface/60 px-4 py-1.5 text-xs tracking-[0.18em] uppercase text-gold mb-8">
            Промышленный альпинизм · {site.region}
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.06] tracking-tight text-paper mb-7">
            <span className="hero-line block overflow-hidden">Высотные работы</span>
            <span className="hero-line block overflow-hidden text-gold">без лесов и посредников</span>
          </h1>

          <p className="hero-sub text-paper-muted text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Фасады, кровля, монтаж, электрика и клининг на высоте — во Владимире, Коврове,
            Муроме, Александрове и по всей области. Работаем по договору, с гарантией и
            сертифицированным снаряжением уже более 10 лет.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#contact"
              className="hero-cta btn-primary group inline-flex items-center gap-2.5 rounded-full bg-gold text-ink font-semibold px-7 py-3.5 text-sm"
            >
              Получить расчёт за 15 минут
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="hero-cta inline-flex items-center gap-2.5 rounded-full border border-ink-border text-paper font-medium px-7 py-3.5 text-sm hover:border-gold/50 hover:text-gold transition-colors"
            >
              Все услуги и цены
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-paper-muted leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-full aspect-[3/4] max-w-sm rounded-[28px] border border-ink-border bg-ink-surface/50 backdrop-blur-sm overflow-hidden">
            <svg className="hero-rope absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
              <path d="M150 10 L150 200" stroke="#c9a24a" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5" />
              <path d="M150 200 C 150 260, 90 240, 90 300" stroke="#c9a24a" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5" />
              <path d="M150 200 C 150 260, 210 240, 210 300" stroke="#c9a24a" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.5" />
              <circle cx="150" cy="200" r="4" fill="#c9a24a" opacity="0.8" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <IconRig className="w-40 h-40 text-gold/80" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-ink-border bg-ink/80 backdrop-blur px-5 py-4">
              <div className="text-xs uppercase tracking-wider text-gold mb-1">Гарантия</div>
              <div className="text-sm text-paper-muted">Договор, акты, чеки на каждый объект</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
