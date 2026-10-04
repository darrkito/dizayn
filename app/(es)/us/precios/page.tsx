import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { PricingContent } from "@/components/pricing/pricing-content";
import { buildAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "Precios en USD para Negocios en EE.UU.";
const ogTitle = "Precios en USD para Negocios en EE.UU. | Dizayn";
const description =
  "Precios reales de Dizayn en dólares vs. el promedio del mercado en Estados Unidos: sitios web, SEO, GEO, redes sociales y embudos de venta.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/us/precios" }),
  alternates: buildAlternates("/precios", "es-US"),
};

export default function UsPricingPage() {
  return (
    <>
      <JsonLd data={hubPageSchema("pricing", { path: "/us/precios", name: title, description, lang: "es", market: "us" })} />
      <PricingContent lang="es" market="us" />
    </>
  );
}
