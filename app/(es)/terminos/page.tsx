import type { Metadata } from "next";
import { buildAlternates } from "@/lib/routes";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Términos y Condiciones | Dizayn";
const description = "Términos y condiciones de los servicios de Dizayn: cotizaciones, entregables, cancelaciones y propiedad del trabajo.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/terminos", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/terminos", "es-MX", { us: false }),
};

export default function TerminosPage() {
  return <LegalContent doc="terms" lang="es" />;
}
