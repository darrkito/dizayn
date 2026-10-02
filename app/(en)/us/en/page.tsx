import type { Metadata } from "next";
import { HomeContent } from "@/components/home/home-content";
import { buildAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "Nearshore Marketing Agency for US Businesses";
const ogTitle = "Dizayn | Nearshore Marketing Agency for US Businesses";
const description =
  "Nearshore agency from Guadalajara for US businesses: websites, SEO, GEO, social media and sales funnels. USD pricing, bilingual team.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/us/en", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/", "en-US"),
};

export default function UsHomePageEn() {
  return <HomeContent lang="en" market="us" />;
}
