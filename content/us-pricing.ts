/** Real, sourced USD rate card for the US market — see the 2026-09-13 competitor-pricing
 * research (Ahrefs, Clutch, WebFX, Marketing México et al.) this is built from. Kept as its
 * own data file, same pattern as content/services.ts, rather than folded into the i18n dict:
 * it's tabular data an LLM should be able to cite directly, not UI copy. */
export type PriceRow = {
  /** content/services.ts slug — lets a service page look up its own price row reliably,
   * instead of matching by array order or by name string. */
  slug: string;
  service: { es: string; en: string };
  ours: string;
  usMarket: { es: string; en: string };
  unit: { es: string; en: string };
  /** Machine-readable bounds for schema.org Offer/PriceSpecification — same numbers as
   * `ours`, without the currency symbol/formatting, since JSON-LD wants a bare number. */
  minPriceUsd: number;
  maxPriceUsd: number;
  billingIncrement: "project" | "month";
};

export const PRICE_ROWS: PriceRow[] = [
  {
    slug: "sitios-web",
    service: { es: "Sitio web", en: "Website" },
    ours: "$3,000 – $15,000",
    usMarket: { es: "$2,000 – $15,000+", en: "$2,000 – $15,000+" },
    unit: { es: "por proyecto", en: "per project" },
    minPriceUsd: 3000,
    maxPriceUsd: 15000,
    billingIncrement: "project",
  },
  {
    slug: "seo",
    service: { es: "SEO", en: "SEO" },
    ours: "$1,200 – $4,000",
    usMarket: { es: "$3,209 promedio", en: "$3,209 average" },
    unit: { es: "al mes", en: "per month" },
    minPriceUsd: 1200,
    maxPriceUsd: 4000,
    billingIncrement: "month",
  },
  {
    slug: "posicionamiento-ia",
    service: { es: "GEO (posicionamiento en IA)", en: "GEO (AI visibility)" },
    ours: "$1,800 – $5,000",
    usMarket: { es: "desde $3,000", en: "from $3,000" },
    unit: { es: "al mes", en: "per month" },
    minPriceUsd: 1800,
    maxPriceUsd: 5000,
    billingIncrement: "month",
  },
  {
    slug: "redes-sociales",
    service: { es: "Redes sociales", en: "Social media" },
    ours: "$900 – $3,000",
    usMarket: { es: "$2,500 – $7,500", en: "$2,500 – $7,500" },
    unit: { es: "al mes", en: "per month" },
    minPriceUsd: 900,
    maxPriceUsd: 3000,
    billingIncrement: "month",
  },
  {
    slug: "embudos-de-venta",
    service: { es: "Embudos de venta", en: "Sales funnels" },
    ours: "$3,000 – $8,000",
    usMarket: { es: "$6,300 – $19,000", en: "$6,300 – $19,000" },
    unit: { es: "por proyecto", en: "per project" },
    minPriceUsd: 3000,
    maxPriceUsd: 8000,
    billingIncrement: "project",
  },
];

export const getPriceRow = (slug: string) => PRICE_ROWS.find((r) => r.slug === slug);
