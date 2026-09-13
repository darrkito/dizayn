import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { getPriceRow } from "@/content/us-pricing";
import { buildAlternates, langPath, stripLangPrefix } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

/** The route param is the translated English slug (e.g. "ai-visibility") — same EN_SLUG_MAP
 * as the MX /en/services/[slug] route, resolved back to the canonical Spanish slug. */
const resolveEsSlug = (enSlug: string) => stripLangPrefix(`/en/services/${enSlug}`).split("/").pop()!;

const usServiceSlugs = services.filter((s) => s.us).map((s) => s.slug);

export function generateStaticParams() {
  return usServiceSlugs.map((slug) => ({ slug: langPath(`/servicios/${slug}`, "en").split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(resolveEsSlug(slug));
  if (!service?.us) return { title: "Service not found", robots: { index: false } };

  const { metaTitle, metaDescription } = service.us.en;
  const enPath = `/us/en/services/${slug}`;
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: { title: metaTitle, description: metaDescription, type: "website", url: enPath, images: ["/og-image.jpg"] },
    alternates: buildAlternates(`/servicios/${service.slug}`, "en-US"),
  };
}

export default async function UsServiceDetailPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const esSlug = resolveEsSlug(slug);
  const service = getService(esSlug);
  if (!service?.us) notFound();

  const price = getPriceRow(esSlug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.us.en.metaTitle,
    description: service.us.en.intro,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "US",
    ...(price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: price.minPriceUsd,
          maxPrice: price.maxPriceUsd,
          priceCurrency: "USD",
          billingIncrement: price.billingIncrement === "month" ? "1" : undefined,
          unitText: price.billingIncrement === "month" ? "MON" : undefined,
        },
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailContent slug={esSlug} lang="en" market="us" />
    </>
  );
}
