import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { BlogListContent } from "@/components/blog/blog-list-content";

const title = "Blog de marketing, diseño y SEO";
const description =
  "Guías sobre marketing digital, diseño web, SEO y posicionamiento en IA, escritas por el equipo de Dizayn en Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/blog" }),
  alternates: buildAlternates("/blog", "es-MX", { us: false }),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={hubPageSchema("blog", { path: "/blog", name: title, description, lang: "es", market: "mx" })} />
      <BlogListContent lang="es" />
    </>
  );
}
