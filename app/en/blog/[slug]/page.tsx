import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/content/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { langPath, stripLangPrefix } from "@/lib/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dizayn.com.mx";

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
  if (!post) return { title: "Article not found | Dizayn", robots: { index: false } };

  const { metaTitle, metaDescription } = post.en;
  const enPath = `/en/blog/${slug}`;
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: { title: metaTitle, description: metaDescription, type: "article", url: enPath },
    alternates: {
      canonical: enPath,
      languages: { es: `/blog/${post.slug}`, en: enPath },
    },
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

  const copy = post.en;
  const url = `${SITE_URL}/en/blog/${slug}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: copy.title,
    description: copy.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Dizayn" },
    publisher: { "@type": "Organization", name: "Dizayn" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
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
      <BlogPostContent slug={esSlug} lang="en" />
    </>
  );
}
