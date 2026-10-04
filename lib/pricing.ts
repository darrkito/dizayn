import { getMxPriceRow } from "@/content/mx-pricing";
import { getPriceRow } from "@/content/us-pricing";
import type { Market } from "@/lib/routes";
import type { PriceRange } from "@/lib/schema";

/** The machine-readable price range for a service in a market: MXN on MX pages, USD on /us. */
export function servicePrice(slug: string, market: Market): PriceRange | undefined {
  if (market === "us") {
    const row = getPriceRow(slug);
    return row && { min: row.minPriceUsd, max: row.maxPriceUsd, currency: "USD", billing: row.billingIncrement };
  }
  const row = getMxPriceRow(slug);
  return row && { min: row.minPrice, max: row.maxPrice, currency: "MXN", billing: row.billing };
}
