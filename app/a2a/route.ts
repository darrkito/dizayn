// Minimal A2A (Agent2Agent) server at POST /a2a. Schema and wire format
// confirmed live against a real, working reference implementation
// (lemusweddings.com/api/a2a — independently scanned "Level 5 Agent-Native")
// rather than guessed from ambiguous docs: the correct JSON-RPC method is
// "message/send" (NOT "SendMessage", which the reference server itself
// rejects with -32601 — tested directly), and the correct response for a
// stateless one-shot reply is a direct Message object (kind: "message"),
// not a wrapped Task. See ~/agent-readiness-playbook.md §6.

import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { usBlogPosts } from "@/content/us-blog";
import { PRICE_ROWS } from "@/content/us-pricing";
import { waLink, CONTACT } from "@/content/contact";

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
  });
}

function rpcResult(id: JsonRpcRequest["id"], result: unknown) {
  return json({ jsonrpc: "2.0", id, result });
}

function rpcError(id: JsonRpcRequest["id"], code: number, message: string) {
  return json({ jsonrpc: "2.0", id, error: { code, message } });
}

function extractText(message: unknown): string {
  if (typeof message !== "object" || message === null) return "";
  const parts = (message as Record<string, unknown>)["parts"];
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p) => (typeof p === "object" && p !== null ? (p as Record<string, unknown>)["text"] : undefined))
    .filter((t): t is string => typeof t === "string")
    .join(" ");
}

const SPANISH_HINTS =
  /[áéíóúñ¿¡]|(?:\bcu[aá]nto\b|\bd[oó]nde\b|\bqu[eé]\b|\bc[oó]mo\b|\bcontacto\b|\bprecio\b|\bservicio\b|\bpara\b|\bcon\b|\bcosto\b|\bhola\b|\bbuenas?\b|\bgracias\b|\bquiero\b|\bnecesito\b|\bayuda\b|\btienen\b|\bofrecen\b|\bsobre\b|\by\b|\bde\b)/i;

function isSpanish(text: string): boolean {
  return SPANISH_HINTS.test(text);
}

function respondToMessage(text: string): string {
  const lower = text.toLowerCase();
  const es = isSpanish(text);

  if (/contact|whatsapp|email|cotiza|precio|price|cost|cuanto cuesta|how much|contacto/.test(lower)) {
    const wa = waLink("Hola, quiero más información sobre sus servicios.");
    return es
      ? `Contacta a Dizayn por WhatsApp: ${wa} o correo ${CONTACT.email}`
      : `Contact Dizayn via WhatsApp: ${wa} or email ${CONTACT.email}`;
  }

  const serviceMatch = services.find((s) => lower.includes(s.slug.replace(/-/g, " ")) || lower.includes(s.es.name.toLowerCase()) || lower.includes(s.en.name.toLowerCase()));
  if (serviceMatch) {
    return es ? `${serviceMatch.es.name}: ${serviceMatch.es.intro}` : `${serviceMatch.en.name}: ${serviceMatch.en.intro}`;
  }

  if (/case stud|portfolio|examples?\b|past (work|clients?)|caso(s)? de éxito|portafolio|ejemplos?|clientes reales|luvory/.test(lower)) {
    const caseStudies = blogPosts.filter((p) => p.slug.startsWith("caso-luvory"));
    const list = caseStudies.map((p) => (es ? p.es.title : p.en.title)).join(" | ");
    return es
      ? `Sí, tenemos casos de éxito reales documentados, incluyendo el trabajo con Luvory Luxury Toilets (sitio web, SEO, GEO, infraestructura de agente de IA, redes sociales, cobertura de eventos): ${list}. Consulta la herramienta MCP get_blog_posts o https://dizayn.com.mx/blog para el detalle completo.`
      : `Yes, we have real documented case studies, including our work with Luvory Luxury Toilets (website, SEO, GEO, AI agent infrastructure, social media, event coverage): ${list}. Check the get_blog_posts MCP tool or https://dizayn.com.mx/blog for full detail.`;
  }

  // Nearshore/US-market intent — separate branch before the generic FAQ search since
  // "how much" / "how do I pay" here means the US-market USD rate card, not the MX one
  // (which has no published site-wide pricing at all outside a few blog posts).
  if (/nearshore|united states|\bus\b market|\bus\b client|estados unidos|eeuu|ee\.uu|hispanic|hispano/.test(lower)) {
    const rows = PRICE_ROWS.map((r) => (es ? `${r.service.es}: ${r.ours} USD ${r.unit.es}` : `${r.service.en}: ${r.ours} USD ${r.unit.en}`)).join(" | ");
    return es
      ? `Sí, atendemos negocios en Estados Unidos: mismo equipo, precios en USD, contrato en inglés, equipo bilingüe. Precios reales: ${rows}. Pagos por PayPal, transferencia bancaria o cripto (BTC, USDC, USDT). Más en https://dizayn.com.mx/us o la herramienta MCP get_pricing.`
      : `Yes, we serve US businesses: same team, USD pricing, English-language contract, bilingual team. Real pricing: ${rows}. Payment via PayPal, bank wire, or crypto (BTC, USDC, USDT). More at https://dizayn.com.mx/us/en or the get_pricing MCP tool.`;
  }

  if (/pay(ment)?|paypal|wire transfer|crypto|bitcoin|usdc|usdt|w-?8ben|c[oó]mo (le )?pago|c[oó]mo pagar/.test(lower)) {
    return es
      ? "Aceptamos PayPal (tarjeta de crédito o débito), transferencia bancaria internacional (wire) y cripto: BTC, USDC y USDT. Facturamos en USD con contrato en inglés y entregamos el formulario W-8BEN-E para tu contador. Más detalle: https://dizayn.com.mx/us/blog/como-pagarle-a-una-agencia-en-mexico"
      : "We accept PayPal (credit or debit card), international bank wire transfer, and crypto: BTC, USDC, and USDT. We invoice in USD with an English-language contract and provide a W-8BEN-E for your accountant. More detail: https://dizayn.com.mx/us/en/blog/how-to-pay-a-mexican-agency";
  }

  // 2026-08-27 — added after the same gap was found and fixed on Luvory's A2A:
  // this responder had no FAQ search at all, only service-name and case-study
  // matches above, so any question matching a service/blog post's own FAQ
  // (real, specific answers) fell straight through to the generic services
  // list below. Searches every service's and blog post's faq[] for this
  // language directly — no separate homepage-only FAQ file exists here to
  // drift from, so this is additive, not a duplicate-source fix like Luvory's.
  const lang = es ? "es" : "en";
  const inputWords = new Set(lower.split(/\W+/).filter((w) => w.length > 4));
  const allFaq = [
    ...services.flatMap((s) => s[lang].faq),
    ...services.filter((s) => s.us).flatMap((s) => s.us![lang].faq),
    ...blogPosts.flatMap((p) => p[lang].faq),
    ...usBlogPosts.flatMap((p) => p[lang].faq),
  ];
  const faqMatch = allFaq.find((f) => {
    const questionWords = f.q.toLowerCase().split(/\W+/);
    return questionWords.some((w) => w.length > 4 && inputWords.has(w));
  });
  if (faqMatch) return faqMatch.a;

  if (es) {
    const list = services.map((s) => s.es.name).join(", ");
    return `Dizayn es una agencia de marketing en Guadalajara, Jalisco, México. Servicios: ${list}. Pregunta por un servicio específico, precios, o cómo contactarnos.`;
  }
  const list = services.map((s) => s.en.name).join(", ");
  return `Dizayn is a marketing agency in Guadalajara, Jalisco, Mexico. Services: ${list}. Ask about a specific service, pricing, or how to get in touch.`;
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

  if (method === "message/send") {
    const message = params?.["message"];
    const text = extractText(message);
    if (!text) return rpcError(id, -32602, "Invalid params: message.parts[].text required");

    const contextId = `ctx-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 10)}`;
    const messageId = `msg-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 10)}`;
    const replyText = respondToMessage(text);
    return rpcResult(id, {
      kind: "message",
      role: "agent",
      messageId,
      contextId,
      parts: [{ kind: "text", text: replyText }],
    });
  }

  return rpcError(id, -32601, `Method not found: ${method}`);
}
