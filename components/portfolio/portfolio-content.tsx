"use client";

import { useI18n } from "@/lib/i18n";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioGallery } from "./portfolio-gallery";
import { InstagramBand } from "./instagram-band";

export function PortfolioContent() {
  const { t } = useI18n();

  return (
    <div className="container-x py-24">
      <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{t.portfolio.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.portfolio.lead}</p>

      <div className="mt-16">
        <PortfolioGallery items={portfolioItems} />
      </div>

      <InstagramBand />
    </div>
  );
}
