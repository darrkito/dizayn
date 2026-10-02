import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/content/blog";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { buildAlternates } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

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
    openGraph: { title: metaTitle, description: metaDescription, type: "article", url: `/blog/${slug}`, images: ["/og-image.jpg"] },
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

  const copy = post.es;
  const url = `${SITE_URL}/blog/${slug}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: copy.title,
    description: copy.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified,
    inLanguage: "es-MX",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
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
      <BlogPostContent slug={slug} lang="es" />
    </>
  );
}
