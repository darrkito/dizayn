"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ExploreLinks } from "@/components/site/inline-links";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { CONTACT, waLink } from "@/content/contact";
import { services } from "@/content/services";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import type { Market } from "@/lib/routes";
import { submitContact } from "@/app/(es)/contacto/actions";

const fieldClass =
  "mt-2 w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

export function ContactForm({ lang, market = "mx" }: { lang: Lang; market?: Market }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  const contact = isUs ? t.usContact : t.contact;
  const shownServices = isUs ? services.filter((s) => s.us) : services;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    setErrors({});
    setStatus("sending");

    const result = await submitContact({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      service: String(form.get("service") ?? ""),
      message: String(form.get("message") ?? ""),
      lang,
      market,
    });

    if (result.status === "validation-error") {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }
    if (result.status === "submit-error") {
      setStatus("error");
      return;
    }

    setStatus("sent");
    e.currentTarget.reset();
  }

  return (
    <div className="container-x py-10 md:py-24">
      <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {contact.eyebrow}
      </p>
      <h1 className="mt-7 text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{contact.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{contact.lead}</p>
      <WhatsAppCTA label={t.nav.waCta} place="contact" className="mt-6 w-full sm:w-auto" />
      <ExploreLinks lang={lang} market={market} className="mt-4 max-w-2xl text-sm text-muted-foreground" />

      <div className="mt-10 grid gap-12 md:mt-16 md:gap-16 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {contact.form.name}
            </label>
            <input id="name" name="name" maxLength={120} required className={fieldClass} />
            {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {contact.form.email}
              </label>
              <input id="email" name="email" type="email" maxLength={255} required className={fieldClass} />
              {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {contact.form.phone}
              </label>
              <input id="phone" name="phone" maxLength={40} className={fieldClass} />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {contact.form.service}
            </label>
            <select id="service" name="service" defaultValue="" className={fieldClass}>
              <option value="">{contact.form.servicePlaceholder}</option>
              {shownServices.map((s) => {
                const name = isUs ? s.us![lang].name : s[lang].name;
                return (
                  <option key={s.slug} value={name}>
                    {name}
                  </option>
                );
              })}
              <option value="other">{contact.form.serviceOther}</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {contact.form.message}
            </label>
            <textarea id="message" name="message" rows={6} maxLength={3000} required className={fieldClass} />
            {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
          </div>

          <button type="submit" disabled={status === "sending"} className="btn-primary">
            {status === "sending" ? contact.form.sending : contact.form.submit}
          </button>

          {status === "sent" && (
            <p className="border border-primary p-4 text-sm text-primary" role="status">
              <strong>{contact.form.successTitle}.</strong> {contact.form.success}
            </p>
          )}
          {status === "error" && (
            <p className="border border-destructive p-4 text-sm text-destructive" role="alert">
              {contact.form.error}
            </p>
          )}
        </form>

        <aside className="space-y-8">
          <a
            href={waLink(t.waMessage)}
            target="_blank"
            rel="noreferrer"
            className="block border border-border p-6 transition-colors hover:border-primary"
          >
            <h2 className="font-display text-xl text-primary">{contact.whatsapp}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{contact.whatsappDesc}</p>
            <p className="mt-3 text-sm">{CONTACT.whatsappDisplay}</p>
          </a>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{contact.emailLabel}</h2>
            <a href={`mailto:${CONTACT.email}`} className="mt-1 flex min-h-11 items-center text-lg hover:text-primary">
              {CONTACT.email}
            </a>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{contact.igLabel}</h2>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="mt-1 flex min-h-11 items-center text-lg hover:text-primary">
              @dizayn_mx
            </a>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{contact.locationLabel}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{contact.location}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
