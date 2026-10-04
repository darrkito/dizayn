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
  "/precios": "/pricing",
  "/privacidad": "/privacy-policy",
  "/terminos": "/terms-and-conditions",
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
  // US-only wedge posts (content/us-blog.ts, reachable at /us/blog/* and /us/en/blog/*)
  "/blog/cuanto-cobra-una-agencia-mexicana": "/blog/what-a-mexican-agency-charges",
  "/blog/como-pagarle-a-una-agencia-en-mexico": "/blog/how-to-pay-a-mexican-agency",
  "/blog/nearshore-vs-offshore-vs-agencia-en-eeuu": "/blog/nearshore-vs-offshore-vs-us-agency",
  "/blog/marketing-en-espanol-para-negocios-hispanos-en-eeuu": "/blog/spanish-marketing-for-us-hispanic-businesses",
};

const ES_SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(EN_SLUG_MAP).map(([es, en]) => [en, es])
);

export type Market = "mx" | "us";

export const marketFromPath = (pathname: string): Market =>
  pathname === "/us" || pathname.startsWith("/us/") ? "us" : "mx";

/** Market-aware: strips a leading /us before applying the original /en check, so callers
 * that pass a raw pathname (Header, Footer, WhatsAppButton) get the right language for
 * both /en/* (en-MX) and /us/en/* (en-US) without needing to know about market at all. */
export const langFromPath = (pathname: string): Lang => {
  const p = marketFromPath(pathname) === "us" ? pathname.slice(3) || "/" : pathname;
  return p === "/en" || p.startsWith("/en/") ? "en" : "es";
};

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
 * target language — the one function a language toggle or hreflang tag ever needs.
 * Market-aware: preserves /us vs MX, only switches language within it. */
export const altPath = (pathname: string, targetLang: Lang): string => {
  const market = marketFromPath(pathname);
  const rest = market === "us" ? pathname.slice(3) || "/" : pathname;
  const esBase = stripLangPrefix(rest);
  return market === "us" ? usPath(esBase, targetLang) : langPath(esBase, targetLang);
};

/** Builds the /us (es-US) or /us/en (en-US) path for a canonical (Spanish) base path.
 * Reuses EN_SLUG_MAP as-is — slugs are a function of language, not market, so the US
 * English section is translated exactly like the MX English section. */
export const usPath = (basePath: string, lang: Lang): string => {
  if (lang === "es") return basePath === "/" ? "/us" : `/us${basePath}`;
  const translated = EN_SLUG_MAP[basePath] ?? basePath;
  return translated === "/" ? "/us/en" : `/us/en${translated}`;
};

/** The home path for a given market+lang pair — used by the header's market switcher,
 * which always jumps to that market's home rather than guessing at an equivalent page
 * (not every MX page has a US sibling yet, and vice versa for pricing). */
export const marketHomePath = (market: Market, lang: Lang): string =>
  market === "us" ? (lang === "es" ? "/us" : "/us/en") : lang === "es" ? "/" : "/en";

export type HreflangCode = "es-MX" | "en-MX" | "es-US" | "en-US";

/** Centralized hreflang builder. Pass the canonical (es-MX) base path and which variant the
 * calling page IS; `us: false` omits the US pair for pages with no US sibling yet (the
 * ~30 pre-existing pages not covered in this pass). x-default always points at es-MX — the
 * site's actual origin — except for market-exclusive pages (e.g. pricing) with no MX
 * equivalent at all, which should pass their own es-US path as `esBasePath` isn't meaningful
 * there; see buildUsOnlyAlternates below for that case. */
export function buildAlternates(
  esBasePath: string,
  current: HreflangCode,
  opts: { us?: boolean } = {},
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {
    "es-MX": esBasePath,
    "en-MX": langPath(esBasePath, "en"),
  };
  if (opts.us !== false) {
    languages["es-US"] = usPath(esBasePath, "es");
    languages["en-US"] = usPath(esBasePath, "en");
  }
  return { canonical: languages[current], languages: { ...languages, "x-default": languages["es-MX"] } };
}

/** For pages that exist only in the US section (no MX equivalent, e.g. /us/precios) — takes
 * the canonical (Spanish) base path, same as buildAlternates, and returns just the es-US/en-US
 * pair with x-default pointing at the es-US version itself. */
export function buildUsOnlyAlternates(
  esBasePath: string,
  current: "es-US" | "en-US",
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {
    "es-US": usPath(esBasePath, "es"),
    "en-US": usPath(esBasePath, "en"),
  };
  return { canonical: languages[current], languages: { ...languages, "x-default": languages["es-US"] } };
}

/** A canonical (Spanish) base path rendered for a market+language: the one call components
 * need instead of repeating `isUs ? usPath(...) : langPath(...)`. */
export const marketPath = (basePath: string, lang: Lang, market: Market): string =>
  market === "us" ? usPath(basePath, lang) : langPath(basePath, lang);
