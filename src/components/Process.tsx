import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { processSteps } from "@/data/services";

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-16">
          <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Процесс
          </Reveal>
          <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight">
            Как мы работаем
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {processSteps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="font-display text-5xl font-bold text-ink-border mb-5 select-none">
                {s.step}
              </div>
              <h3 className="font-display font-semibold text-paper text-lg mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm text-paper-muted leading-relaxed">{s.text}</p>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+0.5rem)] w-[calc(1.5rem-0.5rem)] rope-divider" />
              )}
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
