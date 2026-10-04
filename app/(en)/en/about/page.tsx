import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { AboutContent } from "@/components/about/about-content";
import { buildAlternates } from "@/lib/routes";

const title = "About Dizayn, a creative agency in Guadalajara";
const description =
  "Dizayn is a creative team based in Guadalajara, Jalisco: strategy, design, audiovisual production and digital growth for Mexico and the world.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/en/about" }),
  alternates: buildAlternates("/nosotros", "en-MX"),
};

export default function AboutPageEn() {
  return <AboutContent lang="en" />;
}
