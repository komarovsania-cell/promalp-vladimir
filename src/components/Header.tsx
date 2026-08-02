"use client";

import { useEffect, useState } from "react";
import { IconCarabiner, IconPhone } from "./icons";
import { site } from "@/lib/site";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "Почему мы" },
  { href: "#process", label: "Как работаем" },
  { href: "#coverage", label: "География" },
  { href: "#contact", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-ink-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[4.5rem]">
        <a href="#top" className="flex items-center gap-2.5 group">
          <IconCarabiner className="w-7 h-7 text-gold group-hover:text-gold-bright transition-colors" />
          <span className="font-display font-semibold tracking-tight text-paper text-base md:text-lg">
            {site.companyName}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-paper-muted hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-paper hover:text-gold transition-colors text-sm font-medium"
          >
            <IconPhone className="w-4 h-4 text-gold" />
            {site.phoneDisplay}
          </a>
          <a
            href="#contact"
            className="btn-primary rounded-full px-5 py-2.5 text-ink text-sm font-semibold bg-gold"
          >
            Оставить заявку
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Меню"
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-[1.5px] bg-paper transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-paper transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink-soft border-t border-ink-border px-5 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-paper text-base"
            >
              {l.label}
            </a>
          ))}
          <a href={site.phoneHref} className="flex items-center gap-2 text-gold font-medium">
            <IconPhone className="w-4 h-4" />
            {site.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
