import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { IconMapPin } from "./icons";
import { coverageCities } from "@/data/services";

export default function Coverage() {
  return (
    <section id="coverage" className="relative py-24 md:py-32 border-t border-ink-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            География работ
          </Reveal>
          <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight mb-6">
            Владимир и вся область
          </Reveal>
          <Reveal delay={0.1} className="text-paper-muted leading-relaxed mb-10 max-w-lg">
            Выезжаем на объекты в черте города и области. Расскажите, где находится объект —
            согласуем выезд и сроки.
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 gap-3.5 max-w-lg" stagger={0.08}>
            {coverageCities.map((city) => (
              <div
                key={city}
                className="card-hover flex items-center gap-3 rounded-xl border border-ink-border bg-ink-surface/40 px-5 py-4"
              >
                <IconMapPin className="w-[18px] h-[18px] text-gold shrink-0" />
                <span className="text-paper text-sm font-medium">{city}</span>
              </div>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="relative aspect-square max-w-md mx-auto w-full" y={20}>
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="180" stroke="#262a31" strokeWidth="1" fill="none" />
            <circle cx="200" cy="200" r="130" stroke="#262a31" strokeWidth="1" fill="none" />
            <circle cx="200" cy="200" r="80" stroke="#262a31" strokeWidth="1" fill="none" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#262a31" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#262a31" strokeWidth="1" />

            <circle cx="200" cy="200" r="7" fill="#c9a24a" />
            <circle cx="200" cy="200" r="14" fill="none" stroke="#c9a24a" strokeWidth="1" opacity="0.5" />

            <circle cx="150" cy="120" r="4.5" fill="#e6c778" />
            <circle cx="290" cy="150" r="4.5" fill="#e6c778" />
            <circle cx="270" cy="290" r="4.5" fill="#e6c778" />
            <circle cx="110" cy="280" r="4.5" fill="#e6c778" />

            <text x="200" y="235" textAnchor="middle" fill="#f3f1ea" fontSize="13" fontFamily="var(--font-display)">
              Владимир
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
