import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/legal-content";

const title = "Privacy Policy | Dizayn";
const description = "Dizayn's privacy policy: what personal data we collect, how we use it, and how to exercise your data rights.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/en/privacy-policy" },
  alternates: { canonical: "/en/privacy-policy", languages: { es: "/privacidad", en: "/en/privacy-policy" } },
};

export default function PrivacyPolicyPage() {
  return <LegalContent doc="privacy" lang="en" />;
}
