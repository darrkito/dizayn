import { PRICE_ROWS } from "@/content/us-pricing";
import { apiJson, getLang } from "@/lib/api-response";

// US-only pricing (no MX equivalent — see /api/services for MXN-implied MX pricing,
// which has no published numbers on the site at all outside a few blog posts).
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
  });
}
