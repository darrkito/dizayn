import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { langPath } from "@/lib/routes";

// TODO: update once the production domain is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dizayn.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const pair = (esPath: string) => ({
    languages: { es: `${SITE_URL}${esPath}`, en: `${SITE_URL}${langPath(esPath, "en")}` },
  });

  const staticEsPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/servicios", priority: 0.9 },
    { path: "/portafolio", priority: 0.7 },
    { path: "/nosotros", priority: 0.6 },
    { path: "/contacto", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticEsPaths.flatMap(({ path, priority }) => {
    const alternates = pair(path);
    return [
      { url: `${SITE_URL}${path}`, priority, alternates },
      { url: `${SITE_URL}${langPath(path, "en")}`, priority, alternates },
    ];
  });

  const servicePages: MetadataRoute.Sitemap = services.flatMap((s) => {
    const esPath = `/servicios/${s.slug}`;
    const alternates = pair(esPath);
    return [
      { url: `${SITE_URL}${esPath}`, priority: 0.8, alternates },
      { url: `${SITE_URL}${langPath(esPath, "en")}`, priority: 0.8, alternates },
    ];
  });

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.flatMap((p) => {
    const esPath = `/blog/${p.slug}`;
    const alternates = pair(esPath);
    return [
      { url: `${SITE_URL}${esPath}`, lastModified: p.dateModified, priority: 0.6, alternates },
      { url: `${SITE_URL}${langPath(esPath, "en")}`, lastModified: p.dateModified, priority: 0.6, alternates },
    ];
  });

  return [...staticPages, ...servicePages, ...blogPostPages];
}
