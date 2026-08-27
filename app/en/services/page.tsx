import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/services-content";

const title = "Digital marketing services in Guadalajara";
const ogTitle = "Digital marketing services | Dizayn Guadalajara";
const description =
  "Websites, SEO, AI visibility, social media, sales funnels, photography and video. All of Dizayn's services in Guadalajara and Mexico.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/en/services", images: ["/og-image.jpg"] },
  alternates: { canonical: "/en/services", languages: { es: "/servicios", en: "/en/services" } },
};

export default function ServicesPageEn() {
  return <ServicesContent lang="en" />;
}
