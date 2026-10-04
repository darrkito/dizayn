"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PRICE_ROWS } from "@/content/us-pricing";
import { MX_PRICE_ROWS } from "@/content/mx-pricing";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { marketPath, type Market } from "@/lib/routes";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

/** Pricing page for both markets: MXN rate card with tiers on /precios and /en/pricing, USD vs.
 * US-market-average table on /us/precios and /us/en/pricing. */
export function PricingContent({ lang, market = "us" }: { lang: Lang; market?: Market }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  const p = isUs ? t.usPricing : t.pricing;
  const path = (esPath: string) => marketPath(esPath, lang, market);

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
            { label: t.nav.home, href: path("/") },
            { label: t.nav.pricing, href: path("/precios") },
          ]}
        />
        <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-text">
          {p.eyebrow}
        </p>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.lead}</p>
      </section>

      <section className="rule">
        <div className="container-x overflow-x-auto py-16">
          {isUs ? (
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="py-4 pr-6 font-medium">{t.usPricing.table.service}</th>
                  <th className="py-4 pr-6 font-medium text-primary">{t.usPricing.table.ours}</th>
                  <th className="py-4 font-medium">{t.usPricing.table.usMarket}</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((row) => (
                  <tr key={row.slug} className="border-b border-border">
                    <td className="py-5 pr-6 font-display text-lg">
                      <Link href={path(`/servicios/${row.slug}`)} className="hover:text-primary">
                        {row.service[lang]}
                      </Link>
                    </td>
                    <td className="py-5 pr-6">
                      <span className="text-lg font-semibold text-primary">${row.ours.replace("$", "")}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{row.unit[lang]}</span>
                    </td>
                    <td className="py-5 text-muted-foreground">{row.usMarket[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Stays a real <table> (easiest structure for search snippets and LLMs to extract), but
            // rows stack as cards below md so the tiers column isn't scrolled off-screen on phones.
            <table className="block w-full border-collapse text-sm md:table">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="py-4 pr-6 font-medium">{t.pricing.table.service}</th>
                  <th className="py-4 pr-6 font-medium text-primary">{t.pricing.table.range}</th>
                  <th className="py-4 font-medium">{t.pricing.table.detail}</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {MX_PRICE_ROWS.map((row) => (
                  <tr key={row.slug} className="block border-b border-border py-5 align-top md:table-row md:py-0">
                    <td className="block md:table-cell md:py-5 md:pr-6">
                      <Link href={path(`/servicios/${row.slug}`)} className="font-display text-lg hover:text-primary">
                        {row.service[lang]}
                      </Link>
                    </td>
                    <td className="block pt-2 md:table-cell md:whitespace-nowrap md:py-5 md:pr-6">
                      <span className="text-lg font-semibold text-primary">{row.range} MXN</span>
                      <span className="block text-xs text-muted-foreground">{row.unit[lang]}</span>
                    </td>
                    <td className="block pt-3 text-muted-foreground md:table-cell md:py-5">
                      <ul className="space-y-1">
                        {row.tiers[lang].map((tier) => (
                          <li key={tier}>{tier}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="mt-6 max-w-2xl text-xs text-muted-foreground">{p.note}</p>
        </div>
      </section>

      <section className="container-x flex flex-col gap-3 py-14 sm:flex-row md:py-24">
        <WhatsAppCTA label={t.nav.waCta} place="pricing" />
        <Link href={path("/contacto")} className="btn-ghost">
          {p.cta}
        </Link>
      </section>
    </div>
  );
}
