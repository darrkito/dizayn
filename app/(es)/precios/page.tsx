import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { PricingContent } from "@/components/pricing/pricing-content";
import { buildAlternates } from "@/lib/routes";

const title = "Precios de marketing digital en Guadalajara (MXN)";
const description =
  "Cuánto cuesta en Guadalajara: sitio web desde $8,000, SEO desde $8,000 al mes, redes sociales desde $6,000 al mes. Rangos reales en pesos por servicio.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/precios" }),
  alternates: buildAlternates("/precios", "es-MX"),
};

export default function PreciosPage() {
  return (
    <>
      <JsonLd data={hubPageSchema("pricing", { path: "/precios", name: title, description, lang: "es", market: "mx" })} />
      <PricingContent lang="es" market="mx" />
    </>
  );
}
