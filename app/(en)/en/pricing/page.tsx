import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { PricingContent } from "@/components/pricing/pricing-content";
import { buildAlternates } from "@/lib/routes";

const title = "Marketing pricing in Guadalajara (MXN)";
const description =
  "What it costs in Guadalajara: websites from $8,000, SEO from $8,000 a month, social media from $6,000 a month. Real ranges in Mexican pesos per service.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/en/pricing" }),
  alternates: buildAlternates("/precios", "en-MX"),
};

export default function PricingPageEn() {
  return (
    <>
      <JsonLd data={hubPageSchema("pricing", { path: "/en/pricing", name: title, description, lang: "en", market: "mx" })} />
      <PricingContent lang="en" market="mx" />
    </>
  );
}
