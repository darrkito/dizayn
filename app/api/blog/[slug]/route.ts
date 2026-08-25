import { getPost } from "@/content/blog";
import { langPath } from "@/lib/routes";
import { apiJson, apiNotFound, SITE_URL, getLang } from "@/lib/api-response";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = getLang(request);
  const post = getPost(slug);
  if (!post) return apiNotFound();

  const copy = post[lang];
  return apiJson({
    slug: post.slug,
    title: copy.title,
    excerpt: copy.excerpt,
    category: copy.category,
    content: copy.content,
    faq: copy.faq,
    date: post.date,
    dateModified: post.dateModified,
    url: `${SITE_URL}${langPath(`/blog/${post.slug}`, lang)}`,
  });
}
