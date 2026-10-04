import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { usBlogPosts } from "@/content/us-blog";
import { MX_PRICE_ROWS } from "@/content/mx-pricing";
import { PRICE_ROWS } from "@/content/us-pricing";
import type { Lang } from "@/content/services";
import { marketPath, type Market } from "@/lib/routes";
import { CONTACT, SAME_AS } from "@/content/contact";
import { SITE_URL } from "@/lib/api-response";
import { MX_AREA_SERVED, ORG_ID, US_AREA_SERVED, WEBSITE_ID, abs, itemList, webPageNode } from "@/lib/schema";

/** Page-level JSON-LD for hub/static pages. Kept apart from lib/schema.ts because it imports the
 * full content arrays, and lib/schema.ts is reachable from client components (Breadcrumbs). */
export type HubKind = "services" | "blog" | "about" | "contact" | "portfolio" | "pricing";

export function hubPageSchema(
  kind: HubKind,
  { path, name, description, lang, market }: { path: string; name: string; description: string; lang: Lang; market: Market },
) {
  const base = { path, name, description, lang, market };
  switch (kind) {
    case "services": {
      const shown = market === "us" ? services.filter((s) => s.us) : services;
      return webPageNode({
        ...base,
        type: "CollectionPage",
        extra: {
          mainEntity: itemList(
            shown.map((s) => ({
              name: (market === "us" ? s.us![lang] : s[lang]).metaTitle,
              path: marketPath(`/servicios/${s.slug}`, lang, market),
            })),
          ),
        },
      });
    }
    case "blog": {
      const posts = market === "us" ? usBlogPosts : blogPosts;
      return webPageNode({
        ...base,
        type: "CollectionPage",
        extra: {
          mainEntity: {
            "@type": "Blog",
            "@id": `${abs(path)}#blog`,
            name,
            publisher: { "@id": ORG_ID },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p[lang].title,
              url: abs(marketPath(`/blog/${p.slug}`, lang, market)),
              datePublished: p.date,
              dateModified: p.dateModified,
            })),
          },
        },
      });
    }
    case "pricing": {
      const offers =
        market === "us"
          ? PRICE_ROWS.map((r) => ({
              name: r.service[lang],
              slug: r.slug,
              min: r.minPriceUsd,
              max: r.maxPriceUsd,
              currency: "USD",
            }))
          : MX_PRICE_ROWS.map((r) => ({ name: r.service[lang], slug: r.slug, min: r.minPrice, max: r.maxPrice, currency: "MXN" }));
      return webPageNode({
        ...base,
        type: "WebPage",
        extra: {
          mainEntity: {
            "@type": "OfferCatalog",
            name,
            itemListElement: offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@id": `${abs(marketPath(`/servicios/${o.slug}`, lang, market))}#service`, name: o.name },
              priceSpecification: { "@type": "PriceSpecification", minPrice: o.min, maxPrice: o.max, priceCurrency: o.currency },
            })),
          },
        },
      });
    }
    case "about":
      return webPageNode({ ...base, type: "AboutPage", extra: { mainEntity: { "@id": ORG_ID } } });
    case "contact":
      return webPageNode({ ...base, type: "ContactPage", extra: { mainEntity: { "@id": ORG_ID } } });
    case "portfolio":
      return webPageNode({ ...base, type: "CollectionPage", extra: { creator: { "@id": ORG_ID } } });
  }
}

/** The sitewide @graph in the root layout: WebSite + the one Organization node everything else
 * references by ORG_ID. Dizayn is a service-area business (owner decision, 2026-10): no street
 * address is published, only locality/region/country, with the served municipalities in
 * areaServed. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Dizayn",
        url: SITE_URL,
        inLanguage: ["es-MX", "en-MX", "es-US", "en-US"],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": ORG_ID,
        name: "Dizayn",
        alternateName: "Dizayn Agencia de Marketing",
        description:
          "Marketing agency in Guadalajara, Jalisco, Mexico: web design, SEO, GEO (AI search visibility), social media management, sales funnels, photography and video production.",
        slogan: "Marcas que se ven y se venden.",
        url: SITE_URL,
        logo: { "@type": "ImageObject", "@id": `${SITE_URL}/#logo`, url: `${SITE_URL}/icon.png`, contentUrl: `${SITE_URL}/icon.png` },
        image: `${SITE_URL}/og-image.jpg`,
        telephone: `+${CONTACT.whatsapp}`,
        email: CONTACT.email,
        priceRange: "$$",
        currenciesAccepted: "MXN, USD",
        areaServed: [...MX_AREA_SERVED, ...US_AREA_SERVED],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Guadalajara",
          addressRegion: "Jalisco",
          addressCountry: "MX",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${CONTACT.whatsapp}`,
          email: CONTACT.email,
          contactType: "sales",
          availableLanguage: ["Spanish", "English"],
          areaServed: ["MX", "US"],
        },
        knowsAbout: [
          "Web design",
          "Search engine optimization",
          "Local SEO",
          "Generative engine optimization",
          "AI search visibility",
          "Social media marketing",
          "Sales funnels",
          "Product photography",
          "Video production",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de marketing de Dizayn",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${abs(`/servicios/${s.slug}`)}#service`, name: s.es.metaTitle },
          })),
        },
        sameAs: SAME_AS,
      },
    ],
  };
}
