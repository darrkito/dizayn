import { apiJson } from "@/lib/api-response";

const SITE_URL = "https://dizayn.com.mx";

const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Dizayn public API",
    version: "1.0.0",
    summary: "Read-only facts about Dizayn's marketing agency services in Guadalajara, Jalisco, Mexico.",
    description:
      "A small, public, unauthenticated JSON API over Dizayn's real service catalog (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production), plus a dedicated nearshore offering for US businesses (market=us: 5 of 7 services, USD pricing). No credentials required.",
  },
  servers: [{ url: `${SITE_URL}/api` }],
  paths: {
    "/services": {
      get: {
        summary: "List services. market=mx (default, all 7) or market=us (5 exportable services, USD)",
        parameters: [{ name: "market", in: "query", schema: { type: "string", enum: ["mx", "us"] } }],
        responses: { "200": { description: "OK" } },
      },
    },
    "/services/{slug}": {
      get: {
        summary: "Get one service's full detail (includes, process, FAQ). 404 if the slug has no market=us variant when market=us is passed.",
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
          { name: "market", in: "query", schema: { type: "string", enum: ["mx", "us"] } },
        ],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } },
      },
    },
    "/pricing": {
      get: {
        summary: "Real price ranges: USD for the 5 US-market services vs. the US market average (top level), and the Mexico MXN rate card for all 7 services (under `mxn`)",
        responses: { "200": { description: "OK" } },
      },
    },
    "/blog": {
      get: {
        summary: "List all blog posts and case studies (title, excerpt, category, date, url). market=mx (default) or market=us (nearshore-focused guides)",
        parameters: [{ name: "market", in: "query", schema: { type: "string", enum: ["mx", "us"] } }],
        responses: { "200": { description: "OK" } },
      },
    },
    "/blog/{slug}": {
      get: {
        summary: "Get one blog post's full content (body, FAQ) — includes real client case studies, not just guides",
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
          { name: "market", in: "query", schema: { type: "string", enum: ["mx", "us"] } },
        ],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } },
      },
    },
    "/health": { get: { summary: "Health check", responses: { "200": { description: "OK" } } } },
  },
};

export async function GET() {
  return apiJson(openApiSpec, { contentType: "application/vnd.oai.openapi+json;version=3.1" });
}
