import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { ContactForm } from "@/components/contact/contact-form";
import { buildAlternates } from "@/lib/routes";

const title = "Contact | Marketing agency in Guadalajara";
const description =
  "Tell us about your project: websites, SEO, AI, social media, funnels, photo and video. Reach us on WhatsApp, email, or the form below.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/en/contact" }),
  alternates: buildAlternates("/contacto", "en-MX"),
};

export default function ContactPageEn() {
  return <ContactForm lang="en" />;
}
