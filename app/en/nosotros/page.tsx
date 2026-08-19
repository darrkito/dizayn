import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

const title = "About Dizayn, a creative agency in Guadalajara | Dizayn";
const description =
  "Dizayn is a creative team based in Guadalajara, Jalisco: strategy, design, audiovisual production and digital growth for Mexico and the world.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/nosotros" },
  alternates: { canonical: "/en/nosotros", languages: { es: "/nosotros", en: "/en/nosotros" } },
};

export default function NosotrosPageEn() {
  return <AboutContent lang="en" />;
}
