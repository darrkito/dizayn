import { apiJson } from "@/lib/api-response";

export async function GET() {
  return apiJson({
    $schema: "https://modelcontextprotocol.io/schemas/draft/server-card.json",
    schemaVersion: "2025-11-25",
    serverInfo: {
      name: "dizayn-mcp",
      title: "Dizayn",
      version: "1.0.0",
      description: "Real, read-only MCP server over Dizayn's marketing agency service catalog in Guadalajara, Jalisco, Mexico, plus its nearshore offering for US businesses (market=us, USD pricing).",
      websiteUrl: "https://dizayn.com.mx",
    },
    protocolVersion: "2025-06-18",
    transport: { type: "streamable-http", url: "https://dizayn.com.mx/mcp" },
    capabilities: { tools: { listChanged: false } },
    tools: [
      { name: "get_services", description: "List Dizayn's services. market=mx (default, all 7) or market=us (5 exportable services, USD)." },
      { name: "get_service_detail", description: "Get full detail (what's included, process, FAQ) for one Dizayn service by slug, mx or us market." },
      { name: "get_pricing", description: "Real price ranges: MXN rate card for all 7 services in Mexico (under `mxn`), plus USD ranges for the 5 US-market services vs. the US market average." },
      { name: "get_blog_posts", description: "List Dizayn's blog posts. market=mx: guides + real client case studies (Luvory). market=us: nearshore-focused guides for US buyers." },
      { name: "get_blog_post_detail", description: "Get the full content and FAQ of one Dizayn blog post or case study by slug, mx or us market." },
      { name: "search_faq", description: "Search Dizayn's FAQ content across both markets: every service's and blog post's Q&A." },
      { name: "request_contact", description: "Get a link to contact Dizayn via WhatsApp about a specific service or general inquiry." },
    ],
  });
}
