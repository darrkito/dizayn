"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { getDict, type Lang } from "@/lib/i18n";
import type { PortfolioItem } from "@/content/portfolio";

type Filter = "all" | PortfolioItem["category"];

export function PortfolioGallery({ items, lang }: { items: PortfolioItem[]; lang: Lang }) {
  const t = getDict(lang);
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  // Item titles/alt text are auto-generated generic labels ("Fotografía 12", "Diseño 3") from
  // the original scrape — ES-only by construction, not real per-item descriptions worth
  // translating individually. Rebuild the label from the item's category (dict key matches
  // PortfolioItem["category"] 1:1) + id-encoded index instead of rendering the stored title/alt.
  const localizedLabel = (item: PortfolioItem) => `${t.portfolio[item.category]} ${item.id.split("-").pop()}`;

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.portfolio.filterAll },
    { key: "photo", label: t.portfolio.photo },
    { key: "video", label: t.portfolio.video },
    { key: "design", label: t.portfolio.design },
  ];

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
              filter === f.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border text-left"
          >
            {item.kind === "image" && item.cloudinaryPublicId ? (
              <Image
                src={cloudinaryUrl(item.cloudinaryPublicId, 800)}
                alt={localizedLabel(item)}
                width={800}
                height={1000}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <iframe
                  src={item.embedUrl}
                  title={localizedLabel(item)}
                  className="pointer-events-none h-full w-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-10 w-10 text-white" fill="white" />
                </div>
              </div>
            )}
            <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {localizedLabel(item)}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl bg-background p-2 sm:p-2">
          <DialogTitle className="sr-only">{active ? localizedLabel(active) : ""}</DialogTitle>
          {active?.kind === "image" && active.cloudinaryPublicId && (
            <Image
              src={cloudinaryUrl(active.cloudinaryPublicId, 1600)}
              alt={localizedLabel(active)}
              width={1600}
              height={1200}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
          )}
          {active?.kind === "video-embed" && (
            <iframe
              src={active.embedUrl}
              title={localizedLabel(active)}
              allow="autoplay; fullscreen"
              className="aspect-video w-full rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
