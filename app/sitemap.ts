import type { MetadataRoute } from "next";
import { services } from "@/content/services";

// TODO: update once the production domain is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dizayn.com.mx";

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

  return [...staticPages, ...servicePages];
}
