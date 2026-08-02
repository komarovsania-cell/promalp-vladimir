"use client";

import { useState, FormEvent } from "react";
import Reveal from "./Reveal";
import { IconArrowRight, IconCheck, IconPhone } from "./icons";
import { serviceCategories } from "@/data/services";
import { site } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot spam check
    if (data.get("company_website")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Не удалось отправить заявку");
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Что-то пошло не так. Попробуйте позвонить нам напрямую.");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-ink-border">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          <div>
            <Reveal as="p" className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Заявка
            </Reveal>
            <Reveal as="h2" delay={0.05} className="font-display font-bold text-3xl md:text-4xl text-paper leading-tight mb-6">
              Обсудим вашу задачу
            </Reveal>
            <Reveal delay={0.1} className="text-paper-muted leading-relaxed mb-10 max-w-md">
              Оставьте контакты — перезвоним и сделаем предварительный расчёт стоимости за
              15–30 минут. Работаем {site.workHours.toLowerCase()}.
            </Reveal>

            <Reveal delay={0.15} className="flex flex-col gap-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-paper hover:text-gold transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <IconPhone className="w-4 h-4 text-gold" />
                </span>
                <span className="font-display font-semibold">{site.phoneDisplay}</span>
              </a>
              <div className="flex gap-3 text-sm">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink-border px-4 py-2 text-paper-muted hover:border-gold/50 hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={site.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink-border px-4 py-2 text-paper-muted hover:border-gold/50 hover:text-gold transition-colors"
                >
                  Telegram
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={30}>
            {status === "success" ? (
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-5">
                  <IconCheck className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-paper text-xl mb-2">
                  Заявка отправлена
                </h3>
                <p className="text-sm text-paper-muted">
                  Свяжемся с вами в ближайшее время. Также можно позвонить прямо сейчас:{" "}
                  <a href={site.phoneHref} className="text-gold">{site.phoneDisplay}</a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-ink-border bg-ink-surface/40 p-7 md:p-9 flex flex-col gap-5"
              >
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-paper-muted mb-2">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Как к вам обращаться"
                    className="w-full rounded-xl border border-ink-border bg-ink/60 px-4 py-3 text-paper placeholder:text-paper-muted/50 outline-none focus:border-gold/60 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-paper-muted mb-2">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl border border-ink-border bg-ink/60 px-4 py-3 text-paper placeholder:text-paper-muted/50 outline-none focus:border-gold/60 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs uppercase tracking-wider text-paper-muted mb-2">
                    Тип работ
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-xl border border-ink-border bg-ink/60 px-4 py-3 text-paper outline-none focus:border-gold/60 transition-colors text-sm appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Выберите категорию
                    </option>
                    {serviceCategories.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="Другое">Другое / не знаю</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-paper-muted mb-2">
                    Комментарий
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Кратко опишите задачу и адрес объекта"
                    className="w-full rounded-xl border border-ink-border bg-ink/60 px-4 py-3 text-paper placeholder:text-paper-muted/50 outline-none focus:border-gold/60 transition-colors text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-flame">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold text-ink font-semibold px-7 py-3.5 text-sm disabled:opacity-60"
                >
                  {status === "loading" ? "Отправляем…" : "Отправить заявку"}
                  {status !== "loading" && (
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                <p className="text-xs text-paper-muted/70 text-center">
                  Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
