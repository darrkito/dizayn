import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { buildAlternates } from "@/lib/routes";

const title = "Contacto | Agencia nearshore para EE.UU.";
const description =
  "Cuéntanos de tu proyecto: sitios web, SEO, GEO, redes sociales y embudos de venta. Respuesta el mismo día hábil, en tu horario, cotización en USD.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/us/contacto", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/contacto", "es-US"),
};

export default function UsContactoPage() {
  return <ContactForm lang="es" market="us" />;
}
