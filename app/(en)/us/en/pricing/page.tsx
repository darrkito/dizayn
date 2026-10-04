import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { PricingContent } from "@/components/pricing/pricing-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "USD Pricing for US Businesses";
const ogTitle = "USD Pricing for US Businesses | Dizayn";
const description =
  "Dizayn's real USD pricing vs. the US market average: websites, SEO, GEO, social media and sales funnels.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/us/en/pricing" }),
  alternates: buildUsOnlyAlternates("/precios", "en-US"),
};

export default function UsPricingPageEn() {
  return <PricingContent lang="en" />;
}
