import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { BlogListContent } from "@/components/blog/blog-list-content";
import { buildUsOnlyAlternates } from "@/lib/routes";

// Same title.template caveat as app/us/page.tsx — do not hardcode the brand suffix here.
const title = "Guides for US Businesses";
const ogTitle = "Guides for US Businesses | Dizayn";
const description =
  "Real pricing, how to pay, and nearshore vs. offshore vs. a local agency — guides written for businesses in the United States.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: og({ title: ogTitle, description, type: "website", url: "/us/en/blog" }),
  alternates: buildUsOnlyAlternates("/blog", "en-US"),
};

export default function UsBlogPageEn() {
  return <BlogListContent lang="en" market="us" />;
}
