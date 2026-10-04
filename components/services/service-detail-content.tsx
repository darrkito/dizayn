"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getService, services } from "@/content/services";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { langPath, usPath, type Market } from "@/lib/routes";
import { WhatsAppBand } from "@/components/site/whatsapp-band";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { formatDate } from "@/components/blog/blog-card";
import { getMxPriceRow } from "@/content/mx-pricing";
import { getPriceRow } from "@/content/us-pricing";

export type RelatedPost = { href: string; title: string; category: string };

export function ServiceDetailContent({
  slug,
  lang,
  market = "mx",
  related = [],
}: {
  slug: string;
  lang: Lang;
  market?: Market;
  /** Resolved server-side (page.tsx) so the full blog content never ships in this client bundle. */
  related?: RelatedPost[];
}) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));
  const service = getService(slug)!;
  const copy = isUs ? service.us![lang] : service[lang];
  const mxPrice = isUs ? undefined : getMxPriceRow(slug);
  const usPrice = isUs ? getPriceRow(slug) : undefined;
  const others = (isUs ? services.filter((s) => s.us) : services).filter((s) => s.slug !== slug).slice(0, 3);

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <section className="container-x py-8 md:py-20">
        <Breadcrumbs
          label={t.nav.breadcrumb}
          items={[
            { label: t.nav.home, href: path("/") },
            { label: t.nav.services, href: path("/servicios") },
            { label: copy.name, href: path(`/servicios/${slug}`) },
          ]}
        />
        <p className="mt-6 text-xs tracking-[0.2em] text-primary md:mt-10">{service.number}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,7vw,5rem)] leading-[0.95]">{copy.metaTitle}</h1>
        <p className="mt-6 max-w-2xl font-display text-xl text-primary">{copy.tagline}</p>
        {copy.answer && <p className="mt-6 max-w-2xl text-lg text-foreground">{copy.answer}</p>}
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">{copy.intro}</p>
        {service.updated && (
          <p className="mt-4 text-xs text-muted-foreground">
            {t.services.updated} <time dateTime={service.updated}>{formatDate(service.updated, lang)}</time>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <WhatsAppCTA label={t.nav.waCta} place="service_hero" />
          <Link href={path("/contacto")} className="btn-ghost">
            {t.nav.formCta}
          </Link>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.includes}</h2>
          <ul className="grid gap-px bg-border sm:grid-cols-2">
            {copy.includes.map((i) => (
              <li key={i} className="bg-background p-5 text-sm text-muted-foreground">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(mxPrice || usPrice) && (
        <section className="rule">
          <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
            <h2 className="font-display text-2xl">{t.services.price}</h2>
            <div>
              <p className="font-display text-3xl text-primary md:text-4xl">
                {mxPrice ? `${mxPrice.range} MXN` : `${usPrice!.ours} USD`}
                <span className="ml-3 align-middle font-sans text-sm text-muted-foreground">
                  {(mxPrice ?? usPrice)!.unit[lang]}
                </span>
              </p>
              {mxPrice && (
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {mxPrice.tiers[lang].map((tier) => (
                    <li key={tier} className="border-l-2 border-primary/40 pl-4">
                      {tier}
                    </li>
                  ))}
                </ul>
              )}
              <Link href={path("/precios")} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline">
                {t.services.priceLink} →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.process}</h2>
          <ol className="space-y-8">
            {copy.process.map((p, idx) => (
              <li key={p.title} className="flex gap-6">
                <span className="text-xs tracking-[0.2em] text-primary">{String(idx + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.forWho}</h2>
          <ul className="space-y-4">
            {copy.forWho.map((f) => (
              <li key={f} className="border-l-2 border-primary pl-5 text-lg">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.faq}</h2>
          <dl className="space-y-8">
            {copy.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-lg">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section className="rule">
          <div className="container-x py-16">
            <h2 className="font-display text-2xl">{t.services.related}</h2>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="bg-background p-6 transition-colors hover:bg-card">
                  <span className="text-xs uppercase tracking-[0.18em] text-primary">{r.category}</span>
                  <h3 className="mt-3 font-display text-lg leading-snug">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsAppBand lang={lang} place="service_band" />

      <section className="rule">
        <div className="container-x py-16">
          <h2 className="font-display text-2xl">{t.services.other}</h2>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            {others.map((o) => {
              const oCopy = isUs ? o.us![lang] : o[lang];
              return (
                <Link
                  key={o.slug}
                  href={path(`/servicios/${o.slug}`)}
                  className="bg-background p-6 transition-colors hover:bg-card"
                >
                  <h3 className="font-display text-xl">{oCopy.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{oCopy.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
