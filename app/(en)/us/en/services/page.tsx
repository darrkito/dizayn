import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { ServicesContent } from "@/components/services/services-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

const title = "Services for US businesses";
const description =
  "Websites, SEO, GEO, social media and sales funnels for US businesses. Bilingual team in Guadalajara, USD pricing.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/us/en/services" }),
  alternates: buildUsOnlyAlternates("/servicios", "en-US"),
};

export default function UsServicesPageEn() {
  return <ServicesContent lang="en" market="us" />;
}
