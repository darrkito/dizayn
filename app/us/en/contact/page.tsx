import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { buildAlternates } from "@/lib/routes";

const title = "Contact | Nearshore Agency for US Businesses";
const description =
  "Tell us about your project: websites, SEO, GEO, social media and sales funnels. Same-business-day reply, on your schedule, USD quote.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/us/en/contact", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/contacto", "en-US"),
};

export default function UsContactPageEn() {
  return <ContactForm lang="en" market="us" />;
}
