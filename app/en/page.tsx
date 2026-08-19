import type { Metadata } from "next";
import { HomeContent } from "@/components/home/home-content";

const title = "Dizayn | Marketing agency in Guadalajara";
const description =
  "Marketing agency in Guadalajara: websites, SEO, AI visibility, social media, sales funnels, photography and video. Serving Mexico and the world.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: "/en" },
  alternates: { canonical: "/en", languages: { es: "/", en: "/en" } },
};

export default function HomePageEn() {
  return <HomeContent lang="en" />;
}
