import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Privacy policy";
const description = "Dizayn's privacy policy: what personal data we collect, how we use it, and how to exercise your data rights.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: og({ title, description, type: "website", url: "/en/privacy-policy" }),
  alternates: buildAlternates("/privacidad", "en-MX", { us: false }),
};

export default function PrivacyPolicyPage() {
  return <LegalContent doc="privacy" lang="en" />;
}
