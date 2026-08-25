import { apiJson } from "@/lib/api-response";

const SITE_URL = "https://www.dizayn.com.mx";

export async function GET() {
  return apiJson({
    specVersion: "1.0",
    host: {
      displayName: "Dizayn",
      description: "Marketing and brand agency in Guadalajara, Jalisco, Mexico — web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production.",
      url: SITE_URL,
      contact: "sebasesc5@gmail.com",
    },
    entries: [
      {
        identifier: "urn:air:dizayn.com.mx:api:public",
        displayName: "Dizayn public REST API",
        description: "Read-only JSON API for Dizayn's service catalog.",
        type: "application/json",
        url: `${SITE_URL}/api/openapi`,
        representativeQueries: [
          "what services does Dizayn offer",
          "how much does a website cost in Guadalajara",
          "what is GEO / AI visibility marketing",
        ],
      },
      {
        identifier: "urn:air:dizayn.com.mx:server:mcp",
        displayName: "Dizayn MCP server",
        description: "Model Context Protocol server exposing services and contact requests as callable tools.",
        type: "application/mcp-server-card+json",
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        representativeQueries: ["get details on Dizayn's SEO service", "contact Dizayn about a new website"],
      },
      {
        identifier: "urn:air:dizayn.com.mx:agent:a2a",
        displayName: "Dizayn Assistant (A2A)",
        description: "Agent-to-Agent endpoint that answers service and contact questions from Dizayn's real content.",
        type: "application/json",
        url: `${SITE_URL}/.well-known/agent-card.json`,
        representativeQueries: ["what marketing services does Dizayn offer", "how do I contact Dizayn"],
      },
    ],
  });
}
