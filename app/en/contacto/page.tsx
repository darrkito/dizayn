import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

const title = "Contact | Dizayn, marketing agency in Guadalajara";
const description =
  "Tell us about your project: websites, SEO, AI, social media, funnels, photo and video. Reach us on WhatsApp, email, or the form below.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/contacto" },
  alternates: { canonical: "/en/contacto", languages: { es: "/contacto", en: "/en/contacto" } },
};

export default function ContactoPageEn() {
  return <ContactForm lang="en" />;
}
