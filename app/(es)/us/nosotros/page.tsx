import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { AboutContent } from "@/components/about/about-content";
import { buildAlternates } from "@/lib/routes";

const title = "Sobre Dizayn, agencia nearshore para EE.UU.";
const description =
  "Dizayn es un equipo creativo con base en Guadalajara que atiende negocios en Estados Unidos, en inglés y en español, desde hace años.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/us/nosotros" }),
  alternates: buildAlternates("/nosotros", "es-US"),
};

export default function UsNosotrosPage() {
  return (
    <>
      <JsonLd data={hubPageSchema("about", { path: "/us/nosotros", name: title, description, lang: "es", market: "us" })} />
      <AboutContent lang="es" market="us" />
    </>
  );
}
