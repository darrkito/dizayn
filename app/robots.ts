import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dizayn.com.mx";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/mcp"],
      other: {
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
      },
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
