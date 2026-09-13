import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/api-response";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/mcp", "/a2a"],
      other: {
        "Content-Signal": "ai-train=no, search=yes, ai-input=yes",
      },
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
