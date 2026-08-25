// Minimal A2A (Agent2Agent) server at POST /a2a. Agent Card schema confirmed
// against the protocol's authoritative source (specification/a2a.proto in
// github.com/a2aproject/A2A). The exact JSON-RPC method name for sending a
// message could NOT be verified with confidence — 3 spec fetches gave 3
// different answers during the Luvory build. Implemented as "SendMessage"
// (best-corroborated, matches the proto's RPC name directly), with a real
// JSON-RPC "method not found" for anything else — see
// ~/agent-readiness-playbook.md §6.

import { services } from "@/content/services";
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

function respondToMessage(text: string): string {
  const lower = text.toLowerCase();

  if (/contact|whatsapp|email|cotiza|precio|price|cost|cuanto cuesta|how much/.test(lower)) {
    return `Contact Dizayn via WhatsApp: ${waLink("Hola, quiero más información sobre sus servicios.")} or email ${CONTACT.email}`;
  }

  const serviceMatch = services.find((s) => lower.includes(s.slug.replace(/-/g, " ")) || lower.includes(s.es.name.toLowerCase()) || lower.includes(s.en.name.toLowerCase()));
  if (serviceMatch) {
    return `${serviceMatch.es.name} / ${serviceMatch.en.name}: ${serviceMatch.en.intro}`;
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

  if (method === "SendMessage") {
    const message = params?.["message"];
    const text = extractText(message);
    if (!text) return rpcError(id, -32602, "Invalid params: message.parts[].text required");

    const now = new Date().toISOString();
    const taskId = `task-${Math.random().toString(36).slice(2, 12)}`;
    const contextId = `ctx-${Math.random().toString(36).slice(2, 12)}`;
    const replyText = respondToMessage(text);
    return rpcResult(id, {
      id: taskId,
      contextId,
      status: { state: "TASK_STATE_COMPLETED", timestamp: now },
      artifacts: [{ id: "artifact-1", mediaType: "text/plain", parts: [{ text: replyText }] }],
      history: [message, { messageId: `msg-${Math.random().toString(36).slice(2, 10)}`, role: "ROLE_AGENT", parts: [{ text: replyText }] }],
    });
  }

  return rpcError(id, -32601, `Method not found: ${method}`);
}

