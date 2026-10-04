import type { Metadata } from "next";
import { fitTitle, og, ogImagePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { getPost } from "@/content/blog";
import { langPath } from "@/lib/routes";
import { buildAlternates } from "@/lib/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { abs, faqPage, serviceNode } from "@/lib/schema";
import { servicePrice } from "@/lib/pricing";

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
    title: fitTitle(metaTitle),
    description: metaDescription,
    openGraph: og({ title: metaTitle, description: metaDescription, type: "website", url: `/servicios/${slug}`, image: ogImagePath("service", "mx", "es", service.slug) }),
    alternates: buildAlternates(`/servicios/${slug}`, "es-MX", { us: Boolean(service.us) }),
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

  const path = `/servicios/${slug}`;
  const faq = service.es.faq;
  const node = serviceNode({ service, lang: "es", market: "mx", path, image: ogImagePath("service", "mx", "es", service.slug), price: servicePrice(slug, "mx") });

  const related = (service.related ?? []).flatMap((s) => {
    const post = getPost(s);
    return post ? [{ href: langPath(`/blog/${s}`, "es"), title: post.es.title, category: post.es.category }] : [];
  });

  return (
    <>
      <JsonLd data={[node, faqPage(faq, abs(path))]} />
      <ServiceDetailContent slug={slug} lang="es" related={related} />
    </>
  );
}
