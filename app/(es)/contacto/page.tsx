import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { ContactForm } from "@/components/contact/contact-form";
import { buildAlternates } from "@/lib/routes";

const title = "Contacto | Agencia de marketing en Guadalajara";
const description =
  "Cuéntanos de tu proyecto: sitios web, SEO, IA, redes sociales, embudos, foto y video. Escríbenos por WhatsApp, correo o desde el formulario.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/contacto" }),
  alternates: buildAlternates("/contacto", "es-MX"),
};

export default function ContactoPage() {
  return <ContactForm lang="es" />;
}
