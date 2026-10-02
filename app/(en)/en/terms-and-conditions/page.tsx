import type { Metadata } from "next";
import { buildAlternates } from "@/lib/routes";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Terms & Conditions | Dizayn";
const description = "Dizayn's terms and conditions: quotes, deliverables, cancellations, and ownership of work.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/en/terms-and-conditions", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/terminos", "en-MX", { us: false }),
};

export default function TermsPage() {
  return <LegalContent doc="terms" lang="en" />;
}
