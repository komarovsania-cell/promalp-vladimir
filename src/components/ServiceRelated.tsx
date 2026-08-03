import { Icon } from "./IconMap";
import { IconArrowRight } from "./icons";
import { featuredServices } from "@/data/featured";

export default function ServiceRelated({ currentSlug }: { currentSlug: string }) {
  const others = featuredServices.filter((s) => s.slug !== currentSlug).slice(0, 4);
  if (!others.length) return null;

  return (
    <section className="relative py-20 md:py-28 border-b border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Другие направления</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-paper leading-tight mb-10">
          Также может пригодиться
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {others.map((s) => (
            <a
              key={s.slug}
              href={`/uslugi/${s.slug}`}
              className="card-hover flex flex-col rounded-2xl border border-ink-border bg-ink-surface/40 p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Icon name={s.icon} className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-paper text-sm mb-3 leading-snug flex-1">
                {s.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                Подробнее
                <IconArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
