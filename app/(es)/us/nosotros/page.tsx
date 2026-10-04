import type { Metadata } from "next";
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
  return <AboutContent lang="es" market="us" />;
}
