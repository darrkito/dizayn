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
        // Homepage only: llms.txt is a whole-site summary, so advertising it as every page's
        // markdown alternate misdescribed those pages. The homepage genuinely has it as its
        // markdown rendering (proxy.ts serves it on Accept: text/markdown).
        source: "/",
        headers: [{ key: "Link", value: '</llms.txt>; rel="alternate"; type="text/markdown"' }],
      },
      {
        // Machine endpoints stay readable by agents (robots.ts allows /api/) but out of the
        // search index: a JSON payload ranking instead of the page it describes helps no one.
        source: "/:dir(api|\\.well-known)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/:endpoint(mcp|a2a|llms-full\\.txt)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  async redirects() {
    // The /en/* routes briefly shipped with untranslated Spanish section names/slugs
    // (e.g. /en/servicios/seo) before this fix — already pinged to Bing/Yandex via
    // IndexNow and resubmitted to GSC in that window, so redirect rather than 404.
    const translated = Object.entries(EN_SLUG_MAP).filter(([esPath, enPath]) => esPath !== enPath);
    // Fully-Spanish paths under an English prefix (/en/servicios/seo, /us/en/servicios/seo).
    const spanishPaths = translated.flatMap(([esPath, enPath]) =>
      ["/en", "/us/en"].map((prefix) => ({ source: `${prefix}${esPath}`, destination: `${prefix}${enPath}`, permanent: true })),
    );
    // Half-translated paths: English section + Spanish slug (/en/services/sitios-web). The [slug]
    // routes resolve these to real content, which made them silent duplicates of the English URL.
    const halfTranslated = translated.flatMap(([esPath, enPath]) => {
      const esSlug = esPath.split("/")[2];
      const enSection = enPath.split("/")[1];
      if (!esSlug || esSlug === enPath.split("/")[2]) return [];
      return ["/en", "/us/en"].map((prefix) => ({
        source: `${prefix}/${enSection}/${esSlug}`,
        destination: `${prefix}${enPath}`,
        permanent: true,
      }));
    });
    return [...spanishPaths, ...halfTranslated];
  },
};

export default nextConfig;
