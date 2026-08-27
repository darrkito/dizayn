import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Aviso de Privacidad | Dizayn";
const description = "Aviso de privacidad de Dizayn: qué datos personales recabamos, para qué los usamos y cómo ejerces tus derechos ARCO.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/privacidad" },
  alternates: { canonical: "/privacidad", languages: { es: "/privacidad", en: "/en/privacy-policy" } },
};

export default function PrivacidadPage() {
  return <LegalContent doc="privacy" lang="es" />;
}
