import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { usBlogPosts } from "@/content/us-blog";
import { langPath, usPath } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

export default function sitemap(): MetadataRoute.Sitemap {
  // us: false for the ~30 pages with no US sibling yet (all blog posts, portfolio, legal
  // pages) — only the pages actually built in the 2026-09-13 US-expansion pass get a 4-way
  // hreflang group here; everything else keeps its original es/en pair.
  const pair = (esPath: string, opts: { us?: boolean } = {}) => ({
    languages: {
      es: `${SITE_URL}${esPath}`,
      en: `${SITE_URL}${langPath(esPath, "en")}`,
      ...(opts.us !== false && {
        "es-US": `${SITE_URL}${usPath(esPath, "es")}`,
        "en-US": `${SITE_URL}${usPath(esPath, "en")}`,
      }),
    },
  });

  // us: true only for the 3 static pages that actually got a /us sibling in the
  // 2026-09-13 US-expansion pass — no /us/servicios hub, /us/portafolio or legal pages exist.
  const staticEsPaths: { path: string; priority: number; us?: boolean }[] = [
    { path: "/", priority: 1.0, us: true },
    { path: "/servicios", priority: 0.9 },
    { path: "/portafolio", priority: 0.7 },
    { path: "/nosotros", priority: 0.6, us: true },
    { path: "/contacto", priority: 0.7, us: true },
    { path: "/blog", priority: 0.7 },
    { path: "/privacidad", priority: 0.3 },
    { path: "/terminos", priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticEsPaths.flatMap(({ path, priority, us }) => {
    const alternates = pair(path, { us });
    return [
      { url: `${SITE_URL}${path}`, priority, alternates },
      { url: `${SITE_URL}${langPath(path, "en")}`, priority, alternates },
    ];
  });

  const servicePages: MetadataRoute.Sitemap = services.flatMap((s) => {
    const esPath = `/servicios/${s.slug}`;
    const alternates = pair(esPath, { us: Boolean(s.us) });
    return [
      { url: `${SITE_URL}${esPath}`, priority: 0.8, alternates },
      { url: `${SITE_URL}${langPath(esPath, "en")}`, priority: 0.8, alternates },
    ];
  });

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.flatMap((p) => {
    const esPath = `/blog/${p.slug}`;
    const alternates = pair(esPath, { us: false });
    return [
      { url: `${SITE_URL}${esPath}`, lastModified: p.dateModified, priority: 0.6, alternates },
      { url: `${SITE_URL}${langPath(esPath, "en")}`, lastModified: p.dateModified, priority: 0.6, alternates },
    ];
  });

  // US-side entries for the pages above (mirrors their MX counterpart's alternates so the
  // hreflang group is reciprocal), plus /us/precios which has no MX equivalent at all.
  const usStaticPaths = staticEsPaths.filter((s) => s.us);
  const usStaticPages: MetadataRoute.Sitemap = usStaticPaths.flatMap(({ path, priority }) => {
    const alternates = pair(path);
    return [
      { url: `${SITE_URL}${usPath(path, "es")}`, priority, alternates },
      { url: `${SITE_URL}${usPath(path, "en")}`, priority, alternates },
    ];
  });

  const usServicePages: MetadataRoute.Sitemap = services
    .filter((s) => s.us)
    .flatMap((s) => {
      const esPath = `/servicios/${s.slug}`;
      const alternates = pair(esPath, { us: true });
      return [
        { url: `${SITE_URL}${usPath(esPath, "es")}`, priority: 0.8, alternates },
        { url: `${SITE_URL}${usPath(esPath, "en")}`, priority: 0.8, alternates },
      ];
    });

  // Market-exclusive pages with no MX equivalent at all (pricing, the 4 wedge blog posts,
  // and the /us/blog list) — just an es-US/en-US pair, no es/en keys.
  const usOnlyPair = (esPath: string) => ({
    languages: {
      "es-US": `${SITE_URL}${usPath(esPath, "es")}`,
      "en-US": `${SITE_URL}${usPath(esPath, "en")}`,
    },
  });
  const usOnlyEntries = (esPath: string, priority: number, lastModified?: string): MetadataRoute.Sitemap => {
    const alternates = usOnlyPair(esPath);
    return [
      { url: `${SITE_URL}${usPath(esPath, "es")}`, priority, lastModified, alternates },
      { url: `${SITE_URL}${usPath(esPath, "en")}`, priority, lastModified, alternates },
    ];
  };

  const usServicesHubPages = usOnlyEntries("/servicios", 0.8);
  const usPricingPages = usOnlyEntries("/precios", 0.7);
  const usBlogListPages = usOnlyEntries("/blog", 0.7);
  const usBlogPostPages = usBlogPosts.flatMap((p) => usOnlyEntries(`/blog/${p.slug}`, 0.6, p.dateModified));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPostPages,
    ...usStaticPages,
    ...usServicePages,
    ...usServicesHubPages,
    ...usPricingPages,
    ...usBlogListPages,
    ...usBlogPostPages,
  ];
}
