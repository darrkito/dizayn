import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { buildAlternates, langPath, stripLangPrefix } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, faqPage, serviceNode } from "@/lib/schema";
import { servicePrice } from "@/lib/pricing";

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
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "website", url: enPath, image: ogImagePath("service", "us", "en", service.slug) }),
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

  const path = `/us/en/services/${slug}`;
  const faq = service.us!.en.faq;
  const node = serviceNode({ service, lang: "en", market: "us", path, image: ogImagePath("service", "us", "en", service.slug), price: servicePrice(esSlug, "us") });

  return (
    <>
      <JsonLd data={[node, faqPage(faq, abs(path))]} />
      <ServiceDetailContent slug={esSlug} lang="en" market="us" />
    </>
  );
}
