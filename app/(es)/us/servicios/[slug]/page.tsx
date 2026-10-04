import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { buildAlternates } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, faqPage, serviceNode } from "@/lib/schema";
import { servicePrice } from "@/lib/pricing";

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
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "website", url: `/us/servicios/${slug}`, image: ogImagePath("service", "us", "es", service.slug) }),
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

  const path = `/us/servicios/${slug}`;
  const faq = service.us!.es.faq;
  const node = serviceNode({ service, lang: "es", market: "us", path, image: ogImagePath("service", "us", "es", service.slug), price: servicePrice(slug, "us") });

  return (
    <>
      <JsonLd data={[node, faqPage(faq, abs(path))]} />
      <ServiceDetailContent slug={slug} lang="es" market="us" />
    </>
  );
}
