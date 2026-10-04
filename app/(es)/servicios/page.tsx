import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { ServicesContent } from "@/components/services/services-content";

const title = "Servicios de marketing digital en Guadalajara";
const ogTitle = "Servicios de marketing digital | Dizayn Guadalajara";
const description =
  "Sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. Todos los servicios de Dizayn en Guadalajara y México.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/servicios" }),
  alternates: buildAlternates("/servicios", "es-MX", { us: false }),
};

export default function ServiciosPage() {
  return (
    <>
      <JsonLd data={hubPageSchema("services", { path: "/servicios", name: title, description, lang: "es", market: "mx" })} />
      <ServicesContent lang="es" />
    </>
  );
}
