import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { hubPageSchema } from "@/lib/schema-pages";
import { og } from "@/lib/seo";
import { AboutContent } from "@/components/about/about-content";
import { buildAlternates } from "@/lib/routes";

const title = "About Dizayn, a nearshore agency for US businesses";
const description =
  "Dizayn is a creative team based in Guadalajara serving US businesses, in English and Spanish, for years.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title, description, type: "website", url: "/us/en/about" }),
  alternates: buildAlternates("/nosotros", "en-US"),
};

export default function UsAboutPageEn() {
  return (
    <>
      <JsonLd data={hubPageSchema("about", { path: "/us/en/about", name: title, description, lang: "en", market: "us" })} />
      <AboutContent lang="en" market="us" />
    </>
  );
}
