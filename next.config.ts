import path from "node:path";
import type { NextConfig } from "next";
import { EN_SLUG_MAP } from "./lib/routes";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts ((es)/(en) route groups) => no single layout for unmatched-URL 404s.
    globalNotFound: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  async headers() {
    return [
      {
        // Baseline hardening for every route. Deliberately no CSP: it needs per-page testing
        // (Clarity, Cloudinary, Next inline scripts) and a wrong one silently breaks the site.
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // Page routes only — excludes /api/*, /mcp, /.well-known/*, and Next's
        // static assets, which already set their own headers or don't need this.
        source: "/((?!api/|mcp|\\.well-known/|_next/).*)",
        headers: [{ key: "Link", value: '</llms.txt>; rel="alternate"; type="text/markdown"' }],
      },
    ];
  },
  async redirects() {
    // The /en/* routes briefly shipped with untranslated Spanish section names/slugs
    // (e.g. /en/servicios/seo) before this fix — already pinged to Bing/Yandex via
    // IndexNow and resubmitted to GSC in that window, so redirect rather than 404.
    return Object.entries(EN_SLUG_MAP)
      .filter(([esPath, enPath]) => esPath !== enPath)
      .map(([esPath, enPath]) => ({
        source: `/en${esPath}`,
        destination: `/en${enPath}`,
        permanent: true,
      }));
  },
};

export default nextConfig;
