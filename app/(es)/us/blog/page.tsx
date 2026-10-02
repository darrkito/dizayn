import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "Guías para Negocios en EE.UU.";
const ogTitle = "Guías para Negocios en EE.UU. | Dizayn";
const description =
  "Precios reales, cómo pagar, y nearshore vs. offshore vs. agencia local — guías escritas para negocios en Estados Unidos.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/us/blog", images: ["/og-image.jpg"] },
  alternates: buildUsOnlyAlternates("/blog", "es-US"),
};

export default function UsBlogPage() {
  return <BlogListContent lang="es" market="us" />;
}
