import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

const title = "Photography, video and design portfolio";
const ogTitle = "Photography, video and design portfolio | Dizayn";
const description =
  "Browse Dizayn's portfolio: product and food photography, brand video and reels, and design and identity projects from Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/en/portfolio" },
  alternates: { canonical: "/en/portfolio", languages: { es: "/portafolio", en: "/en/portfolio" } },
};

export default function PortfolioPageEn() {
  return <PortfolioContent lang="en" />;
}
