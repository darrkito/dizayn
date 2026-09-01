"use client";

import { useEffect } from "react";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioGallery } from "./portfolio-gallery";
import { InstagramBand } from "./instagram-band";

export function PortfolioContent({ lang }: { lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div className="container-x py-24">
      <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {t.portfolio.eyebrow}
      </p>
      <h1 className="mt-7 text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{t.portfolio.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.portfolio.lead}</p>

      <div className="mt-16">
        <PortfolioGallery items={portfolioItems} lang={lang} />
      </div>

      <InstagramBand lang={lang} />
    </div>
  );
}
