// Minimal, spec-compliant MCP server (Streamable HTTP transport, 2025-06-18) at
// POST /mcp. Single-endpoint, stateless (no session ID, no SSE — every request
// gets one synchronous JSON response, which the spec explicitly allows).
// Same proven pattern as luvory.com.mx's /mcp — see ~/agent-readiness-playbook.md §5.

import { services, getService } from "@/content/services";
import { blogPosts, getPost } from "@/content/blog";
import { waLink, CONTACT } from "@/content/contact";

const PROTOCOL_VERSION = "2025-06-18";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

const TOOLS = [
  {
    name: "get_services",
    description: "List Dizayn's marketing agency services (web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production) in Guadalajara, Jalisco, Mexico.",
    inputSchema: { type: "object", properties: { lang: { type: "string", enum: ["es", "en"], description: "Response language, default es" } } },
  },
  {
    name: "get_service_detail",
    description: "Get full detail (what's included, process, FAQ) for one Dizayn service by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Service slug, e.g. sitios-web, seo, posicionamiento-ia, redes-sociales, embudos-de-venta, fotografia, videografia" }, lang: { type: "string", enum: ["es", "en"] } },
      required: ["slug"],
    },
  },
  {
    name: "get_blog_posts",
    description: "List Dizayn's blog posts, including real client case studies (e.g. work done for Luvory Luxury Toilets: website, SEO, GEO, AI agent infrastructure, social media, event coverage). Use this to find proof of past work, not just guides.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Optional filter, e.g. 'Casos de éxito'/'Case studies' for client work only, 'SEO', 'Websites', etc." },
        lang: { type: "string", enum: ["es", "en"], description: "Response language, default es" },
      },
    },
  },
  {
    name: "get_blog_post_detail",
    description: "Get the full content and FAQ of one Dizayn blog post or case study by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Blog post slug, e.g. caso-luvory-sitio-web, caso-luvory-seo, seo-vs-geo-guadalajara" }, lang: { type: "string", enum: ["es", "en"] } },
      required: ["slug"],
    },
  },
  {
    name: "request_contact",
    description: "Get a link to contact Dizayn via WhatsApp about a specific service or general inquiry.",
    inputSchema: { type: "object", properties: { message: { type: "string", description: "What the user wants to ask about" } } },
  },
];

function textResult(text: string, isError = false) {
  return { content: [{ type: "text", text }], isError };
}

function callTool(name: string, args: Record<string, unknown>) {
  const lang = args["lang"] === "en" ? "en" : "es";

  if (name === "get_services") {
    const list = services.map((s) => ({ slug: s.slug, name: s[lang].name, tagline: s[lang].tagline }));
    return textResult(JSON.stringify({ services: list }, null, 2));
  }

  if (name === "get_service_detail") {
    const slug = String(args["slug"] ?? "");
    const service = getService(slug);
    if (!service) return textResult(`Unknown service slug: ${slug}`, true);
    const copy = service[lang];
    return textResult(
      JSON.stringify(
        { slug: service.slug, name: copy.name, tagline: copy.tagline, intro: copy.intro, includes: copy.includes, process: copy.process, faq: copy.faq },
        null,
        2,
      ),
    );
  }

  if (name === "get_blog_posts") {
    const category = typeof args["category"] === "string" ? args["category"].toLowerCase() : undefined;
    const list = blogPosts
      .filter((p) => !category || p.es.category.toLowerCase().includes(category) || p.en.category.toLowerCase().includes(category))
      .map((p) => ({ slug: p.slug, title: p[lang].title, excerpt: p[lang].excerpt, category: p[lang].category, date: p.date }));
    return textResult(JSON.stringify({ posts: list }, null, 2));
  }

  if (name === "get_blog_post_detail") {
    const slug = String(args["slug"] ?? "");
    const post = getPost(slug);
    if (!post) return textResult(`Unknown blog post slug: ${slug}`, true);
    const copy = post[lang];
    return textResult(
      JSON.stringify({ slug: post.slug, title: copy.title, category: copy.category, content: copy.content, faq: copy.faq, date: post.date }, null, 2),
    );
  }

  if (name === "request_contact") {
    const message = typeof args["message"] === "string" ? args["message"] : "Hola, quiero más información sobre sus servicios.";
    return textResult(`Contact link (opens WhatsApp): ${waLink(message)}\nEmail: ${CONTACT.email}`);
  }

  return textResult(`Unknown tool: ${name}`, true);
}

function rpcResult(id: JsonRpcRequest["id"], result: unknown) {
  return json({ jsonrpc: "2.0", id, result });
}

function rpcError(id: JsonRpcRequest["id"], code: number, message: string) {
  return json({ jsonrpc: "2.0", id, error: { code, message } });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "POST, OPTIONS" } });
}

export async function GET() {
  return json({ error: "Method not allowed — POST JSON-RPC 2.0 messages to this endpoint" }, 405);
}

export async function POST(request: Request) {
  let body: JsonRpcRequest;
  try {
    body = await request.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, 400);
  }

  const { id, method, params } = body;

  if (method === "initialize") {
    return rpcResult(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "dizayn-mcp", title: "Dizayn", version: "1.0.0" },
      instructions: "Real, read-only data about Dizayn's marketing agency services in Guadalajara, Jalisco, Mexico, plus the blog — including real client case studies (e.g. Luvory Luxury Toilets: website, SEO, GEO, AI agent infrastructure, social media). No authentication required.",
    });
  }

  if (method === "notifications/initialized" || method === "notifications/cancelled") {
    return new Response(null, { status: 202 });
  }

  if (method === "ping") {
    return rpcResult(id, {});
  }

  if (method === "tools/list") {
    return rpcResult(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const name = String(params?.["name"] ?? "");
    const args = (params?.["arguments"] as Record<string, unknown>) ?? {};
    if (!TOOLS.some((t) => t.name === name)) {
      return rpcError(id, -32602, `Unknown tool: ${name}`);
    }
    return rpcResult(id, callTool(name, args));
  }

  return rpcError(id, -32601, `Method not found: ${method}`);
}
