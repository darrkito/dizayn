import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";

const title = "Marketing, Design & SEO Blog";
const description =
  "Guides on digital marketing, web design, SEO and AI search positioning, written by the Dizayn team in Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/blog", images: ["/og-image.jpg"] },
  alternates: { canonical: "/en/blog", languages: { es: "/blog", en: "/en/blog" } },
};

export default function BlogPageEn() {
  return <BlogListContent lang="en" />;
}
