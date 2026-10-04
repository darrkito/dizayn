import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { BlogListContent } from "@/components/blog/blog-list-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "Guías para Negocios en EE.UU.";
const ogTitle = "Guías para Negocios en EE.UU. | Dizayn";
const description =
  "Precios reales, cómo pagar, y nearshore vs. offshore vs. agencia local — guías escritas para negocios en Estados Unidos.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/us/blog" }),
  alternates: buildUsOnlyAlternates("/blog", "es-US"),
};

export default function UsBlogPage() {
  return (
    <>
      <JsonLd data={hubPageSchema("blog", { path: "/us/blog", name: title, description, lang: "es", market: "us" })} />
      <BlogListContent lang="es" market="us" />
    </>
  );
}
