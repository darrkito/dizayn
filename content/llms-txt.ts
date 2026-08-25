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

## Blog: guides

Practical pricing guides and marketing comparisons for the Guadalajara market.

- [Blog index](https://dizayn.com.mx/blog)
- [Cómo posicionar tu marca en las respuestas de IA](https://dizayn.com.mx/blog/posicionamiento-marcas-ia-2026)
- [¿Cuánto cuesta un sitio web en Guadalajara?](https://dizayn.com.mx/blog/cuanto-cuesta-sitio-web-guadalajara)
- [SEO local en Guadalajara: guía](https://dizayn.com.mx/blog/seo-local-guadalajara-guia)
- [¿Cuánto cuesta un video corporativo en Guadalajara?](https://dizayn.com.mx/blog/cuanto-cuesta-video-corporativo-guadalajara)
- [¿Cuánto cuesta una sesión de fotografía de producto?](https://dizayn.com.mx/blog/cuanto-cuesta-fotografia-producto-guadalajara)
- [¿Cuántas publicaciones a la semana necesita tu marca?](https://dizayn.com.mx/blog/cuantas-publicaciones-redes-sociales-necesita-tu-marca)
- [¿Qué es un embudo de ventas?](https://dizayn.com.mx/blog/que-es-un-embudo-de-ventas)
- [Diseño de sitio web a medida vs. plantilla](https://dizayn.com.mx/blog/diseno-a-medida-vs-plantilla)
- [Agencia vs. freelancer vs. equipo interno](https://dizayn.com.mx/blog/agencia-vs-freelancer-vs-equipo-interno)
- [SEO vs. pauta pagada (SEM)](https://dizayn.com.mx/blog/seo-vs-pauta-pagada-sem)
- [Marketing digital para restaurantes en Guadalajara](https://dizayn.com.mx/blog/marketing-digital-para-restaurantes-guadalajara)
- [Marketing para clínicas y consultorios](https://dizayn.com.mx/blog/marketing-para-clinicas-guadalajara)
- [Marketing para despachos profesionales](https://dizayn.com.mx/blog/marketing-para-despachos-profesionales-guadalajara)
- [Diseño de páginas web en Guadalajara: qué debe incluir](https://dizayn.com.mx/blog/diseno-paginas-web-guadalajara-que-incluye)
- [Cómo elegir una agencia de redes sociales en Guadalajara](https://dizayn.com.mx/blog/como-elegir-agencia-redes-sociales-guadalajara)
- [Auditoría SEO en Guadalajara: qué revisamos](https://dizayn.com.mx/blog/auditoria-seo-guadalajara)
- [¿Qué es el posicionamiento web?](https://dizayn.com.mx/blog/que-es-posicionamiento-web)
- [SEO vs. GEO: por qué necesitas ambos](https://dizayn.com.mx/blog/seo-vs-geo-guadalajara)
- [Agencia de marketing digital: ¿Guadalajara o CDMX?](https://dizayn.com.mx/blog/agencia-marketing-guadalajara-vs-cdmx)
- [Cómo elegir una agencia de marketing digital confiable en México](https://dizayn.com.mx/blog/como-elegir-agencia-marketing-digital-confiable)
- [Video marketing para marcas mexicanas: qué tipo de video necesitas](https://dizayn.com.mx/blog/video-marketing-marcas-mexicanas)
- [Fotografía de producto para e-commerce: lo que realmente necesitas](https://dizayn.com.mx/blog/fotografia-producto-ecommerce)
- [Cómo hacer un sitio web que venda (no solo que se vea bien)](https://dizayn.com.mx/blog/sitio-web-que-vende-guadalajara)

## Blog: real client case studies (Luvory Luxury Toilets)

Documented, real work — not illustrative examples. Covers website architecture, SEO, GEO, AI agent infrastructure, social media, and event-coverage content strategy for a real client.

- [Caso de éxito: el sitio web de Luvory](https://dizayn.com.mx/blog/caso-luvory-sitio-web)
- [Caso de éxito: SEO para Luvory](https://dizayn.com.mx/blog/caso-luvory-seo)
- [Caso de éxito: GEO para Luvory](https://dizayn.com.mx/blog/caso-luvory-geo-posicionamiento-ia)
- [Caso de éxito: infraestructura de agente de IA (MCP/A2A) para Luvory](https://dizayn.com.mx/blog/caso-luvory-agente-ia-mcp)
- [Caso de éxito: redes sociales de Luvory](https://dizayn.com.mx/blog/caso-luvory-redes-sociales)
- [Caso de éxito: cobertura de eventos de Luvory](https://dizayn.com.mx/blog/caso-luvory-cobertura-eventos-guadalajara)
- [Caso de éxito: cobertura del WTA Guadalajara Open](https://dizayn.com.mx/blog/caso-luvory-wta-guadalajara-open)
- [Caso de éxito: eventos alrededor del Mundial 2026](https://dizayn.com.mx/blog/caso-luvory-mundial-2026)
- [Caso de éxito: conciertos masivos (Maná, Mau y Ricky)](https://dizayn.com.mx/blog/caso-luvory-conciertos-mana-mau-ricky)

## English

An English version of every page above is available at the equivalent /en/* path with translated slugs, e.g. https://dizayn.com.mx/en, https://dizayn.com.mx/en/services/web-design, https://dizayn.com.mx/en/blog/luvory-website-case-study.

## Agent access

- Public REST API: https://dizayn.com.mx/api/openapi (OpenAPI 3.1) — includes /api/blog and /api/blog/{slug} for full post/case-study content, not just services
- MCP server: https://dizayn.com.mx/.well-known/mcp/server-card.json — tools include get_blog_posts and get_blog_post_detail
- A2A agent: https://dizayn.com.mx/a2a — ask it directly for case studies or examples

## Notes

- Sitemap: https://dizayn.com.mx/sitemap.xml
- Service area: Guadalajara, Jalisco, Mexico
- Contact: WhatsApp +52 462 192 2778, sebasesc5@gmail.com
`;
