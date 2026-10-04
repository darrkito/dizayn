import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/content/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { buildAlternates, langPath, stripLangPrefix } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, blogPostingNode, faqPage } from "@/lib/schema";

/** The route param is the translated English slug — resolve it back to the canonical
 * Spanish slug the content is actually keyed by. */
const resolveEsSlug = (enSlug: string) => stripLangPrefix(`/en/blog/${enSlug}`).split("/").pop()!;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: langPath(`/blog/${p.slug}`, "en").split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(resolveEsSlug(slug));
  if (!post) return { title: "Article not found", robots: { index: false } };

  const { metaTitle, metaDescription } = post.en;
  const enPath = `/en/blog/${slug}`;
  return {
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "article", url: enPath, publishedTime: post.date, modifiedTime: post.dateModified, section: post.en.category, image: ogImagePath("blog", "mx", "en", post.slug) }),
    alternates: buildAlternates(`/blog/${post.slug}`, "en-MX", { us: false }),
  };
}

export default async function BlogPostPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const esSlug = resolveEsSlug(slug);
  const post = getPost(esSlug);
  if (!post) notFound();

  const path = `/en/blog/${slug}`;
  const article = blogPostingNode({ post, lang: "en", market: "mx", path, image: ogImagePath("blog", "mx", "en", post.slug) });

  return (
    <>
      <JsonLd data={[article, faqPage(post.en.faq, abs(path))]} />
      <BlogPostContent slug={esSlug} lang="en" />
    </>
  );
}
