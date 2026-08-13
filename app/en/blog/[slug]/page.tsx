import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/content/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dizayn.com.mx";

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
  if (!post) return { title: "Article not found | Dizayn", robots: { index: false } };

  const { metaTitle, metaDescription } = post.en;
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: { title: metaTitle, description: metaDescription, type: "article", url: `/en/blog/${slug}` },
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: { es: `/blog/${slug}`, en: `/en/blog/${slug}` },
    },
  };
}

export default async function BlogPostPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
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
      <BlogPostContent slug={slug} lang="en" />
    </>
  );
}
