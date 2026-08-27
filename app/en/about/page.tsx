import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

const title = "About Dizayn, a creative agency in Guadalajara";
const description =
  "Dizayn is a creative team based in Guadalajara, Jalisco: strategy, design, audiovisual production and digital growth for Mexico and the world.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/about", images: ["/og-image.jpg"] },
  alternates: { canonical: "/en/about", languages: { es: "/nosotros", en: "/en/about" } },
};

export default function AboutPageEn() {
  return <AboutContent lang="en" />;
}
