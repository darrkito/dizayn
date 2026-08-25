// Single source of truth for the site's llms.txt content — served as a static
// file at /llms.txt (app/llms.txt/route.ts) AND reused by proxy.ts for
// Accept: text/markdown content negotiation on the homepage. Keeping this as
// one constant avoids the two ever drifting out of sync.
export const LLMS_TXT = `# Dizayn

> Marketing and brand agency in Guadalajara, Jalisco, Mexico. Web design, SEO, GEO/AI-visibility marketing, social media management, sales funnels, photography, and video production.

Dizayn is a Guadalajara-based marketing agency offering web design & development, SEO, GEO (Generative Engine Optimization / AI-visibility) marketing, social media management, sales funnel design, photography, and video production.

## Services

- [Diseño de sitios web](https://dizayn.com.mx/servicios/sitios-web): Custom web design and development, no templates.
- [SEO](https://dizayn.com.mx/servicios/seo): Search engine optimization for Guadalajara-area and national reach.
- [Agencia GEO](https://dizayn.com.mx/servicios/posicionamiento-ia): Generative Engine Optimization — getting cited in AI Overviews, ChatGPT, Perplexity, Copilot.
- [Redes sociales](https://dizayn.com.mx/servicios/redes-sociales): Social media management and growth.
- [Embudos de venta](https://dizayn.com.mx/servicios/embudos-de-venta): Sales funnel design.
- [Fotografía](https://dizayn.com.mx/servicios/fotografia): Product and brand photography.
- [Videografía](https://dizayn.com.mx/servicios/videografia): Corporate and brand video production.

## Blog

Practical pricing guides and marketing comparisons for the Guadalajara market.

- [Blog index](https://dizayn.com.mx/blog)
- [Cómo posicionar tu marca en las respuestas de IA](https://dizayn.com.mx/blog/posicionamiento-marcas-ia-2026)
- [¿Cuánto cuesta un sitio web en Guadalajara?](https://dizayn.com.mx/blog/cuanto-cuesta-sitio-web-guadalajara)
- [SEO local en Guadalajara: guía](https://dizayn.com.mx/blog/seo-local-guadalajara-guia)
- [¿Qué es un embudo de ventas?](https://dizayn.com.mx/blog/que-es-un-embudo-de-ventas)
- [SEO vs. pauta pagada (SEM)](https://dizayn.com.mx/blog/seo-vs-pauta-pagada-sem)

## English

An English version of every page above is available at the equivalent /en/* path with translated slugs, e.g. https://dizayn.com.mx/en, https://dizayn.com.mx/en/services/web-design.

## Agent access

- Public REST API: https://dizayn.com.mx/api/openapi (OpenAPI 3.1)
- MCP server: https://dizayn.com.mx/.well-known/mcp/server-card.json

## Notes

- Sitemap: https://dizayn.com.mx/sitemap.xml
- Service area: Guadalajara, Jalisco, Mexico
- Contact: WhatsApp +52 462 192 2778, sebasesc5@gmail.com
`;
