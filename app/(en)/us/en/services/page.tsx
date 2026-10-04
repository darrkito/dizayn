import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
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
  return (
    <>
      <JsonLd data={hubPageSchema("services", { path: "/us/en/services", name: title, description, lang: "en", market: "us" })} />
      <ServicesContent lang="en" market="us" />
    </>
  );
}
