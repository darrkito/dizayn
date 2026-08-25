import { apiJson } from "@/lib/api-response";

export async function GET() {
  return apiJson({ status: "ok", service: "dizayn-api", time: new Date().toISOString() });
}
