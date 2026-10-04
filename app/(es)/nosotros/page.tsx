import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { AboutContent } from "@/components/about/about-content";
import { buildAlternates } from "@/lib/routes";

const title = "Sobre Dizayn, agencia creativa en Guadalajara";
const description =
  "Dizayn es un equipo creativo con base en Guadalajara, Jalisco: estrategia, diseño, producción audiovisual y crecimiento digital para México y el mundo.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/nosotros" }),
  alternates: buildAlternates("/nosotros", "es-MX"),
};

export default function NosotrosPage() {
  return <AboutContent lang="es" />;
}
