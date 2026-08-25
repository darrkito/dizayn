export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dizayn.com.mx";

export function apiJson(data: unknown, init?: { status?: number; contentType?: string }): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status: init?.status ?? 200,
    headers: {
      "content-type": init?.contentType ?? "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "public, max-age=300",
    },
  });
}

export function apiNotFound(): Response {
  return apiJson({ error: "Not found" }, { status: 404 });
}

export function apiText(body: string, contentType: string): Response {
  return new Response(body, {
    headers: {
      "content-type": contentType,
      "access-control-allow-origin": "*",
      "cache-control": "public, max-age=300",
    },
  });
}

export function getLang(request: Request): "es" | "en" {
  const url = new URL(request.url);
  return url.searchParams.get("lang") === "en" ? "en" : "es";
}
