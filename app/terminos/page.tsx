import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Términos y Condiciones | Dizayn";
const description = "Términos y condiciones de los servicios de Dizayn: cotizaciones, entregables, cancelaciones y propiedad del trabajo.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/terminos" },
  alternates: { canonical: "/terminos", languages: { es: "/terminos", en: "/en/terms-and-conditions" } },
};

export default function TerminosPage() {
  return <LegalContent doc="terms" lang="es" />;
}
