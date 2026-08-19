import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/services-content";

const title = "Digital marketing services | Dizayn Guadalajara";
const description =
  "Websites, SEO, AI visibility, social media, sales funnels, photography and video. All of Dizayn's services in Guadalajara and Mexico.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en/servicios" },
  alternates: { canonical: "/en/servicios", languages: { es: "/servicios", en: "/en/servicios" } },
};

export default function ServiciosPageEn() {
  return <ServicesContent lang="en" />;
}
