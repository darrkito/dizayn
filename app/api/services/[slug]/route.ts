import { getService } from "@/content/services";
import { waLink } from "@/content/contact";
import { langPath } from "@/lib/routes";
import { apiJson, apiNotFound, getLang } from "@/lib/api-response";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = getLang(request);
  const service = getService(slug);
  if (!service) return apiNotFound();

  const copy = service[lang];
  return apiJson({
    slug: service.slug,
    name: copy.name,
    tagline: copy.tagline,
    intro: copy.intro,
    includes: copy.includes,
    process: copy.process,
    forWho: copy.forWho,
    faq: copy.faq,
    url: `https://dizayn.com.mx${langPath(`/servicios/${service.slug}`, lang)}`,
    contactLink: waLink(lang === "en" ? `Hi, I'm interested in ${copy.name}` : `Hola, me interesa ${copy.name}`),
  });
}
