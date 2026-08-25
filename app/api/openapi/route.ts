import { apiJson } from "@/lib/api-response";

const SITE_URL = "https://dizayn.com.mx";

const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Dizayn public API",
    version: "1.0.0",
    summary: "Read-only facts about Dizayn's marketing agency services in Guadalajara, Jalisco, Mexico.",
    description:
      "A small, public, unauthenticated JSON API over Dizayn's real service catalog (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production). No credentials required.",
  },
  servers: [{ url: `${SITE_URL}/api` }],
  paths: {
    "/services": { get: { summary: "List all services", responses: { "200": { description: "OK" } } } },
    "/services/{slug}": {
      get: {
        summary: "Get one service's full detail (includes, process, FAQ)",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } },
      },
    },
    "/blog": {
      get: {
        summary: "List all blog posts and case studies (title, excerpt, category, date, url)",
        responses: { "200": { description: "OK" } },
      },
    },
    "/blog/{slug}": {
      get: {
        summary: "Get one blog post's full content (body, FAQ) — includes real client case studies, not just guides",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } },
      },
    },
    "/health": { get: { summary: "Health check", responses: { "200": { description: "OK" } } } },
  },
};

export async function GET() {
  return apiJson(openApiSpec, { contentType: "application/vnd.oai.openapi+json;version=3.1" });
}
