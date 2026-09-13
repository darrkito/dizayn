"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PRICE_ROWS } from "@/content/us-pricing";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { usPath } from "@/lib/routes";

/** US-only page — no MX equivalent, so unlike the other market-aware components this
 * doesn't take a `market` prop; it always renders the usPricing dict namespace. */
export function PricingContent({ lang }: { lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const p = t.usPricing;

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <section className="container-x py-24">
        <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {p.eyebrow}
        </p>
        <h1 className="mt-7 text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.lead}</p>
      </section>

      <section className="rule">
        <div className="container-x overflow-x-auto py-16">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="py-4 pr-6 font-medium">{p.table.service}</th>
                <th className="py-4 pr-6 font-medium text-primary">{p.table.ours}</th>
                <th className="py-4 font-medium">{p.table.usMarket}</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_ROWS.map((row) => (
                <tr key={row.slug} className="border-b border-border">
                  <td className="py-5 pr-6 font-display text-lg">{row.service[lang]}</td>
                  <td className="py-5 pr-6">
                    <span className="text-lg font-semibold text-primary">${row.ours.replace("$", "")}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{row.unit[lang]}</span>
                  </td>
                  <td className="py-5 text-muted-foreground">{row.usMarket[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 max-w-2xl text-xs text-muted-foreground">{p.note}</p>
        </div>
      </section>

      <section className="container-x py-24">
        <Link href={usPath("/contacto", lang)} className="btn-primary">
          {p.cta}
        </Link>
      </section>
    </div>
  );
}
