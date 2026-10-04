import { services, getService } from "@/content/services";
import { blogPosts, getPost } from "@/content/blog";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { renderOgImage } from "@/lib/og-image";
import type { Lang } from "@/content/services";
import type { Market } from "@/lib/routes";

/** Share cards at stable URLs: /og/{blog|service}/{mx|us}/{es|en}/{es-slug}.png — referenced by
 * og:image and by BlogPosting/Service JSON-LD (lib/og-image.tsx ogImagePath). A plain route
 * instead of the opengraph-image file convention, whose URLs carry a build hash. */
export const dynamic = "force-static";
export const dynamicParams = false;

const FOOTER: Record<Market, Record<Lang, string>> = {
  mx: { es: "Agencia de marketing en Guadalajara · dizayn.com.mx", en: "Marketing agency in Guadalajara · dizayn.com.mx" },
  us: { es: "Agencia nearshore desde Guadalajara · dizayn.com.mx", en: "Nearshore agency from Guadalajara · dizayn.com.mx" },
};

export function generateStaticParams() {
  const keys: string[][] = [];
  for (const lang of ["es", "en"] as const) {
    for (const p of blogPosts) keys.push(["blog", "mx", lang, `${p.slug}.png`]);
    for (const p of usBlogPosts) keys.push(["blog", "us", lang, `${p.slug}.png`]);
    for (const s of services) keys.push(["service", "mx", lang, `${s.slug}.png`]);
    for (const s of services.filter((s) => s.us)) keys.push(["service", "us", lang, `${s.slug}.png`]);
  }
  return keys.map((key) => ({ key }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const [kind, market, lang, file] = (await params).key as [string, Market, Lang, string];
  const slug = file?.replace(/\.png$/, "");
  const footer = FOOTER[market]?.[lang];
  if (!slug || !footer) return new Response("Not found", { status: 404 });

  if (kind === "blog") {
    const post = market === "us" ? getUsPost(slug) : getPost(slug);
    if (!post) return new Response("Not found", { status: 404 });
    return renderOgImage({ eyebrow: post[lang].category, title: post[lang].title, footer });
  }
  if (kind === "service") {
    const service = getService(slug);
    const copy = market === "us" ? service?.us?.[lang] : service?.[lang];
    if (!service || !copy) return new Response("Not found", { status: 404 });
    return renderOgImage({ eyebrow: `${lang === "es" ? "Servicio" : "Service"} ${service.number}`, title: copy.metaTitle, footer });
  }
  return new Response("Not found", { status: 404 });
}
