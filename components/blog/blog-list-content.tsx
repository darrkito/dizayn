"use client";

import { useEffect } from "react";
import type { Lang } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { getDict, useI18n } from "@/lib/i18n";
import { BlogCard } from "./blog-card";

export function BlogListContent({ lang }: { lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);

  // Keep the ambient toggle/nav in sync with the URL's actual language.
  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div className="container-x py-24">
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{t.blog.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.blog.lead}</p>

      <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} lang={lang} readMore={t.blog.readMore} />
        ))}
      </div>
    </div>
  );
}
