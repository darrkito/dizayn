const SITE_URL = "https://dizayn.com.mx";

export async function GET() {
  const body = {
    linkset: [
      {
        anchor: `${SITE_URL}/api`,
        "service-desc": [{ href: `${SITE_URL}/api/openapi`, type: "application/vnd.oai.openapi+json;version=3.1", title: "Dizayn public REST API - OpenAPI 3.1 description" }],
        "service-doc": [{ href: `${SITE_URL}/api/health`, type: "application/json", title: "Health check" }],
        status: [{ href: `${SITE_URL}/api/health`, type: "application/json", title: "Health check" }],
      },
    ],
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "content-type": "application/linkset+json; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "public, max-age=300" },
  });
}
