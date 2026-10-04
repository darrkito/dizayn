import type { Metadata } from "next";
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
  return <BlogListContent lang="es" />;
}
