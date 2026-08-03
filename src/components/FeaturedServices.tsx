"use client";

import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { Icon } from "./IconMap";
import { IconArrowRight } from "./icons";

type Featured = {
  categoryId: string;
  title: string;
  desc: string;
  price: string;
  icon: string;
};

const FEATURED: Featured[] = [
  {
    categoryId: "c65",
    title: "Монтаж рекламы",
    desc: "Монтаж и демонтаж рекламных баннеров, вывесок и конструкций на фасадах любой высоты — быстро и с соблюдением техники безопасности.",
    price: "от 355 ₽/м²",
    icon: "garland",
  },
  {
    categoryId: "c71",
    title: "Мойка окон и фасадов",
    desc: "Высотная мойка остекления, витражей и зенитных фонарей вручную и аппаратом высокого давления — для чистого и презентабельного фасада.",
    price: "от 70 ₽/м²",
    icon: "droplet",
  },
  {
    categoryId: "c69",
    title: "Очистка снега и наледи",
    desc: "Безопасное удаление снега, наледи и сосулек с кровли и водостоков — предотвращаем сходы и повреждение фасада зимой.",
    price: "от 65 ₽/м²",
    icon: "wrench",
  },
  {
    categoryId: "c46",
    title: "Монтаж металлоконструкций",
    desc: "Монтаж и крепление металлоконструкций на высоте — фермы, кронштейны, ограждения и другие элементы любой сложности.",
    price: "от 79 000 ₽/тонна",
    icon: "wrench",
  },
  {
    categoryId: "c43",
    title: "Ремонт межпанельных швов",
    desc: "Демонтаж старого наполнения, герметизация и утепление межпанельных швов — защита дома от промерзания и протечек.",
    price: "от 185 ₽/м.п.",
    icon: "garland",
  },
  {
    categoryId: "c31",
    title: "Ремонт дымовых труб",
    desc: "Сварочный ремонт, замена оттяжек и обслуживание металлических дымовых труб на высоте без остановки работы здания.",
    price: "от 1 790 ₽/шт.",
    icon: "hammer",
  },
  {
    categoryId: "c62",
    title: "Покраска фасадов",
    desc: "Очистка, шпаклевание, грунтовка и покраска фасадов — обновляем внешний вид здания с гарантией на материалы и работу.",
    price: "от 75 ₽/м²",
    icon: "roller",
  },
  {
    categoryId: "c88",
    title: "Электромонтаж на высоте",
    desc: "Штробление, прокладка кабеля и электромонтажные работы на фасадах и кровле — там, где обычным электрикам не добраться.",
    price: "от 470 ₽/м.п.",
    icon: "bolt",
  },
];

export function openServiceCategory(id: string) {
  window.dispatchEvent(new CustomEvent("open-service-category", { detail: id }));
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
          {FEATURED.map((f) => (
            <div
              key={f.categoryId}
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
                <button
                  onClick={() => openServiceCategory(f.categoryId)}
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-paper hover:text-gold transition-colors"
                >
                  Подробнее
                  <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
