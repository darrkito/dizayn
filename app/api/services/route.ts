import { services } from "@/content/services";
import { CONTACT } from "@/content/contact";
import { langPath, usPath } from "@/lib/routes";
import { apiJson, getLang, getMarket } from "@/lib/api-response";

export async function GET(request: Request) {
  const lang = getLang(request);
  const market = getMarket(request);
  const isUs = market === "us";
  return apiJson({
    business: {
      name: "Dizayn",
      description: isUs
        ? lang === "en"
          ? "Nearshore marketing agency from Guadalajara, Mexico for US businesses — web design, SEO, GEO/AI visibility, social media, sales funnels. USD pricing."
          : "Agencia de marketing nearshore desde Guadalajara, México, para negocios en EE.UU. — sitios web, SEO, GEO, redes sociales, embudos de venta. Precios en USD."
        : lang === "en"
          ? "Marketing and brand agency in Guadalajara, Jalisco, Mexico — web design, SEO, GEO/AI visibility, social media, sales funnels, photography, video production."
          : "Agencia de marketing y marca en Guadalajara, Jalisco, México — diseño web, SEO, GEO/visibilidad en IA, redes sociales, embudos de venta, fotografía, video.",
      url: "https://dizayn.com.mx",
      city: CONTACT.city[lang],
    },
    market,
    services: (isUs ? services.filter((s) => s.us) : services).map((s) => {
      const copy = isUs ? s.us![lang] : s[lang];
      return {
        slug: s.slug,
        name: copy.name,
        tagline: copy.tagline,
        intro: copy.intro,
        includes: copy.includes,
        forWho: copy.forWho,
        url: `https://dizayn.com.mx${isUs ? usPath(`/servicios/${s.slug}`, lang) : langPath(`/servicios/${s.slug}`, lang)}`,
      };
    }),
  });
}
