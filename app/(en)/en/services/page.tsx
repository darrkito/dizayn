import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { ServicesContent } from "@/components/services/services-content";

const title = "Digital marketing services in Guadalajara";
const ogTitle = "Digital marketing services | Dizayn Guadalajara";
const description =
  "Websites, SEO, AI visibility, social media, sales funnels, photography and video. All of Dizayn's services in Guadalajara and Mexico.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/en/services" }),
  alternates: buildAlternates("/servicios", "en-MX", { us: false }),
};

export default function ServicesPageEn() {
  return (
    <>
      <JsonLd data={hubPageSchema("services", { path: "/en/services", name: title, description, lang: "en", market: "mx" })} />
      <ServicesContent lang="en" />
    </>
  );
}
