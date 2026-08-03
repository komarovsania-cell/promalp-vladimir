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
          <svg viewBox="0 0 1072 659" className="w-full h-full">
            <path
              d="M20 65 L38 80 L18 108 L48 118 L68 103 L88 113 L110 103 L130 113 L152 103 L175 113 L198 103
                 L213 88 L225 55 L240 30 L255 17 L272 25 L288 48 L300 27 L315 14 L330 38 L345 65 L357 95 L362 118
                 L378 122 L395 105 L415 118 L423 150 L430 175 L443 155 L455 110 L472 100 L495 108 L515 97
                 L560 95 L600 110 L650 100 L700 115 L740 105 L745 105 L730 140 L755 175 L740 210 L765 245
                 L800 230 L830 200 L860 190 L890 200 L920 190 L950 205 L985 195 L1015 215 L1045 245 L1060 285
                 L1040 325 L1010 350 L975 340 L945 365 L915 385 L885 370 L855 390 L825 410
                 L800 430 L775 450 L810 460 L780 480 L750 470 L720 490 L690 475 L660 500 L630 485 L600 510 L570 530
                 L700 625 L665 610 L635 590 L605 610 L575 595 L545 580 L515 590 L485 570
                 L455 555 L425 535 L395 545 L365 525 L335 540 L305 520 L275 505 L245 485 L215 465 L190 440
                 L165 410 L140 385 L115 360 L90 340 L60 320 L30 310
                 L15 290 L28 270 L8 250 L22 225 L8 195 L25 165 L10 140 Z"
              fill="#161a20"
              stroke="#2f343c"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            <circle cx="690" cy="263" r="9" fill="#e6c778" />
            <text x="690" y="240" textAnchor="middle" fill="#a8adb6" fontSize="26">Ковров</text>

            <circle cx="792" cy="470" r="9" fill="#e6c778" />
            <text x="792" y="500" textAnchor="middle" fill="#a8adb6" fontSize="26">Муром</text>

            <circle cx="109" cy="150" r="9" fill="#e6c778" />
            <text x="140" y="185" textAnchor="start" fill="#a8adb6" fontSize="26">Александров</text>

            <circle cx="523" cy="239" r="14" fill="#c9a24a" />
            <circle cx="523" cy="239" r="28" fill="none" stroke="#c9a24a" strokeWidth="2" opacity="0.5" />
            <text x="523" y="285" textAnchor="middle" fill="#f3f1ea" fontSize="30" fontFamily="var(--font-display)">
              Владимир
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
