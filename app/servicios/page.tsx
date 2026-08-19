import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/services-content";

const title = "Servicios de marketing digital | Dizayn Guadalajara";
const description =
  "Sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. Todos los servicios de Dizayn en Guadalajara y México.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/servicios" },
  alternates: { canonical: "/servicios", languages: { es: "/servicios", en: "/en/services" } },
};

export default function ServiciosPage() {
  return <ServicesContent lang="es" />;
}
