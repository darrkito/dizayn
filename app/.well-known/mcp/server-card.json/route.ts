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
  });
}
