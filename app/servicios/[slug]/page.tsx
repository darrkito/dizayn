import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { langPath } from "@/lib/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dizayn.com.mx";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Servicio no encontrado", robots: { index: false } };

  const { metaTitle, metaDescription } = service.es;
  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: { title: metaTitle, description: metaDescription, type: "website", url: `/servicios/${slug}`, images: ["/og-image.jpg"] },
    alternates: {
      canonical: `/servicios/${slug}`,
      languages: { es: `/servicios/${slug}`, en: langPath(`/servicios/${slug}`, "en") },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.es.metaTitle,
    description: service.es.intro,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "MX",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailContent slug={slug} lang="es" />
    </>
  );
}
