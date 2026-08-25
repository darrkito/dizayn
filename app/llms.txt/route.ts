import { LLMS_TXT } from "@/content/llms-txt";
import { apiText } from "@/lib/api-response";

export async function GET() {
  return apiText(LLMS_TXT, "text/markdown; charset=utf-8");
}
