import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { usBlogPosts } from "@/content/us-blog";
import { buildAlternates, buildUsOnlyAlternates } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

type Languages = Record<string, string>;

/** One sitemap entry per language variant of a page, each carrying the full hreflang set.
 * The sets come from the exact same buildAlternates/buildUsOnlyAlternates calls the pages use
 * for their <link rel="alternate"> tags, so the sitemap and the HTML can never disagree (they
 * did: the sitemap once advertised /us/portafolio and /us/privacidad, which don't exist). */
const group = (languages: Languages, priority: number, lastModified?: string): MetadataRoute.Sitemap => {
  const absolute = Object.fromEntries(Object.entries(languages).map(([code, path]) => [code, `${SITE_URL}${path}`]));
  return Object.entries(languages)
    .filter(([code]) => code !== "x-default")
    .map(([, path]) => ({
      url: `${SITE_URL}${path}`,
      priority,
      ...(lastModified && { lastModified }),
      alternates: { languages: absolute },
    }));
};

/** MX es/en pair, plus the US pair when that page has a /us sibling (mirrors each page's own
 * buildAlternates(..., { us }) call). */
const mx = (esPath: string, us: boolean) => buildAlternates(esPath, "es-MX", { us }).languages;
/** Pages that exist only in the US section (no MX equivalent). */
const usOnly = (esPath: string) => buildUsOnlyAlternates(esPath, "es-US").languages;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; priority: number; us: boolean }[] = [
    { path: "/", priority: 1.0, us: true },
    { path: "/servicios", priority: 0.9, us: false },
    { path: "/portafolio", priority: 0.7, us: false },
    { path: "/nosotros", priority: 0.6, us: true },
    { path: "/contacto", priority: 0.7, us: true },
    { path: "/blog", priority: 0.7, us: false },
    { path: "/privacidad", priority: 0.3, us: false },
    { path: "/terminos", priority: 0.3, us: false },
  ];

  return [
    ...staticPages.flatMap(({ path, priority, us }) => group(mx(path, us), priority)),
    ...services.flatMap((s) => group(mx(`/servicios/${s.slug}`, Boolean(s.us)), 0.8)),
    ...blogPosts.flatMap((p) => group(mx(`/blog/${p.slug}`, false), 0.6, p.dateModified)),
    // US-only hubs and posts (es-US/en-US pair, x-default = es-US).
    ...group(usOnly("/servicios"), 0.8),
    ...group(usOnly("/precios"), 0.7),
    ...group(usOnly("/blog"), 0.7),
    ...usBlogPosts.flatMap((p) => group(usOnly(`/blog/${p.slug}`), 0.6, p.dateModified)),
  ];
}
