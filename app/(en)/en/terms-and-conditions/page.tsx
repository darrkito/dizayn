import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Terms and conditions";
const description = "Dizayn's terms and conditions: quotes, deliverables, cancellations, and ownership of work.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: og({ title, description, type: "website", url: "/en/terms-and-conditions" }),
  alternates: buildAlternates("/terminos", "en-MX", { us: false }),
};

export default function TermsPage() {
  return <LegalContent doc="terms" lang="en" />;
}
