import { apiJson } from "@/lib/api-response";

export async function GET() {
  return apiJson({
    $schema: "https://modelcontextprotocol.io/schemas/draft/server-card.json",
    schemaVersion: "2025-11-25",
    serverInfo: {
      name: "dizayn-mcp",
      title: "Dizayn",
      version: "1.0.0",
      description: "Real, read-only MCP server over Dizayn's marketing agency service catalog in Guadalajara, Jalisco, Mexico.",
      websiteUrl: "https://dizayn.com.mx",
    },
    protocolVersion: "2025-06-18",
    transport: { type: "streamable-http", url: "https://dizayn.com.mx/mcp" },
    capabilities: { tools: { listChanged: false } },
    tools: [
      { name: "get_services", description: "List Dizayn's marketing agency services (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production) in Guadalajara, Jalisco, Mexico." },
      { name: "get_service_detail", description: "Get full detail (what's included, process, FAQ) for one Dizayn service by slug." },
      { name: "get_blog_posts", description: "List Dizayn's blog posts, including real client case studies (e.g. Luvory Luxury Toilets)." },
      { name: "get_blog_post_detail", description: "Get the full content and FAQ of one Dizayn blog post or case study by slug." },
      { name: "search_faq", description: "Search Dizayn's FAQ content: every service's own Q&A plus every blog post's Q&A." },
      { name: "request_contact", description: "Get a link to contact Dizayn via WhatsApp about a specific service or general inquiry." },
    ],
  });
}
