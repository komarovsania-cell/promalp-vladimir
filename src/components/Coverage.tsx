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
          <svg viewBox="0 0 440 320" className="w-full h-full">
            <path
              d="M75 95 L100 65 L140 55 L175 72 L205 58 L245 65 L280 52 L320 68 L355 58 L385 85
                 L378 115 L400 135 L415 150 L405 175 L418 195 L402 218 L410 240 L388 258 L368 275
                 L338 290 L305 300 L272 293 L240 305 L208 293 L180 278 L152 285 L122 262 L98 268
                 L72 240 L82 215 L55 195 L70 170 L48 145 L60 115 L42 98 Z"
              fill="#161a20"
              stroke="#2f343c"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            <circle cx="110" cy="92" r="4.5" fill="#e6c778" />
            <circle cx="292" cy="140" r="4.5" fill="#e6c778" />
            <circle cx="352" cy="252" r="4.5" fill="#e6c778" />

            <circle cx="228" cy="178" r="7" fill="#c9a24a" />
            <circle cx="228" cy="178" r="14" fill="none" stroke="#c9a24a" strokeWidth="1" opacity="0.5" />

            <text x="228" y="205" textAnchor="middle" fill="#f3f1ea" fontSize="13" fontFamily="var(--font-display)">
              Владимир
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
