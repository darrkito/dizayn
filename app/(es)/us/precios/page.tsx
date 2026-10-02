import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/pricing-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "Precios en USD para Negocios en EE.UU.";
const ogTitle = "Precios en USD para Negocios en EE.UU. | Dizayn";
const description =
  "Precios reales de Dizayn en dólares vs. el promedio del mercado en Estados Unidos: sitios web, SEO, GEO, redes sociales y embudos de venta.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/us/precios", images: ["/og-image.jpg"] },
  alternates: buildUsOnlyAlternates("/precios", "es-US"),
};

export default function UsPricingPage() {
  return <PricingContent lang="es" />;
}
