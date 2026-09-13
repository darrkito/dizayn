import type { Metadata } from "next";
import { HomeContent } from "@/components/home/home-content";
import { buildAlternates } from "@/lib/routes";

const title = "Marketing agency in Guadalajara";
const ogTitle = "Dizayn | Marketing agency in Guadalajara";
const description =
  "Marketing agency in Guadalajara: websites, SEO, AI visibility, social media, sales funnels, photography and video. Serving Mexico and the world.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: ogTitle, description, type: "website", url: "/en", images: ["/og-image.jpg"] },
  alternates: buildAlternates("/", "en-MX"),
};

export default function HomePageEn() {
  return <HomeContent lang="en" />;
}
