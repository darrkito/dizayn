"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExploreLinks } from "@/components/site/inline-links";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { langPath, usPath, type Market, marketPath } from "@/lib/routes";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export function AboutContent({ lang, market = "mx" }: { lang: Lang; market?: Market }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  const about = isUs ? t.usAbout : t.about;
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <section className="container-x py-10 md:py-24">
        <Breadcrumbs
          label={t.nav.breadcrumb}
          className="mb-6 md:mb-8"
          items={[
            { label: t.nav.home, href: marketPath("/", lang, market) },
            { label: t.nav.about, href: marketPath("/nosotros", lang, market) },
          ]}
        />
        <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-text">
          {about.eyebrow}
        </p>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{about.title}</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{about.lead}</p>
        <ExploreLinks lang={lang} market={market} />
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-primary">{about.p1title}</h2>
            <p className="mt-4 text-muted-foreground">{about.p1}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-primary">{about.p2title}</h2>
            <p className="mt-4 text-muted-foreground">{about.p2}</p>
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="container-x py-16">
          <h2 className="font-display text-2xl">{about.valuesTitle}</h2>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <div key={v.k} className="bg-background p-6">
                <h3 className="font-display text-xl">{v.k}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x flex flex-col gap-3 py-14 sm:flex-row md:py-24">
        <WhatsAppCTA label={t.nav.waCta} place="about" />
        <Link href={path("/contacto")} className="btn-ghost">
          {about.cta}
        </Link>
      </section>
    </div>
  );
}
