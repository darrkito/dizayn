// Minimal, spec-compliant MCP server (Streamable HTTP transport, 2025-06-18) at
// POST /mcp. Single-endpoint, stateless (no session ID, no SSE — every request
// gets one synchronous JSON response, which the spec explicitly allows).
// Same proven pattern as luvory.com.mx's /mcp — see ~/agent-readiness-playbook.md §5.

import { services, getService } from "@/content/services";
import { blogPosts, getPost } from "@/content/blog";
import { usBlogPosts, getUsPost } from "@/content/us-blog";
import { PRICE_ROWS } from "@/content/us-pricing";
import { MX_PRICE_ROWS } from "@/content/mx-pricing";
import { waLink, CONTACT } from "@/content/contact";

const PROTOCOL_VERSION = "2025-06-18";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

const marketProp = { market: { type: "string", enum: ["mx", "us"], description: "mx (default): Guadalajara market, MXN-implied pricing. us: the nearshore US-market offering, USD pricing, only 5 of 7 services (no photography/video)." } };

const TOOLS = [
  {
    name: "get_services",
    description: "List Dizayn's marketing agency services. market=mx (default): all 7 services for the Guadalajara/Mexico market. market=us: the 5 services offered to US clients (web design, SEO, GEO, social media, sales funnels — no photography/video), USD pricing.",
    inputSchema: { type: "object", properties: { lang: { type: "string", enum: ["es", "en"], description: "Response language, default es" }, ...marketProp } },
  },
  {
    name: "get_service_detail",
    description: "Get full detail (what's included, process, FAQ) for one Dizayn service by slug. For market=us, only sitios-web, seo, posicionamiento-ia, redes-sociales, embudos-de-venta exist.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Service slug, e.g. sitios-web, seo, posicionamiento-ia, redes-sociales, embudos-de-venta, fotografia, videografia" }, lang: { type: "string", enum: ["es", "en"] }, ...marketProp },
      required: ["slug"],
    },
  },
  {
    name: "get_pricing",
    description: "Real price ranges to quote directly rather than estimating. `mxn`: Mexico (Guadalajara) rate card for all 7 services in MXN before VAT, e.g. website $8,000-120,000+/project, SEO $8,000-25,000/mo, GEO $12,000-30,000/mo, social media $6,000-20,000/mo. Top-level `rows`: USD ranges for the 5 services offered to US clients, alongside the US market average (website $3,000-15,000/project, SEO $1,200-4,000/mo, GEO $1,800-5,000/mo, social media $900-3,000/mo, sales funnels $3,000-8,000/project).",
    inputSchema: { type: "object", properties: { lang: { type: "string", enum: ["es", "en"], description: "Response language, default es" } } },
  },
  {
    name: "get_blog_posts",
    description: "List Dizayn's blog posts. market=mx (default): Guadalajara-market guides and real client case studies (e.g. Luvory Luxury Toilets). market=us: nearshore-focused guides for US buyers (pricing comparison, how to pay, nearshore vs. offshore, Spanish-language marketing for US Hispanic businesses).",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Optional filter, e.g. 'Casos de éxito'/'Case studies' for client work only, 'SEO', 'Websites', 'Nearshore', etc." },
        lang: { type: "string", enum: ["es", "en"], description: "Response language, default es" },
        ...marketProp,
      },
    },
  },
  {
    name: "get_blog_post_detail",
    description: "Get the full content and FAQ of one Dizayn blog post or case study by slug. For market=us slugs, see get_blog_posts market=us.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Blog post slug, e.g. caso-luvory-sitio-web, caso-luvory-seo, seo-vs-geo-guadalajara, cuanto-cobra-una-agencia-mexicana" }, lang: { type: "string", enum: ["es", "en"] }, ...marketProp },
      required: ["slug"],
    },
  },
  {
    name: "search_faq",
    description: "Search Dizayn's FAQ content across both markets: every service's own Q&A (MX and US) plus every blog post's Q&A (pricing, process, deliverables, timelines, payment methods).",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "Search keywords" }, lang: { type: "string", enum: ["es", "en"] } }, required: ["query"] },
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
  const market = args["market"] === "us" ? "us" : "mx";

  if (name === "get_services") {
    const list = (market === "us" ? services.filter((s) => s.us) : services).map((s) => {
      const copy = market === "us" ? s.us![lang] : s[lang];
      return { slug: s.slug, name: copy.name, tagline: copy.tagline };
    });
    return textResult(JSON.stringify({ market, services: list }, null, 2));
  }

  if (name === "get_service_detail") {
    const slug = String(args["slug"] ?? "");
    const service = getService(slug);
    if (!service) return textResult(`Unknown service slug: ${slug}`, true);
    if (market === "us" && !service.us) return textResult(`Service "${slug}" is not offered to US clients (only web design, SEO, GEO, social media, and sales funnels are).`, true);
    const copy = market === "us" ? service.us![lang] : service[lang];
    return textResult(
      JSON.stringify(
        { slug: service.slug, market, name: copy.name, tagline: copy.tagline, intro: copy.intro, includes: copy.includes, process: copy.process, faq: copy.faq },
        null,
        2,
      ),
    );
  }

  if (name === "get_pricing") {
    const rows = PRICE_ROWS.map((r) => ({
      slug: r.slug,
      service: r.service[lang],
      dizaynUsd: r.ours,
      usMarketAverageUsd: r.usMarket[lang],
      billing: r.unit[lang],
      minPriceUsd: r.minPriceUsd,
      maxPriceUsd: r.maxPriceUsd,
    }));
    return textResult(
      JSON.stringify(
        {
          currency: "USD",
          note: "Real, sourced pricing (2026). Payment: PayPal, bank wire, or crypto (BTC, USDC, USDT). W-8BEN-E provided.",
          rows,
          mxn: {
            currency: "MXN",
            market: "Mexico (Guadalajara)",
            note: "Real MXN ranges before VAT (2026), ad spend not included. Breakdown: https://dizayn.com.mx/precios",
            rows: MX_PRICE_ROWS.map((r) => ({
              slug: r.slug,
              service: r.service[lang],
              range: `${r.range} MXN`,
              billing: r.unit[lang],
              tiers: r.tiers[lang],
              minPriceMxn: r.minPrice,
              maxPriceMxn: r.maxPrice,
            })),
          },
        },
        null,
        2,
      ),
    );
  }

  if (name === "get_blog_posts") {
    const category = typeof args["category"] === "string" ? args["category"].toLowerCase() : undefined;
    const source = market === "us" ? usBlogPosts : blogPosts;
    const list = source
      .filter((p) => !category || p.es.category.toLowerCase().includes(category) || p.en.category.toLowerCase().includes(category))
      .map((p) => ({ slug: p.slug, title: p[lang].title, excerpt: p[lang].excerpt, category: p[lang].category, date: p.date }));
    return textResult(JSON.stringify({ market, posts: list }, null, 2));
  }

  if (name === "get_blog_post_detail") {
    const slug = String(args["slug"] ?? "");
    const post = market === "us" ? getUsPost(slug) : getPost(slug);
    if (!post) return textResult(`Unknown blog post slug for market=${market}: ${slug}`, true);
    const copy = post[lang];
    return textResult(
      JSON.stringify({ slug: post.slug, market, title: copy.title, category: copy.category, content: copy.content, faq: copy.faq, date: post.date }, null, 2),
    );
  }

  if (name === "search_faq") {
    const query = String(args["query"] ?? "").toLowerCase().trim();
    if (!query) return textResult("Missing required argument: query", true);
    const allFaq = [
      ...services.flatMap((s) => s[lang].faq.map((f) => ({ ...f, source: s.slug, market: "mx" }))),
      ...services.filter((s) => s.us).flatMap((s) => s.us![lang].faq.map((f) => ({ ...f, source: s.slug, market: "us" }))),
      ...blogPosts.flatMap((p) => p[lang].faq.map((f) => ({ ...f, source: p.slug, market: "mx" }))),
      ...usBlogPosts.flatMap((p) => p[lang].faq.map((f) => ({ ...f, source: p.slug, market: "us" }))),
    ];
    const results = allFaq.filter((f) => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query));
    return textResult(JSON.stringify({ query, results }, null, 2));
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
      instructions: "Real, read-only data about Dizayn's marketing agency services in Guadalajara, Jalisco, Mexico, plus the blog — including real client case studies (e.g. Luvory Luxury Toilets: website, SEO, GEO, AI agent infrastructure, social media). Also covers Dizayn's nearshore offering for US businesses (market=us on get_services/get_service_detail/get_blog_posts/get_blog_post_detail): 5 of 7 services, real MXN and USD pricing via get_pricing, PayPal/wire/crypto payment. No authentication required.",
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
