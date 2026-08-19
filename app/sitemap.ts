import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";

// TODO: update once the production domain is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dizayn.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (esPath: string) => ({
    languages: { es: `${SITE_URL}${esPath}`, en: `${SITE_URL}/en${esPath === "/" ? "" : esPath}` },
  });

  const staticEsPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/servicios", priority: 0.9 },
    { path: "/portafolio", priority: 0.7 },
    { path: "/nosotros", priority: 0.6 },
    { path: "/contacto", priority: 0.7 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticEsPaths.flatMap(({ path, priority }) => {
    const enPath = path === "/" ? "/en" : `/en${path}`;
    const alternates = pair(path);
    return [
      { url: `${SITE_URL}${path}`, priority, alternates },
      { url: `${SITE_URL}${enPath}`, priority, alternates },
    ];
  });

  const servicePages: MetadataRoute.Sitemap = services.flatMap((s) => {
    const esPath = `/servicios/${s.slug}`;
    const alternates = pair(esPath);
    return [
      { url: `${SITE_URL}${esPath}`, priority: 0.8, alternates },
      { url: `${SITE_URL}/en${esPath}`, priority: 0.8, alternates },
    ];
  });

  const blogListPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      priority: 0.7,
      alternates: { languages: { es: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` } },
    },
    {
      url: `${SITE_URL}/en/blog`,
      priority: 0.7,
      alternates: { languages: { es: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` } },
    },
  ];

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.flatMap((p) => {
    const esUrl = `${SITE_URL}/blog/${p.slug}`;
    const enUrl = `${SITE_URL}/en/blog/${p.slug}`;
    const alternates = { languages: { es: esUrl, en: enUrl } };
    return [
      { url: esUrl, lastModified: p.dateModified, priority: 0.6, alternates },
      { url: enUrl, lastModified: p.dateModified, priority: 0.6, alternates },
    ];
  });

  return [...staticPages, ...servicePages, ...blogListPages, ...blogPostPages];
}
