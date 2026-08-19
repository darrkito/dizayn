import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

const title = "Portafolio de fotografía, video y diseño | Dizayn";
const description =
  "Explora el portafolio de Dizayn: fotografía de producto y gastronomía, video de marca y reels, y proyectos de diseño e identidad desde Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/portafolio" },
  alternates: { canonical: "/portafolio", languages: { es: "/portafolio", en: "/en/portafolio" } },
};

export default function PortafolioPage() {
  return <PortfolioContent lang="es" />;
}
