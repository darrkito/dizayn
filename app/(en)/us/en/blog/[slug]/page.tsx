import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { buildUsOnlyAlternates, langPath, stripLangPrefix } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, blogPostingNode, faqPage } from "@/lib/schema";

/** The route param is the translated English slug — resolve it back to the canonical
 * Spanish slug the US wedge post is actually keyed by. */
const resolveEsSlug = (enSlug: string) => stripLangPrefix(`/en/blog/${enSlug}`).split("/").pop()!;

export function generateStaticParams() {
  return usBlogPosts.map((p) => ({ slug: langPath(`/blog/${p.slug}`, "en").split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getUsPost(resolveEsSlug(slug));
  if (!post) return { title: "Article not found", robots: { index: false } };

  const { metaTitle, metaDescription } = post.en;
  const enPath = `/us/en/blog/${slug}`;
  return {
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "article", url: enPath, publishedTime: post.date, modifiedTime: post.dateModified, section: post.en.category, image: ogImagePath("blog", "us", "en", post.slug) }),
    alternates: buildUsOnlyAlternates(`/blog/${post.slug}`, "en-US"),
  };
}

export default async function UsBlogPostPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const esSlug = resolveEsSlug(slug);
  const post = getUsPost(esSlug);
  if (!post) notFound();

  const path = `/us/en/blog/${slug}`;
  const article = blogPostingNode({ post, lang: "en", market: "us", path, image: ogImagePath("blog", "us", "en", post.slug) });

  return (
    <>
      <JsonLd data={[article, faqPage(post.en.faq, abs(path))]} />
      <BlogPostContent slug={esSlug} lang="en" market="us" />
    </>
  );
}
