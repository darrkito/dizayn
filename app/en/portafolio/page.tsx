import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

const title = "Photography, video and design portfolio | Dizayn";
const description =
  "Browse Dizayn's portfolio: product and food photography, brand video and reels, and design and identity projects from Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/portafolio" },
  alternates: { canonical: "/en/portafolio", languages: { es: "/portafolio", en: "/en/portafolio" } },
};

export default function PortafolioPageEn() {
  return <PortfolioContent lang="en" />;
}
