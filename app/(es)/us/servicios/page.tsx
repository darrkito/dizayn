import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { ServicesContent } from "@/components/services/services-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

// Same title.template caveat as app/(es)/us/page.tsx: do not hardcode the brand suffix here.
const title = "Servicios para negocios en EE.UU.";
const description =
  "Sitios web, SEO, GEO, redes sociales y embudos de venta para negocios en Estados Unidos. Equipo bilingüe en Guadalajara, precios en USD.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/us/servicios" }),
  alternates: buildUsOnlyAlternates("/servicios", "es-US"),
};

export default function UsServiciosPage() {
  return <ServicesContent lang="es" market="us" />;
}
