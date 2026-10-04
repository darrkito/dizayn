import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/api-response";

// Only the stateful JSON-RPC endpoints are off-limits. /api/* is deliberately crawlable: llms.txt,
// the agent SKILL.md and /.well-known/api-catalog all point agents at it, and it stays out of the
// search index via X-Robots-Tag: noindex (next.config.ts) instead.
const DISALLOW = ["/mcp", "/a2a"];

// AI crawlers named explicitly, grouped by what they do (training / AI search index / fetch on a
// user's request). Each token is its own robots group: blocking or allowing one never covers the
// others, and a named group REPLACES the `*` group for that bot, so every group repeats DISALLOW.
// Training is allowed on purpose (owner decision, 2026-10): being in the models' built-in
// knowledge is how a small agency gets recommended by name without a live search.
const AI_BOTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini training/grounding) and Apple (Apple Intelligence)
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  // Microsoft (Bing index also feeds ChatGPT search and Copilot)
  "Bingbot",
  // Others
  "CCBot",
  "meta-externalagent",
  "meta-externalfetcher",
  "MistralAI-User",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // No Content-Signal line: with training allowed it expressed nothing the Allow rules don't,
      // and it is a non-standard directive that validators (Lighthouse, robots testers) report
      // as an error.
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
