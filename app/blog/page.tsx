import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";

const title = "Blog de marketing, diseño y SEO";
const description =
  "Guías sobre marketing digital, diseño web, SEO y posicionamiento en IA, escritas por el equipo de Dizayn en Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/blog" },
  alternates: { canonical: "/blog", languages: { es: "/blog", en: "/en/blog" } },
};

export default function BlogPage() {
  return <BlogListContent lang="es" />;
}
