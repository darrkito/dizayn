"use client";

import { useEffect } from "react";
import Link from "next/link";
import { services } from "@/content/services";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { langPath, usPath, type Market, marketPath } from "@/lib/routes";
import { WhatsAppBand } from "@/components/site/whatsapp-band";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export function ServicesContent({ lang, market = "mx" }: { lang: Lang; market?: Market }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  // The US hub lists only the 5 services a remote US client can buy (no photo/video), with US copy.
  const shown = isUs ? services.filter((s) => s.us) : services;
  const href = (slug: string) => (isUs ? usPath(`/servicios/${slug}`, lang) : langPath(`/servicios/${slug}`, lang));

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <div className="container-x py-10 md:py-24">
        <Breadcrumbs
          label={t.nav.breadcrumb}
          className="mb-6 md:mb-8"
          items={[
            { label: t.nav.home, href: marketPath("/", lang, market) },
            { label: t.nav.services, href: marketPath("/servicios", lang, market) },
          ]}
        />
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{isUs ? t.services.usTitle : t.services.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.services.lead}</p>

      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {shown.map((s, i) => (
          <Link
            key={s.slug}
            href={href(s.slug)}
            className={`group flex flex-col justify-between bg-background p-5 transition-colors active:bg-card hover:bg-card md:p-8 ${
              i === 0 ? "sm:col-span-2 sm:p-12 lg:col-span-2" : ""
            }`}
          >
            <span className="text-xs tracking-[0.2em] text-primary">{s.number}</span>
            <div className="mt-8 md:mt-16">
              <h2 className={i === 0 ? "font-display text-3xl lg:text-4xl" : "font-display text-2xl"}>
                {(isUs ? s.us![lang] : s[lang]).metaTitle}
              </h2>
              <p className={i === 0 ? "mt-3 max-w-md text-base text-muted-foreground" : "mt-3 text-sm text-muted-foreground"}>
                {(isUs ? s.us![lang] : s[lang]).tagline}
              </p>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.18em] text-primary">
                {t.services.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
      </div>
      <WhatsAppBand lang={lang} place="services" />
    </div>
  );
}
