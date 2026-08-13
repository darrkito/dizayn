"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Lang } from "@/content/services";
import { blogPosts, getPost } from "@/content/blog";
import { getDict, useI18n } from "@/lib/i18n";
import { renderBlogContent } from "@/lib/blog-render";
import { BlogCard, formatDate } from "./blog-card";

export function BlogPostContent({ slug, lang }: { slug: string; lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const post = getPost(slug)!;
  const copy = post[lang];
  const blogHref = lang === "es" ? "/blog" : "/en/blog";

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="container-x py-24">
      <Link href={blogHref} className="text-xs uppercase tracking-[0.18em] text-primary hover:underline">
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
          {renderBlogContent(copy.content)}
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
        <Link href="/contacto" className="mt-6 btn-primary inline-block">
          {t.nav.cta}
        </Link>
      </section>

      {related.length > 0 && (
        <section className="mt-20 rule pt-16">
          <h2 className="font-display text-2xl">{t.blog.relatedTitle}</h2>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} lang={lang} readMore={t.blog.readMore} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
