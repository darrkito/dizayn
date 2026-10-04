import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { ContactForm } from "@/components/contact/contact-form";
import { buildAlternates } from "@/lib/routes";

const title = "Contact | Nearshore Agency for US Businesses";
const description =
  "Tell us about your project: websites, SEO, GEO, social media and sales funnels. Same-business-day reply, on your schedule, USD quote.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/us/en/contact" }),
  alternates: buildAlternates("/contacto", "en-US"),
};

export default function UsContactPageEn() {
  return (
    <>
      <JsonLd data={hubPageSchema("contact", { path: "/us/en/contact", name: title, description, lang: "en", market: "us" })} />
      <ContactForm lang="en" market="us" />
    </>
  );
}
