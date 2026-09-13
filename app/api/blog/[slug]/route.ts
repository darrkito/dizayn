import { getPost } from "@/content/blog";
import { getUsPost } from "@/content/us-blog";
import { langPath, usPath } from "@/lib/routes";
import { apiJson, apiNotFound, SITE_URL, getLang, getMarket } from "@/lib/api-response";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = getLang(request);
  const market = getMarket(request);
  const isUs = market === "us";
  const post = isUs ? getUsPost(slug) : getPost(slug);
  if (!post) return apiNotFound();

  const copy = post[lang];
  return apiJson({
    slug: post.slug,
    market,
    title: copy.title,
    excerpt: copy.excerpt,
    category: copy.category,
    content: copy.content,
    faq: copy.faq,
    date: post.date,
    dateModified: post.dateModified,
    url: `${SITE_URL}${isUs ? usPath(`/blog/${post.slug}`, lang) : langPath(`/blog/${post.slug}`, lang)}`,
  });
}
