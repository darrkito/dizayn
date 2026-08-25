import { apiText } from "@/lib/api-response";

const md = `# Answer questions about Dizayn's services

Help the user learn about Dizayn, a marketing and brand agency in Guadalajara, Jalisco, Mexico.

## When to use this skill
The user wants to know about web design, SEO, GEO/AI visibility marketing, social media management, sales funnels, photography, or video production services in Guadalajara.

## Real service catalog
Fetch \`https://www.dizayn.com.mx/api/services\` for the full list, or \`https://www.dizayn.com.mx/api/services/{slug}\` for one service's full detail (what's included, process, FAQ). Slugs: sitios-web, seo, posicionamiento-ia, redes-sociales, embudos-de-venta, fotografia, videografia.

## Contacting Dizayn
There is no automated booking API — direct the user to WhatsApp or email, both returned by the \`request_contact\` MCP tool, or visible at \`https://www.dizayn.com.mx/contacto\`.
`;

export async function GET() {
  return apiText(md, "text/markdown; charset=utf-8");
}
