"use client";

import { useEffect } from "react";
import Link from "next/link";
import { services } from "@/content/services";
import { getDict, useI18n, type Lang } from "@/lib/i18n";

export function ServicesContent({ lang }: { lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const prefix = lang === "en" ? "/en" : "";

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div className="container-x py-24">
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{t.services.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.services.lead}</p>

      <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`${prefix}/servicios/${s.slug}`}
            className="group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-card"
          >
            <span className="text-xs tracking-[0.2em] text-primary">{s.number}</span>
            <div className="mt-16">
              <h2 className="font-display text-2xl">{s[lang].name}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s[lang].tagline}</p>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.18em] text-primary">
                {t.services.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
