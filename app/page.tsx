import type { Metadata } from "next";
import { HomeContent } from "@/components/home/home-content";

const title = "Dizayn | Agencia de marketing en Guadalajara";
const description =
  "Agencia de marketing en Guadalajara: sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. México y el mundo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeContent />;
}
