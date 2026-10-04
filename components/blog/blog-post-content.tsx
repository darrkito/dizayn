"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Lang } from "@/content/services";
import { blogPosts, getPost } from "@/content/blog";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { getDict, useI18n } from "@/lib/i18n";
import { extractToc, renderBlogContent } from "@/lib/blog-render";
import { langPath, usPath, type Market } from "@/lib/routes";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
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
  // Topic-matched: same category first, then most slug words in common (e.g. "guadalajara",
  // "seo"), so a clinic-marketing post no longer always recommends the first two posts in the file.
  const words = (s: string) => new Set(s.split("-").filter((w) => w.length > 3));
  const mine = words(slug);
  const score = (p: typeof post) =>
    (p.es.category === post.es.category ? 10 : 0) + [...words(p.slug)].filter((w) => mine.has(w)).length;
  const related = posts
    .filter((p) => p.slug !== slug)
    .map((p, i) => ({ p, i, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, 2)
    .map(({ p }) => p);
  const toc = extractToc(copy.content);

  return (
    <div className="container-x py-10 md:py-24">
      <Breadcrumbs
        label={t.nav.breadcrumb}
        items={[
          { label: t.nav.home, href: path("/") },
          { label: t.nav.blog, href: blogHref },
          { label: copy.title, href: path(`/blog/${slug}`) },
        ]}
      />

      <article className="mt-10 max-w-3xl">
        <header>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-primary">
              {copy.category}
            </span>
            <time className="text-xs text-muted-foreground" dateTime={post.date}>
              {t.blog.published} {formatDate(post.date, lang)}
            </time>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,6vw,3.5rem)] leading-[1.02]">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{t.blog.by}</p>
          {post.dateModified !== post.date && (
            <p className="mt-4 text-xs text-muted-foreground">
              {t.blog.updated}{" "}
              <time dateTime={post.dateModified}>
                {formatDate(post.dateModified, lang)}
              </time>
            </p>
          )}
        </header>

        {toc.length >= 4 && (
          <nav aria-label={t.blog.toc} className="mt-10 rounded-2xl border border-border p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">{t.blog.toc}</p>
            <ol className="mt-4 space-y-1 text-sm">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="inline-flex min-h-9 items-center text-muted-foreground hover:text-primary">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.results && post.results.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-foreground">{t.blog.results.title}</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary/10 text-left">
                    {[t.blog.results.metric, t.blog.results.before, t.blog.results.after, t.blog.results.period, t.blog.results.source].map((h) => (
                      <th key={h} className="border border-border px-4 py-2 font-semibold text-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {post.results.map((r) => (
                    <tr key={r.metric.es}>
                      <td className="border border-border px-4 py-2 text-foreground">{r.metric[lang]}</td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">{r.before}</td>
                      <td className="border border-border px-4 py-2 font-semibold text-primary">{r.after}</td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">{r.period[lang]}</td>
                      <td className="border border-border px-4 py-2 text-muted-foreground">{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="mt-10">
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
