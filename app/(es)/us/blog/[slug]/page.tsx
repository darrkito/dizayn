import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { buildUsOnlyAlternates } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, blogPostingNode, faqPage } from "@/lib/schema";

export function generateStaticParams() {
  return usBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getUsPost(slug);
  if (!post) return { title: "Artículo no encontrado", robots: { index: false } };

  const { metaTitle, metaDescription } = post.es;
  return {
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "article", url: `/us/blog/${slug}`, publishedTime: post.date, modifiedTime: post.dateModified, section: post.es.category, image: ogImagePath("blog", "us", "es", post.slug) }),
    alternates: buildUsOnlyAlternates(`/blog/${slug}`, "es-US"),
  };
}

export default async function UsBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getUsPost(slug);
  if (!post) notFound();

  const path = `/us/blog/${slug}`;
  const article = blogPostingNode({ post, lang: "es", market: "us", path, image: ogImagePath("blog", "us", "es", post.slug) });

  return (
    <>
      <JsonLd data={[article, faqPage(post.es.faq, abs(path))]} />
      <BlogPostContent slug={slug} lang="es" market="us" />
    </>
  );
}
