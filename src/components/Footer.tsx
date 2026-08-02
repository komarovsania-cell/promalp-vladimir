import { IconCarabiner, IconPhone } from "./icons";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-border py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <IconCarabiner className="w-5 h-5 text-gold" />
          <span className="font-display font-semibold text-paper text-sm">
            {site.companyName}
          </span>
        </div>
        <p className="text-xs text-paper-muted text-center">
          Промышленный альпинизм во Владимире и области · Работаем по договору · Гарантия на все виды работ
        </p>
        <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-paper-muted hover:text-gold transition-colors">
          <IconPhone className="w-4 h-4 text-gold" />
          {site.phoneDisplay}
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-8 pt-6 border-t border-ink-border/60">
        <p className="text-xs text-paper-muted/60 text-center">
          © {year} {site.companyName}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
