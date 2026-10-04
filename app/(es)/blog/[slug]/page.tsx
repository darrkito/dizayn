import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/content/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { buildAlternates } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, blogPostingNode, faqPage } from "@/lib/schema";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo no encontrado", robots: { index: false } };

  const { metaTitle, metaDescription } = post.es;
  return {
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "article", url: `/blog/${slug}`, publishedTime: post.date, modifiedTime: post.dateModified, section: post.es.category, image: ogImagePath("blog", "mx", "es", post.slug) }),
    alternates: buildAlternates(`/blog/${slug}`, "es-MX", { us: false }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const article = blogPostingNode({ post, lang: "es", market: "mx", path, image: ogImagePath("blog", "mx", "es", post.slug) });

  return (
    <>
      <JsonLd data={[article, faqPage(post.es.faq, abs(path))]} />
      <BlogPostContent slug={slug} lang="es" />
    </>
  );
}
