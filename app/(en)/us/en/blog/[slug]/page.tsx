import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo";
import { notFound } from "next/navigation";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { buildUsOnlyAlternates, langPath, stripLangPrefix } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

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
    openGraph: { title: metaTitle, description: metaDescription, type: "article", url: enPath, images: ["/og-image.jpg"] },
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

  const copy = post.en;
  const url = `${SITE_URL}/us/en/blog/${slug}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: copy.title,
    description: copy.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified,
    inLanguage: "en-US",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    url,
    image: `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqSchema =
    copy.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: copy.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <BlogPostContent slug={esSlug} lang="en" market="us" />
    </>
  );
}
