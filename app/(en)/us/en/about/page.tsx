import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";
import { buildAlternates } from "@/lib/routes";

const title = "About Dizayn, a nearshore agency for US businesses";
const description =
  "Dizayn is a creative team based in Guadalajara serving US businesses, in English and Spanish, for years.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/us/en/about", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/nosotros", "en-US"),
};

export default function UsAboutPageEn() {
  return <AboutContent lang="en" market="us" />;
}
