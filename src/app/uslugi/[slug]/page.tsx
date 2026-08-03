import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ServiceRelated from "@/components/ServiceRelated";
import { Icon } from "@/components/IconMap";
import { IconArrowRight, IconPhone } from "@/components/icons";
import { featuredServices } from "@/data/featured";
import { serviceCategories } from "@/data/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return featuredServices.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = featuredServices.find((s) => s.slug === params.slug);
  if (!service) return {};
  const title = `${service.title} во Владимире и области | ${site.companyName}`;
  const description = `${service.desc} Цена ${service.price}. Работаем по договору, гарантия от 2 лет, бесплатный выезд специалиста.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [service.image] },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = featuredServices.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const category = serviceCategories.find((c) => c.id === service.categoryId);

  return (
    <main className="min-h-screen bg-ink">
      <Header />

      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-24 border-b border-ink-border">
        <div className="pointer-events-none absolute -top-40 right-[-10%] w-[560px] h-[560px] rounded-full bg-gold/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="text-xs text-paper-muted mb-8">
            <a href="/" className="hover:text-gold transition-colors">Главная</a>
            {" / "}
            <a href="/#services" className="hover:text-gold transition-colors">Услуги</a>
            {" / "}
            <span className="text-paper">{service.title}</span>
          </p>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-surface/60 px-5 py-2.5 text-xs md:text-sm tracking-[0.14em] uppercase text-gold mb-7">
                <Icon name={service.icon} className="w-4 h-4" />
                Промышленный альпинизм · {site.city}
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight text-paper mb-6">
                {service.title}
              </h1>

              <p className="text-paper-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                {service.longDesc}
              </p>

              <div className="flex items-center gap-3 mb-9">
                <span className="font-display font-bold text-gold text-2xl">{service.price}</span>
                <span className="text-sm text-paper-muted">точная цена — после бесплатного осмотра объекта</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="btn-primary group inline-flex items-center gap-2.5 rounded-full bg-gold text-ink font-semibold px-7 py-3.5 text-sm"
                >
                  Оставить заявку
                  <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink-border text-paper font-medium px-7 py-3.5 text-sm hover:border-gold/50 hover:text-gold transition-colors"
                >
                  <IconPhone className="w-4 h-4" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-[3/4] max-w-md ml-auto rounded-[28px] border border-ink-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/5 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-ink-border bg-ink/80 backdrop-blur px-5 py-4">
                  <div className="text-xs uppercase tracking-wider text-gold mb-1">Гарантия</div>
                  <div className="text-sm text-paper-muted">Договор, акты, чеки на каждый объект</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {category && (
        <section className="relative py-20 md:py-28 border-b border-ink-border">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Цены</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-paper leading-tight mb-10">
              Расценки на {service.title.toLowerCase()}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="card-hover flex items-start justify-between gap-4 rounded-2xl border border-ink-border bg-ink-surface/40 p-6"
                >
                  <span className="text-sm text-paper leading-snug">{item.name}</span>
                  <span className="shrink-0 font-display font-semibold text-gold text-sm whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="/#services"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-paper hover:text-gold transition-colors"
              >
                Смотреть полный прайс-лист — все 89 категорий
                <IconArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      <ServiceRelated currentSlug={service.slug} />

      <ContactForm defaultService={category?.title} />
      <Footer />
    </main>
  );
}
