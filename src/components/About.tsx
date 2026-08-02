import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";
import { Icon } from "./IconMap";
import { trustPoints } from "@/data/services";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-2xl mb-16">
          <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
            Почему выбирают нас
          </Reveal>
          <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight">
            Безопасность, договор и гарантия на каждом объекте
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPoints.map((p) => (
            <div
              key={p.title}
              className="card-hover rounded-2xl border border-ink-border bg-ink-surface/40 p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <Icon name={p.icon} className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-paper text-base mb-2.5">
                {p.title}
              </h3>
              <p className="text-sm text-paper-muted leading-relaxed">{p.text}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
