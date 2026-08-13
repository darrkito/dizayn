import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";

// TODO: update once the production domain is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dizayn.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1.0 },
    { url: `${SITE_URL}/servicios`, priority: 0.9 },
    { url: `${SITE_URL}/portafolio`, priority: 0.7 },
    { url: `${SITE_URL}/nosotros`, priority: 0.6 },
    { url: `${SITE_URL}/contacto`, priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    priority: 0.8,
  }));

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
