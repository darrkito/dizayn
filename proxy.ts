import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LLMS_TXT } from "@/content/llms-txt";

// Accept-header content negotiation for agents requesting markdown instead of
// HTML — real gap found via isitagentready.com's markdownNegotiation check.
// Homepage only for now: reuses the existing, real llms.txt content (already
// a genuine whole-site summary) rather than fabricating a separate markdown
// rendering pipeline. Imported as a bundled constant, not read from disk —
// proxy.ts runs in the Edge Runtime by default, which has no `fs` access.
// `middleware.ts` is deprecated in Next.js 16.3+, renamed to `proxy.ts` —
// see node_modules/next/dist/docs/.../proxy.md.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") ?? "";

  if (pathname === "/" && accept.includes("text/markdown")) {
    return new Response(LLMS_TXT, {
      headers: { "content-type": "text/markdown; charset=utf-8" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
