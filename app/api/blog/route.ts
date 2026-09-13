import { blogPosts } from "@/content/blog";
import { usBlogPosts } from "@/content/us-blog";
import { langPath, usPath } from "@/lib/routes";
import { apiJson, SITE_URL, getLang, getMarket } from "@/lib/api-response";

export async function GET(request: Request) {
  const lang = getLang(request);
  const market = getMarket(request);
  const isUs = market === "us";
  const posts = isUs ? usBlogPosts : blogPosts;
  return apiJson({
    market,
    posts: posts.map((p) => {
      const copy = p[lang];
      return {
        slug: p.slug,
        title: copy.title,
        excerpt: copy.excerpt,
        category: copy.category,
        date: p.date,
        url: `${SITE_URL}${isUs ? usPath(`/blog/${p.slug}`, lang) : langPath(`/blog/${p.slug}`, lang)}`,
      };
    }),
  });
}
