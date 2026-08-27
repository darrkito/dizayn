import type { Metadata } from "next";
import { HomeContent } from "@/components/home/home-content";

// Next.js does NOT apply the root layout's title.template to a page.tsx colocated at the exact
// same route segment as the layout that defines it (only to nested segments like /servicios) —
// so unlike every other page in this app, the home page must include " | Dizayn" itself.
const title = "Dizayn | Agencia de marketing en Guadalajara";
const description =
  "Agencia de marketing en Guadalajara: sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. México y el mundo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/", images: ["/og-image.jpg"] },
  alternates: { canonical: "/", languages: { es: "/", en: "/en" } },
};

export default function HomePage() {
  return <HomeContent lang="es" />;
}
