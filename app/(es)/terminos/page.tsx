import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Términos y condiciones";
const description = "Términos y condiciones de los servicios de Dizayn: cotizaciones, entregables, cancelaciones y propiedad del trabajo.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: og({ title, description, type: "website", url: "/terminos" }),
  alternates: buildAlternates("/terminos", "es-MX", { us: false }),
};

export default function TerminosPage() {
  return <LegalContent doc="terms" lang="es" />;
}
