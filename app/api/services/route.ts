import { services } from "@/content/services";
import { CONTACT } from "@/content/contact";
import { langPath } from "@/lib/routes";
import { apiJson, getLang } from "@/lib/api-response";

export async function GET(request: Request) {
  const lang = getLang(request);
  return apiJson({
    business: {
      name: "Dizayn",
      description:
        lang === "en"
          ? "Marketing and brand agency in Guadalajara, Jalisco, Mexico — web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production."
          : "Agencia de marketing y marca en Guadalajara, Jalisco, México — diseño web, SEO, GEO/visibilidad en IA, redes sociales, embudos de venta, fotografía, video.",
      url: "https://www.dizayn.com.mx",
      city: CONTACT.city[lang],
    },
    services: services.map((s) => {
      const copy = s[lang];
      return {
        slug: s.slug,
        name: copy.name,
        tagline: copy.tagline,
        intro: copy.intro,
        includes: copy.includes,
        forWho: copy.forWho,
        url: `https://www.dizayn.com.mx${langPath(`/servicios/${s.slug}`, lang)}`,
      };
    }),
  });
}
