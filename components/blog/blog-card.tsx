import Link from "next/link";
import type { Lang } from "@/content/services";
import type { BlogPost } from "@/content/blog";

const formatDate = (date: string, lang: Lang) =>
  new Date(`${date}T00:00:00`).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function BlogCard({ post, lang, readMore }: { post: BlogPost; lang: Lang; readMore: string }) {
  const copy = post[lang];
  const href = lang === "es" ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-card"
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-primary">{copy.category}</span>
          <time className="text-xs text-muted-foreground" dateTime={post.date}>
            {formatDate(post.date, lang)}
          </time>
        </div>
        <h2 className="mt-4 font-display text-2xl">{copy.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{copy.excerpt}</p>
      </div>
      <span className="mt-6 inline-block text-xs uppercase tracking-[0.18em] text-primary">{readMore} →</span>
    </Link>
  );
}

export { formatDate };
