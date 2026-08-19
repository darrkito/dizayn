import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

const title = "Contacto | Dizayn, agencia de marketing en Guadalajara";
const description =
  "Cuéntanos de tu proyecto: sitios web, SEO, IA, redes sociales, embudos, foto y video. Escríbenos por WhatsApp, correo o desde el formulario.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/contacto" },
  alternates: { canonical: "/contacto", languages: { es: "/contacto", en: "/en/contacto" } },
};

export default function ContactoPage() {
  return <ContactForm lang="es" />;
}
