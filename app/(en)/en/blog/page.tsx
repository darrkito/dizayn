import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { buildAlternates } from "@/lib/routes";
import { BlogListContent } from "@/components/blog/blog-list-content";

const title = "Marketing, Design & SEO Blog";
const description =
  "Guides on digital marketing, web design, SEO and AI search positioning, written by the Dizayn team in Guadalajara.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/en/blog" }),
  alternates: buildAlternates("/blog", "en-MX", { us: false }),
};

export default function BlogPageEn() {
  return (
    <>
      <JsonLd data={hubPageSchema("blog", { path: "/en/blog", name: title, description, lang: "en", market: "mx" })} />
      <BlogListContent lang="en" />
    </>
  );
}
