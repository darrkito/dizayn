import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
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
  return (
    <>
      <JsonLd data={hubPageSchema("about", { path: "/nosotros", name: title, description, lang: "es", market: "mx" })} />
      <AboutContent lang="es" />
    </>
  );
}
