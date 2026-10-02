"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Lang } from "@/content/services";
import { blogPosts, getPost } from "@/content/blog";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { getDict, useI18n } from "@/lib/i18n";
import { renderBlogContent } from "@/lib/blog-render";
import { langPath, usPath, type Market } from "@/lib/routes";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { BlogCard, formatDate } from "./blog-card";

export function BlogPostContent({
  slug,
  lang,
  market = "mx",
}: {
  slug: string;
  lang: Lang;
  market?: Market;
}) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  const posts = isUs ? usBlogPosts : blogPosts;
  const post = (isUs ? getUsPost(slug) : getPost(slug))!;
  const copy = post[lang];
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));
  const blogHref = path("/blog");
  const contactHref = path("/contacto");

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  // Scoped to the same market's posts — a wedge post's "related" list only ever shows
  // other wedge posts, never MX blog content and vice versa.
  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="container-x py-10 md:py-24">
      <Link
        href={blogHref}
        className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.18em] text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        ← {t.blog.back}
      </Link>

      <article className="mt-10 max-w-3xl" itemScope itemType="https://schema.org/BlogPosting">
        <header>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-primary" itemProp="articleSection">
              {copy.category}
            </span>
            <time className="text-xs text-muted-foreground" dateTime={post.date} itemProp="datePublished">
              {t.blog.published} {formatDate(post.date, lang)}
            </time>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,6vw,3.5rem)] leading-[1.02]" itemProp="headline">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{t.blog.by}</p>
          {post.dateModified !== post.date && (
            <p className="mt-4 text-xs text-muted-foreground">
              {t.blog.updated}{" "}
              <time dateTime={post.dateModified} itemProp="dateModified">
                {formatDate(post.dateModified, lang)}
              </time>
            </p>
          )}
        </header>

        <div className="mt-10" itemProp="articleBody">
          {renderBlogContent(copy.content, lang)}
        </div>

        {copy.faq.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-2xl text-foreground mb-8">{t.services.faq}</h2>
            <dl className="space-y-8">
              {copy.faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-display text-lg">{f.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>

      <section className="mt-20 rule pt-16">
        <h2 className="font-display text-2xl">{t.blog.ctaTitle}</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t.blog.ctaLead}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <WhatsAppCTA label={t.nav.waCta} place="blog_end" />
          <Link href={contactHref} className="btn-ghost">
            {t.nav.formCta}
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20 rule pt-16">
          <h2 className="font-display text-2xl">{t.blog.relatedTitle}</h2>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} lang={lang} readMore={t.blog.readMore} market={market} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
