import type { Metadata } from "next";

/** The root layout appends " | Dizayn" to every page title. When that pushes the title past ~60
 * characters (where SERPs truncate it), drop the brand suffix instead of the page's own words. */
export const fitTitle = (title: string): string | { absolute: string } =>
  `${title} | Dizayn`.length > 60 ? { absolute: title } : title;

type OgLocale = "es_MX" | "en_MX" | "es_US" | "en_US";
const OG_LOCALES: OgLocale[] = ["es_MX", "en_MX", "es_US", "en_US"];

/** og:locale from the page's own URL — the path prefix is the single source of truth for
 * market+language everywhere else in the app (see lib/routes.ts), so derive it the same way. */
export const ogLocaleFromPath = (path: string): OgLocale => {
  const us = path === "/us" || path.startsWith("/us/");
  const rest = us ? path.slice(3) || "/" : path;
  const en = rest === "/en" || rest.startsWith("/en/");
  return `${en ? "en" : "es"}_${us ? "US" : "MX"}` as OgLocale;
};

const defaultOgImage = (locale: OgLocale) => ({
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: locale.startsWith("en") ? "Dizayn, marketing agency in Guadalajara" : "Dizayn, agencia de marketing en Guadalajara",
});

type OgInput = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
};

/** Every page's openGraph block. A page-level `openGraph` REPLACES the root layout's (Next merges
 * metadata shallowly), so anything not repeated here — site name, locale, image dimensions — is
 * silently lost. Routes with a colocated opengraph-image.tsx still win over `images` here:
 * file-based metadata has priority over the metadata object. */
export function og({ title, description, url, type = "website", publishedTime, modifiedTime, section }: OgInput): NonNullable<Metadata["openGraph"]> {
  const locale = ogLocaleFromPath(url);
  const base = {
    title,
    description,
    url,
    siteName: "Dizayn",
    locale,
    alternateLocale: OG_LOCALES.filter((l) => l !== locale),
    images: [defaultOgImage(locale)],
  };
  return type === "article"
    ? { ...base, type: "article", publishedTime, modifiedTime, section, authors: ["Dizayn"] }
    : { ...base, type: "website" };
}
