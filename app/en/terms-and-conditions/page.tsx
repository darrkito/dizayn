import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Terms & Conditions | Dizayn";
const description = "Dizayn's terms and conditions: quotes, deliverables, cancellations, and ownership of work.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/en/terms-and-conditions" },
  alternates: { canonical: "/en/terms-and-conditions", languages: { es: "/terminos", en: "/en/terms-and-conditions" } },
};

export default function TermsPage() {
  return <LegalContent doc="terms" lang="en" />;
}
