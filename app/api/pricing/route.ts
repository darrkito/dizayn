import { PRICE_ROWS } from "@/content/us-pricing";
import { MX_PRICE_ROWS } from "@/content/mx-pricing";
import { apiJson, getLang } from "@/lib/api-response";

// Top-level fields stay the US (USD) rate card for existing consumers; the Mexican MXN rate
// card (content/mx-pricing.ts, /precios) is added alongside under `mxn`.
export async function GET(request: Request) {
  const lang = getLang(request);
  return apiJson({
    currency: "USD",
    note: "Real, sourced pricing (2026). Payment: PayPal (credit/debit card), bank wire transfer, or crypto (BTC, USDC, USDT). W-8BEN-E provided for US tax purposes.",
    rows: PRICE_ROWS.map((r) => ({
      slug: r.slug,
      service: r.service[lang],
      dizaynUsd: r.ours,
      usMarketAverageUsd: r.usMarket[lang],
      billing: r.unit[lang],
      minPriceUsd: r.minPriceUsd,
      maxPriceUsd: r.maxPriceUsd,
    })),
    mxn: {
      currency: "MXN",
      market: "Mexico (Guadalajara)",
      note: "Real MXN ranges before VAT (2026), ad spend not included. Breakdown: https://dizayn.com.mx/precios",
      rows: MX_PRICE_ROWS.map((r) => ({
        slug: r.slug,
        service: r.service[lang],
        range: `${r.range} MXN`,
        billing: r.unit[lang],
        tiers: r.tiers[lang],
        minPriceMxn: r.minPrice,
        maxPriceMxn: r.maxPrice,
      })),
    },
  });
}
