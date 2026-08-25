import { blogPosts } from "@/content/blog";
import { langPath } from "@/lib/routes";
import { apiJson, SITE_URL, getLang } from "@/lib/api-response";

export async function GET(request: Request) {
  const lang = getLang(request);
  return apiJson({
    posts: blogPosts.map((p) => {
      const copy = p[lang];
      return {
        slug: p.slug,
        title: copy.title,
        excerpt: copy.excerpt,
        category: copy.category,
        date: p.date,
        url: `${SITE_URL}${langPath(`/blog/${p.slug}`, lang)}`,
      };
    }),
  });
}
