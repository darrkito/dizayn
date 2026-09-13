import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { getPriceRow } from "@/content/us-pricing";
import { buildAlternates } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

// Only the 5 services exportable to a remote US client (excludes photography/video —
// see the 2026-09-13 US-expansion plan for why those two don't travel).
const usServiceSlugs = services.filter((s) => s.us).map((s) => s.slug);

export function generateStaticParams() {
  return usServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service?.us) return { title: "Servicio no encontrado", robots: { index: false } };

  const { metaTitle, metaDescription } = service.us.es;
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: { title: metaTitle, description: metaDescription, type: "website", url: `/us/servicios/${slug}`, images: ["/og-image.jpg"] },
    alternates: buildAlternates(`/servicios/${slug}`, "es-US"),
  };
}

export default async function UsServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service?.us) notFound();

  const price = getPriceRow(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.us.es.metaTitle,
    description: service.us.es.intro,
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
      <ServiceDetailContent slug={slug} lang="es" market="us" />
    </>
  );
}
