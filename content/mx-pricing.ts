import type { Lang } from "./services";

/** MXN rate card for the Mexican market (/precios, MX service pages, Service schema offers).
 * Ranges set 2026-10 against public 2026 market data for Guadalajara and Mexico: SEO boutique
 * agencies $8k-$25k/mo, local-business SEO $5k-$10k/mo, a Guadalajara agency at $14k-$45k/mo;
 * GEO specialists $15k-$30k/mo; social media agencies $4k-$25k/mo (avg ~$10k); funnel projects
 * $20k-$150k. Website, photo and video ranges match the ones already published in content/blog.ts
 * pricing guides, so every page quotes the same numbers. Same role as content/us-pricing.ts:
 * tabular data an LLM or search snippet can cite directly. */
export type MxPriceRow = {
  slug: string;
  service: Record<Lang, string>;
  /** Display range, e.g. "$8,000 – $25,000". Always MXN. */
  range: string;
  unit: Record<Lang, string>;
  /** Typical tiers inside the range — what moves a quote up or down. */
  tiers: Record<Lang, string[]>;
  minPrice: number;
  maxPrice: number;
  billing: "project" | "month";
};

export const MX_PRICE_ROWS: MxPriceRow[] = [
  {
    slug: "sitios-web",
    service: { es: "Sitio web", en: "Website" },
    range: "$8,000 – $120,000+",
    unit: { es: "por proyecto", en: "per project" },
    tiers: {
      es: [
        "Landing page: $8,000 – $18,000",
        "Sitio corporativo de 5 a 10 páginas: $18,000 – $45,000",
        "Tienda en línea: $45,000 – $120,000+",
      ],
      en: [
        "Landing page: $8,000 – $18,000",
        "5 to 10 page corporate site: $18,000 – $45,000",
        "Online store: $45,000 – $120,000+",
      ],
    },
    minPrice: 8000,
    maxPrice: 120000,
    billing: "project",
  },
  {
    slug: "seo",
    service: { es: "SEO", en: "SEO" },
    range: "$8,000 – $25,000",
    unit: { es: "al mes", en: "per month" },
    tiers: {
      es: [
        "SEO local (un negocio, zona metropolitana de Guadalajara): $8,000 – $12,000 al mes",
        "SEO nacional, B2B o varias sucursales: $12,000 – $25,000 al mes",
      ],
      en: [
        "Local SEO (one business, Guadalajara metro area): $8,000 – $12,000 per month",
        "National, B2B or multi-location SEO: $12,000 – $25,000 per month",
      ],
    },
    minPrice: 8000,
    maxPrice: 25000,
    billing: "month",
  },
  {
    slug: "posicionamiento-ia",
    service: { es: "GEO (posicionamiento en IA)", en: "GEO (AI visibility)" },
    range: "$12,000 – $30,000",
    unit: { es: "al mes", en: "per month" },
    tiers: {
      es: [
        "Diagnóstico inicial de visibilidad en IA: incluido en el primer mes",
        "GEO para un negocio local: $12,000 – $18,000 al mes",
        "GEO + SEO para marcas con competencia nacional: $18,000 – $30,000 al mes",
      ],
      en: [
        "Initial AI visibility diagnosis: included in the first month",
        "GEO for a local business: $12,000 – $18,000 per month",
        "GEO + SEO for brands competing nationally: $18,000 – $30,000 per month",
      ],
    },
    minPrice: 12000,
    maxPrice: 30000,
    billing: "month",
  },
  {
    slug: "redes-sociales",
    service: { es: "Redes sociales", en: "Social media" },
    range: "$6,000 – $20,000",
    unit: { es: "al mes", en: "per month" },
    tiers: {
      es: [
        "2 redes, 12 publicaciones al mes: $6,000 – $10,000",
        "3 redes, reels propios y community management: $10,000 – $20,000",
        "La inversión en anuncios se paga aparte, directo a la plataforma",
      ],
      en: [
        "2 networks, 12 posts per month: $6,000 – $10,000",
        "3 networks, original reels and community management: $10,000 – $20,000",
        "Ad spend is paid separately, directly to the platform",
      ],
    },
    minPrice: 6000,
    maxPrice: 20000,
    billing: "month",
  },
  {
    slug: "embudos-de-venta",
    service: { es: "Embudos de venta", en: "Sales funnels" },
    range: "$20,000 – $80,000",
    unit: { es: "por proyecto", en: "per project" },
    tiers: {
      es: [
        "Embudo de captación (landing, formulario, WhatsApp y seguimiento): $20,000 – $35,000",
        "Embudo completo con CRM, automatizaciones y secuencias de correo: $35,000 – $80,000",
      ],
      en: [
        "Lead funnel (landing page, form, WhatsApp and follow-up): $20,000 – $35,000",
        "Full funnel with CRM, automations and email sequences: $35,000 – $80,000",
      ],
    },
    minPrice: 20000,
    maxPrice: 80000,
    billing: "project",
  },
  {
    slug: "fotografia",
    service: { es: "Fotografía", en: "Photography" },
    range: "$6,000 – $30,000+",
    unit: { es: "por sesión o campaña", en: "per session or campaign" },
    tiers: {
      es: [
        "Sesión de producto en estudio (10 a 15 fotos retocadas): $6,000 – $12,000",
        "Sesión de gastronomía con styling: $10,000 – $20,000",
        "Campaña con varias locaciones y dirección de arte: $20,000 – $30,000+",
      ],
      en: [
        "Studio product session (10 to 15 retouched photos): $6,000 – $12,000",
        "Food photography session with styling: $10,000 – $20,000",
        "Campaign with multiple locations and art direction: $20,000 – $30,000+",
      ],
    },
    minPrice: 6000,
    maxPrice: 30000,
    billing: "project",
  },
  {
    slug: "videografia",
    service: { es: "Video y reels", en: "Video and reels" },
    range: "$12,000 – $80,000+",
    unit: { es: "por proyecto", en: "per project" },
    tiers: {
      es: [
        "Reel vertical: $12,000 – $25,000",
        "Video corporativo de 2 a 4 minutos: $25,000 – $50,000",
        "Comercial con casting y varias locaciones: $50,000 – $80,000+",
      ],
      en: [
        "Vertical reel: $12,000 – $25,000",
        "2 to 4 minute corporate film: $25,000 – $50,000",
        "Commercial with casting and multiple locations: $50,000 – $80,000+",
      ],
    },
    minPrice: 12000,
    maxPrice: 80000,
    billing: "project",
  },
];

export const getMxPriceRow = (slug: string) => MX_PRICE_ROWS.find((r) => r.slug === slug);
