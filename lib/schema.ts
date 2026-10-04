import { SITE_URL } from "@/lib/api-response";
import type { Lang, Service } from "@/content/services";
import type { BlogPost } from "@/content/blog";
import type { Market } from "@/lib/routes";

/** schema.org JSON-LD builders. Every node that mentions Dizayn points at the single
 * Organization node declared in the root layout (ORG_ID) instead of re-declaring it, so search
 * engines and LLMs resolve one entity across the whole site. */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for a site path. The homepage is the bare origin, matching its canonical. */
export const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

export const inLanguage = (lang: Lang, market: Market) => `${lang}-${market === "us" ? "US" : "MX"}`;

/** Guadalajara metro municipalities served in person, plus the wider markets served remotely.
 * Shared by the Organization node and every MX Service node. */
export const MX_AREA_SERVED = [
  { "@type": "City", name: "Guadalajara", containedInPlace: { "@type": "State", name: "Jalisco" } },
  { "@type": "City", name: "Zapopan", containedInPlace: { "@type": "State", name: "Jalisco" } },
  { "@type": "City", name: "San Pedro Tlaquepaque", containedInPlace: { "@type": "State", name: "Jalisco" } },
  { "@type": "City", name: "Tonalá", containedInPlace: { "@type": "State", name: "Jalisco" } },
  { "@type": "City", name: "Tlajomulco de Zúñiga", containedInPlace: { "@type": "State", name: "Jalisco" } },
  { "@type": "State", name: "Jalisco" },
  { "@type": "Country", name: "Mexico" },
];
export const US_AREA_SERVED = [{ "@type": "Country", name: "United States" }];

export type Crumb = { label: string; href: string };

export const breadcrumbList = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    item: abs(c.href),
  })),
});

export const faqPage = (faq: { q: string; a: string }[], url: string) =>
  faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

/** Machine-readable price for a Service: a range for one-off projects, a monthly range for
 * retainers. Shared by MXN (MX pages) and USD (US pages) price tables. */
export type PriceRange = { min: number; max: number; currency: "MXN" | "USD"; billing: "project" | "month" };

const priceSpecification = ({ min, max, currency, billing }: PriceRange) =>
  billing === "month"
    ? {
        "@type": "UnitPriceSpecification",
        minPrice: min,
        maxPrice: max,
        priceCurrency: currency,
        unitCode: "MON",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      }
    : { "@type": "PriceSpecification", minPrice: min, maxPrice: max, priceCurrency: currency };

export function serviceNode({
  service,
  lang,
  market,
  path,
  image,
  price,
}: {
  service: Service;
  lang: Lang;
  market: Market;
  path: string;
  image: string;
  price?: PriceRange;
}) {
  const copy = market === "us" ? service.us![lang] : service[lang];
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name: copy.metaTitle,
    serviceType: copy.name,
    description: copy.answer ?? copy.intro,
    inLanguage: inLanguage(lang, market),
    image: abs(image),
    provider: { "@id": ORG_ID },
    areaServed: market === "us" ? US_AREA_SERVED : MX_AREA_SERVED,
    ...(price && {
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: price.currency,
        priceSpecification: priceSpecification(price),
        seller: { "@id": ORG_ID },
      },
    }),
  };
}

export function blogPostingNode({
  post,
  lang,
  market,
  path,
  image,
}: {
  post: BlogPost;
  lang: Lang;
  market: Market;
  path: string;
  image: string;
}) {
  const copy = post[lang];
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: copy.title,
    description: copy.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified,
    inLanguage: inLanguage(lang, market),
    articleSection: copy.category,
    wordCount: copy.content.split(/\s+/).filter(Boolean).length,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    url,
    image: { "@type": "ImageObject", url: abs(image), width: 1200, height: 630 },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/** Typed WebPage node for hub/static pages (AboutPage, ContactPage, CollectionPage...). */
export const webPageNode = ({
  type,
  path,
  name,
  description,
  lang,
  market,
  extra,
}: {
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
  lang: Lang;
  market: Market;
  extra?: Record<string, unknown>;
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": `${abs(path)}#webpage`,
  url: abs(path),
  name,
  description,
  inLanguage: inLanguage(lang, market),
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  ...extra,
});

/** ItemList of links (services hub, blog index). */
export const itemList = (items: { name: string; path: string }[]) => ({
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
});
