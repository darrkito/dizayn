import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { HomeContent } from "@/components/home/home-content";
import { buildAlternates } from "@/lib/routes";

// Unlike app/page.tsx (the exact-same-segment exception, see its own comment), this page
// is nested under app/us/ so the root layout's title.template DOES apply — the brand suffix
// must NOT be hardcoded here or it doubles up ("...| Dizayn | Dizayn"). OG gets its own
// branded variant since it isn't template-wrapped.
const title = "Agencia Nearshore para Negocios en EE.UU.";
const ogTitle = "Dizayn | Agencia Nearshore para Negocios en EE.UU.";
const description =
  "Agencia nearshore desde Guadalajara para negocios en Estados Unidos: sitios web, SEO, GEO, redes sociales y embudos de venta. Precios en USD, equipo bilingüe.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/us" }),
  alternates: buildAlternates("/", "es-US"),
};

export default function UsHomePage() {
  return <HomeContent lang="es" market="us" />;
}
