import type { Lang } from "@/content/services";

/** Canonical (Spanish) base path -> translated English path. Every section AND every
 * dynamic slug needs a real English translation, not just an /en prefix — an /en/*
 * URL still built from Spanish words (e.g. /en/servicios/seo) is functionally the same
 * bug as no /en prefix at all. This is the single choke point every internal link routes
 * through (see seo-ai-search-playbook.md §13, same pattern already used on Luvory). */
export const EN_SLUG_MAP: Record<string, string> = {
  "/servicios": "/services",
  "/servicios/sitios-web": "/services/web-design",
  "/servicios/seo": "/services/seo",
  "/servicios/posicionamiento-ia": "/services/ai-visibility",
  "/servicios/redes-sociales": "/services/social-media-management",
  "/servicios/embudos-de-venta": "/services/sales-funnels",
  "/servicios/fotografia": "/services/photography",
  "/servicios/videografia": "/services/video-production",
  "/portafolio": "/portfolio",
  "/nosotros": "/about",
  "/contacto": "/contact",
  "/blog/posicionamiento-marcas-ia-2026": "/blog/rank-brand-ai-search-2026",
  "/blog/cuanto-cuesta-sitio-web-guadalajara": "/blog/website-cost-guadalajara",
  "/blog/seo-local-guadalajara-guia": "/blog/local-seo-guadalajara-guide",
  "/blog/cuanto-cuesta-video-corporativo-guadalajara": "/blog/corporate-video-cost-guadalajara",
  "/blog/cuanto-cuesta-fotografia-producto-guadalajara": "/blog/product-photography-cost-guadalajara",
  "/blog/cuantas-publicaciones-redes-sociales-necesita-tu-marca": "/blog/how-often-post-social-media",
  "/blog/que-es-un-embudo-de-ventas": "/blog/what-is-a-sales-funnel",
  "/blog/diseno-a-medida-vs-plantilla": "/blog/custom-design-vs-template",
  "/blog/agencia-vs-freelancer-vs-equipo-interno": "/blog/agency-vs-freelancer-vs-in-house",
  "/blog/seo-vs-pauta-pagada-sem": "/blog/seo-vs-paid-search",
  "/blog/marketing-digital-para-restaurantes-guadalajara": "/blog/restaurant-marketing-guadalajara",
  "/blog/marketing-para-clinicas-guadalajara": "/blog/clinic-marketing-guadalajara",
  "/blog/marketing-para-despachos-profesionales-guadalajara": "/blog/law-firm-marketing-guadalajara",
  "/blog/diseno-paginas-web-guadalajara-que-incluye": "/blog/website-design-guadalajara-what-to-include",
  "/blog/como-elegir-agencia-redes-sociales-guadalajara": "/blog/how-to-choose-social-media-agency-guadalajara",
  "/blog/auditoria-seo-guadalajara": "/blog/seo-audit-guadalajara",
  "/blog/que-es-posicionamiento-web": "/blog/what-is-seo",
  "/blog/seo-vs-geo-guadalajara": "/blog/seo-vs-geo-guadalajara",
  "/blog/caso-luvory-sitio-web": "/blog/luvory-website-case-study",
  "/blog/caso-luvory-seo": "/blog/luvory-seo-case-study",
  "/blog/caso-luvory-geo-posicionamiento-ia": "/blog/luvory-geo-case-study",
  "/blog/caso-luvory-agente-ia-mcp": "/blog/luvory-ai-agent-case-study",
  "/blog/caso-luvory-redes-sociales": "/blog/luvory-social-media-case-study",
  "/blog/caso-luvory-cobertura-eventos-guadalajara": "/blog/luvory-event-coverage-case-study",
  "/blog/caso-luvory-wta-guadalajara-open": "/blog/luvory-wta-guadalajara-open-case-study",
  "/blog/caso-luvory-mundial-2026": "/blog/luvory-world-cup-2026-case-study",
  "/blog/caso-luvory-conciertos-mana-mau-ricky": "/blog/luvory-concerts-case-study",
  "/blog/agencia-marketing-guadalajara-vs-cdmx": "/blog/marketing-agency-guadalajara-vs-mexico-city",
  "/blog/como-elegir-agencia-marketing-digital-confiable": "/blog/how-to-choose-a-reliable-digital-marketing-agency",
  "/blog/video-marketing-marcas-mexicanas": "/blog/video-marketing-mexican-brands",
  "/blog/fotografia-producto-ecommerce": "/blog/product-photography-for-ecommerce",
  "/blog/sitio-web-que-vende-guadalajara": "/blog/website-that-sells-guadalajara",
  "/blog/seo-para-ecommerce-tiendas-online": "/blog/seo-for-ecommerce-online-stores",
  "/blog/seo-tips-para-principiantes": "/blog/seo-tips-for-beginners",
  "/blog/seo-negocios-varias-sucursales-mexico": "/blog/seo-for-multi-location-businesses-mexico",
};

const ES_SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(EN_SLUG_MAP).map(([es, en]) => [en, es])
);

export const langFromPath = (pathname: string): Lang =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

/** Strips a leading /en AND translates an English path back to its canonical Spanish
 * base path — self-healing even against a path that mixes /en with an untranslated
 * (old) Spanish slug, since the ES_SLUG_MAP lookup simply misses and falls through
 * to the already-correct stripped path. */
export const stripLangPrefix = (pathname: string): string => {
  if (pathname === "/en" || pathname === "/") return "/";
  const base = pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  return ES_SLUG_MAP[base] ?? base;
};

/** Builds the correct path for a given lang from a canonical (Spanish) base path. */
export const langPath = (basePath: string, lang: Lang): string => {
  if (lang === "es") return basePath;
  const translated = EN_SLUG_MAP[basePath] ?? basePath;
  return translated === "/" ? "/en" : `/en${translated}`;
};

/** Given the current pathname (in either language), computes the sibling URL in the
 * target language — the one function a language toggle or hreflang tag ever needs. */
export const altPath = (pathname: string, targetLang: Lang): string =>
  langPath(stripLangPrefix(pathname), targetLang);
