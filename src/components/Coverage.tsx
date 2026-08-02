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

        <Reveal className="relative aspect-[8/5] max-w-md mx-auto w-full" y={20}>
          <svg viewBox="0 0 480 300" className="w-full h-full">
            <path
              d="M70 40 L130 15 L190 35 L230 20 L270 35 L310 15 L360 40 L400 30 L440 55
                 L465 90 L450 130 L470 150 L455 180 L430 200 L440 230 L410 250 L380 270
                 L340 290 L300 280 L270 295 L230 285 L190 270 L150 280 L120 255 L90 265
                 L60 235 L75 205 L45 190 L65 165 L35 150 L55 120 L30 100 L50 75 L25 60 L45 35 Z"
              fill="#161a20"
              stroke="#2f343c"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            <circle cx="302" cy="120" r="4.5" fill="#e6c778" />
            <text x="302" y="108" textAnchor="middle" fill="#a8adb6" fontSize="11">Ковров</text>

            <circle cx="346" cy="204" r="4.5" fill="#e6c778" />
            <text x="346" y="222" textAnchor="middle" fill="#a8adb6" fontSize="11">Муром</text>

            <circle cx="68" cy="78" r="4.5" fill="#e6c778" />
            <text x="68" y="66" textAnchor="middle" fill="#a8adb6" fontSize="11">Александров</text>

            <circle cx="202" cy="132" r="7" fill="#c9a24a" />
            <circle cx="202" cy="132" r="14" fill="none" stroke="#c9a24a" strokeWidth="1" opacity="0.5" />
            <text x="202" y="159" textAnchor="middle" fill="#f3f1ea" fontSize="13" fontFamily="var(--font-display)">
              Владимир
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
