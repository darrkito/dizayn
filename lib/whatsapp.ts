import type { Lang } from "@/content/services";
import { waLink } from "@/content/contact";
import { getDict } from "@/lib/i18n";
import { stripLangPrefix } from "@/lib/routes";

const clip = (s: string, n = 80) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/** Page-aware WhatsApp message. Pure and import-light on purpose: it runs in the global shell,
 * so it must not pull service/blog data into every page's JS. `topic` is the page's H1,
 * read from the DOM at click time, which is always the real service / article title. */
export function waMessageFor(pathname: string, lang: Lang, topic?: string | null): string {
  const base = stripLangPrefix(pathname.replace(/^\/us(?=\/|$)/, "") || "/");
  const t = topic ? clip(topic.replace(/\s+/g, " ").trim()) : "";
  if (t && base.startsWith("/servicios/")) {
    return lang === "es"
      ? `Hola Dizayn, me interesa "${t}". ¿Me pueden cotizar?`
      : `Hi Dizayn, I'm interested in "${t}". Could you quote me?`;
  }
  if (t && base.startsWith("/blog/")) {
    return lang === "es"
      ? `Hola Dizayn, leí "${t}" y quiero platicar de mi proyecto.`
      : `Hi Dizayn, I read "${t}" and I'd like to talk about my project.`;
  }
  if (base === "/portafolio") {
    return lang === "es"
      ? "Hola Dizayn, vi su portafolio y quiero cotizar un proyecto."
      : "Hi Dizayn, I saw your portfolio and I'd like to quote a project.";
  }
  if (base === "/precios") {
    return lang === "es"
      ? "Hola Dizayn, vi sus precios en USD y quiero una cotización."
      : "Hi Dizayn, I saw your USD pricing and I'd like a quote.";
  }
  return getDict(lang).waMessage;
}

export const waHrefFor = (pathname: string, lang: Lang, topic?: string | null) =>
  waLink(waMessageFor(pathname, lang, topic));

/** Microsoft Clarity custom event (Clarity is already loaded lazily in the root shell). No-op until it loads. */
export function track(event: string) {
  try {
    (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("event", event);
  } catch {
    /* analytics must never break a click */
  }
}

/** Click handler shared by every WhatsApp anchor: rebuilds the href from the page H1 right before the
 * browser follows it, then fires the Clarity event. */
export function onWaClick(pathname: string, lang: Lang, place: string) {
  return (e: { currentTarget: HTMLAnchorElement }) => {
    e.currentTarget.href = waHrefFor(pathname, lang, document.querySelector("h1")?.textContent);
    track(`wa_click_${place}`);
  };
}
