import type { Metadata } from "next";
import { buildAlternates } from "@/lib/routes";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

const title = "Portafolio de fotografía, video y diseño";
const ogTitle = "Portafolio de fotografía, video y diseño | Dizayn";
const description =
  "Explora el portafolio de Dizayn: fotografía de producto y gastronomía, video de marca y reels, y proyectos de diseño e identidad desde Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/portafolio", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/portafolio", "es-MX", { us: false }),
};

export default function PortafolioPage() {
  return <PortfolioContent lang="es" />;
}
