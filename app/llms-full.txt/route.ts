import { services } from "@/content/services";
import { blogPosts, type BlogPost } from "@/content/blog";
import { usBlogPosts } from "@/content/us-blog";
import { MX_PRICE_ROWS } from "@/content/mx-pricing";
import { PRICE_ROWS } from "@/content/us-pricing";
import type { Lang } from "@/content/services";
import { apiText, SITE_URL } from "@/lib/api-response";
import { marketPath, type Market } from "@/lib/routes";

/** The whole site as one Markdown file for LLM fetchers (ChatGPT-User, Claude-User,
 * Perplexity-User): every service, both rate cards, every post. Mexican pages in Spanish, the
 * US section in English, each with its canonical URL. Google Search ignores this file (its May
 * 2026 AI guide says so), so it's generated from the same content arrays, never hand-written.
 * X-Robots-Tag: noindex is set in next.config.ts. */
export const dynamic = "force-static";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
// Content strings link internally with bare ES paths: make them absolute for the right market.
const absolutize = (md: string, lang: Lang, market: Market) =>
  md.replace(/\]\((\/[^)]*)\)/g, (_m, p: string) => `](${abs(p.startsWith("/us") ? p : marketPath(p, lang, market))})`);

function serviceSection(lang: Lang, market: Market) {
  const shown = market === "us" ? services.filter((s) => s.us) : services;
  return shown
    .map((s) => {
      const c = market === "us" ? s.us![lang] : s[lang];
      return [
        `### ${c.metaTitle}`,
        `URL: ${abs(marketPath(`/servicios/${s.slug}`, lang, market))}`,
        "",
        c.answer ?? "",
        "",
        c.intro,
        "",
        `**${lang === "es" ? "Qué incluye" : "What's included"}:**`,
        ...c.includes.map((i) => `- ${i}`),
        "",
        `**${lang === "es" ? "Proceso" : "Process"}:**`,
        ...c.process.map((p, i) => `${i + 1}. ${p.title}: ${p.body}`),
        "",
        `**${lang === "es" ? "Preguntas frecuentes" : "FAQ"}:**`,
        ...c.faq.flatMap((f) => [`- **${f.q}** ${f.a}`]),
      ].join("\n");
    })
    .join("\n\n");
}

function postSection(posts: BlogPost[], lang: Lang, market: Market) {
  return posts
    .map((p) => {
      const c = p[lang];
      return [
        `### ${c.title}`,
        `URL: ${abs(marketPath(`/blog/${p.slug}`, lang, market))}`,
        `${lang === "es" ? "Publicado" : "Published"}: ${p.date} · ${lang === "es" ? "Actualizado" : "Updated"}: ${p.dateModified} · ${c.category}`,
        "",
        absolutize(c.content.trim(), lang, market),
        ...(c.faq.length ? ["", `**${lang === "es" ? "Preguntas frecuentes" : "FAQ"}:**`, ...c.faq.map((f) => `- **${f.q}** ${absolutize(f.a, lang, market)}`)] : []),
      ].join("\n");
    })
    .join("\n\n---\n\n");
}

export function GET() {
  const body = [
    "# Dizayn: full site content",
    "",
    "> Marketing agency in Guadalajara, Jalisco, Mexico: web design, SEO, GEO (AI search visibility), social media, sales funnels, photography and video. Summary and links: " +
      abs("/llms.txt"),
    "",
    "## Precios en México (MXN, antes de IVA)",
    "",
    "| Servicio | Rango | Detalle |",
    "|---|---|---|",
    ...MX_PRICE_ROWS.map((r) => `| ${r.service.es} | ${r.range} MXN ${r.unit.es} | ${r.tiers.es.join("; ")} |`),
    "",
    `Fuente: ${abs("/precios")}`,
    "",
    "## Servicios (México)",
    "",
    serviceSection("es", "mx"),
    "",
    "## US market: USD pricing",
    "",
    "| Service | Dizayn | US market average |",
    "|---|---|---|",
    ...PRICE_ROWS.map((r) => `| ${r.service.en} | ${r.ours} USD ${r.unit.en} | ${r.usMarket.en} |`),
    "",
    `Source: ${abs("/us/en/pricing")}`,
    "",
    "## US market: services",
    "",
    serviceSection("en", "us"),
    "",
    "## Blog (México)",
    "",
    postSection(blogPosts, "es", "mx"),
    "",
    "## US guides",
    "",
    postSection(usBlogPosts, "en", "us"),
    "",
  ].join("\n");
  return apiText(body, "text/markdown; charset=utf-8");
}
