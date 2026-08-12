"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, waLink } from "@/content/contact";
import { services } from "@/content/services";
import { useI18n } from "@/lib/i18n";
import { submitContact } from "@/app/contacto/actions";

const fieldClass =
  "mt-2 w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

export function ContactForm() {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    <div className="container-x py-24">
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{t.contact.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.contact.lead}</p>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t.contact.form.name}
            </label>
            <input id="name" name="name" maxLength={120} required className={fieldClass} />
            {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t.contact.form.email}
              </label>
              <input id="email" name="email" type="email" maxLength={255} required className={fieldClass} />
              {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t.contact.form.phone}
              </label>
              <input id="phone" name="phone" maxLength={40} className={fieldClass} />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t.contact.form.service}
            </label>
            <select id="service" name="service" defaultValue="" className={fieldClass}>
              <option value="">{t.contact.form.servicePlaceholder}</option>
              {services.map((s) => (
                <option key={s.slug} value={s[lang].name}>
                  {s[lang].name}
                </option>
              ))}
              <option value="other">{t.contact.form.serviceOther}</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t.contact.form.message}
            </label>
            <textarea id="message" name="message" rows={6} maxLength={3000} required className={fieldClass} />
            {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
          </div>

          <button type="submit" disabled={status === "sending"} className="btn-primary">
            {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
          </button>

          {status === "sent" && (
            <p className="border border-primary p-4 text-sm text-primary" role="status">
              <strong>{t.contact.form.successTitle}.</strong> {t.contact.form.success}
            </p>
          )}
          {status === "error" && (
            <p className="border border-destructive p-4 text-sm text-destructive" role="alert">
              {t.contact.form.error}
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
            <h2 className="font-display text-xl text-primary">{t.contact.whatsapp}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.whatsappDesc}</p>
            <p className="mt-3 text-sm">{CONTACT.whatsappDisplay}</p>
          </a>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.contact.emailLabel}</h2>
            <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-lg hover:text-primary">
              {CONTACT.email}
            </a>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.contact.igLabel}</h2>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="mt-1 block text-lg hover:text-primary">
              @dizayn_mx
            </a>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.contact.locationLabel}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.contact.location}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
