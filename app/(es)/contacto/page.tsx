import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
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
  return (
    <>
      <JsonLd data={hubPageSchema("contact", { path: "/contacto", name: title, description, lang: "es", market: "mx" })} />
      <ContactForm lang="es" />
    </>
  );
}
