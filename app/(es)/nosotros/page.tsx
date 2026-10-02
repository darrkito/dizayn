import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";
import { buildAlternates } from "@/lib/routes";

const title = "Sobre Dizayn, agencia creativa en Guadalajara";
const description =
  "Dizayn es un equipo creativo con base en Guadalajara, Jalisco: estrategia, diseño, producción audiovisual y crecimiento digital para México y el mundo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/nosotros", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/nosotros", "es-MX"),
};

export default function NosotrosPage() {
  return <AboutContent lang="es" />;
}
