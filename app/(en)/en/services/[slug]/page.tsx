import type { Metadata } from "next";
import { fitTitle, og } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { buildAlternates, langPath, stripLangPrefix } from "@/lib/routes";
import { SITE_URL } from "@/lib/api-response";

/** The route param is the translated English slug (e.g. "ai-visibility") — resolve it back
 * to the canonical Spanish slug the content is actually keyed by. */
const resolveEsSlug = (enSlug: string) => stripLangPrefix(`/en/services/${enSlug}`).split("/").pop()!;

export function generateStaticParams() {
  return services.map((s) => ({ slug: langPath(`/servicios/${s.slug}`, "en").split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(resolveEsSlug(slug));
  if (!service) return { title: "Service not found", robots: { index: false } };

  const { metaTitle, metaDescription } = service.en;
  const enPath = `/en/services/${slug}`;
  return {
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "website", url: enPath }),
    alternates: buildAlternates(`/servicios/${service.slug}`, "en-MX", { us: Boolean(service.us) }),
  };
}

export default async function ServiceDetailPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const esSlug = resolveEsSlug(slug);
  const service = getService(esSlug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.en.metaTitle,
    description: service.en.intro,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "MX",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetailContent slug={esSlug} lang="en" />
    </>
  );
}
