import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

const title = "Contact | Marketing agency in Guadalajara";
const description =
  "Tell us about your project: websites, SEO, AI, social media, funnels, photo and video. Reach us on WhatsApp, email, or the form below.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/contact" },
  alternates: { canonical: "/en/contact", languages: { es: "/contacto", en: "/en/contact" } },
};

export default function ContactPageEn() {
  return <ContactForm lang="en" />;
}
