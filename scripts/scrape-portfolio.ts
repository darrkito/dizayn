/**
 * One-off migration script: pulls the real photo/design work and video reels
 * off dizaynpro.myportfolio.com and (if Cloudinary env vars are set) uploads
 * the images to Cloudinary, writing content/portfolio.ts as the gallery's
 * data source. Video items are kept as Adobe's own embed players (CCV) —
 * they don't need re-hosting.
 *
 * Site structure (confirmed by inspection): /fotografia and /diseno are each
 * a single infinite-scroll grid of <img> tags served from cdn.myportfolio.com
 * (no per-project sub-pages). /video is a grid of <iframe> embeds pointing at
 * Adobe's CCV player. Each image's `src` is already a 1920px-wide asset; a
 * `srcset` on the element offers 600/1200/1920w variants.
 *
 * Usage:
 *   npx tsx scripts/scrape-portfolio.ts            # dry run (reports only)
 *   npx tsx scripts/scrape-portfolio.ts --upload    # requires Cloudinary env vars
 */
import { chromium, type Page } from "playwright";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://dizaynpro.myportfolio.com";
const CATEGORIES: { path: string; category: "photo" | "video" | "design" }[] = [
  { path: "/fotografia", category: "photo" },
  { path: "/video", category: "video" },
  { path: "/diseno", category: "design" },
];

const UPLOAD = process.argv.includes("--upload");

type ScrapedItem = {
  category: "photo" | "video" | "design";
  sourceUrl: string;
  kind: "image" | "video-embed";
};

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const step = 900;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight || total > 60000) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  await page.waitForTimeout(1200);
}

async function scrapeImageCategory(page: Page, categoryPath: string): Promise<string[]> {
  await page.goto(`${BASE}${categoryPath}`, { waitUntil: "networkidle" });
  await autoScroll(page);

  return page.evaluate(() => {
    const byUuid = new Map<string, string>();
    for (const img of Array.from(document.querySelectorAll("img"))) {
      const src = img.getAttribute("src") ?? "";
      const match = src.match(/cdn\.myportfolio\.com\/[^/]+\/([a-f0-9-]{36})_/);
      if (!match) continue;
      const uuid = match[1];
      if (uuid && !byUuid.has(uuid)) byUuid.set(uuid, src);
    }
    return Array.from(byUuid.values());
  });
}

async function scrapeVideoCategory(page: Page, categoryPath: string): Promise<string[]> {
  await page.goto(`${BASE}${categoryPath}`, { waitUntil: "networkidle" });
  await autoScroll(page);

  return page.evaluate(() => {
    const set = new Set<string>();
    for (const iframe of Array.from(document.querySelectorAll("iframe"))) {
      const src = iframe.getAttribute("src") ?? "";
      if (/adobe\.io|youtube|vimeo/.test(src)) set.add(src);
    }
    return Array.from(set);
  });
}

async function main() {
  let cloudinaryReady = false;
  if (UPLOAD) {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      console.error(
        "Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env.local — running dry-run instead.",
      );
    } else {
      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
      });
      cloudinaryReady = true;
    }
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } } as never);

  const items: ScrapedItem[] = [];
  const report: Record<string, number> = {};

  for (const cat of CATEGORIES) {
    console.log(`\n=== ${cat.category} (${cat.path}) ===`);
    try {
      if (cat.category === "video") {
        const embeds = await scrapeVideoCategory(page, cat.path);
        for (const src of embeds) items.push({ category: cat.category, sourceUrl: src, kind: "video-embed" });
        report[cat.category] = embeds.length;
        console.log(`→ ${embeds.length} video embed(s)`);
      } else {
        const images = await scrapeImageCategory(page, cat.path);
        for (const src of images) items.push({ category: cat.category, sourceUrl: src, kind: "image" });
        report[cat.category] = images.length;
        console.log(`→ ${images.length} image(s)`);
      }
    } catch (err) {
      console.error(`Failed on category ${cat.path}:`, err);
    }
  }

  await browser.close();

  console.log("\n=== Summary ===");
  console.table(report);

  if (!UPLOAD || !cloudinaryReady) {
    const outPath = path.join(process.cwd(), "scripts", "scrape-dry-run.json");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, JSON.stringify({ report, items }, null, 2));
    console.log(`\nDry run only — no uploads performed. Full item list written to ${outPath}`);
    console.log("Re-run with --upload once Cloudinary env vars are set in .env.local.");
    return;
  }

  console.log("\nUploading images to Cloudinary...");
  const manifest: {
    id: string;
    category: "photo" | "video" | "design";
    kind: "image" | "video-embed";
    cloudinaryPublicId?: string;
    embedUrl?: string;
    title: string;
    alt: string;
  }[] = [];

  const counters: Record<string, number> = { photo: 0, video: 0, design: 0 };
  const labels: Record<string, string> = { photo: "Fotografía", video: "Video", design: "Diseño" };

  for (const item of items) {
    counters[item.category] = (counters[item.category] ?? 0) + 1;
    const title = `${labels[item.category]} ${counters[item.category]}`;

    if (item.kind === "video-embed") {
      manifest.push({
        id: `${item.category}-${counters[item.category]}`,
        category: item.category,
        kind: "video-embed",
        embedUrl: item.sourceUrl,
        title,
        alt: title,
      });
      continue;
    }

    try {
      const uploaded = await cloudinary.uploader.upload(item.sourceUrl, {
        folder: `dizayn/${item.category}`,
      });
      manifest.push({
        id: `${item.category}-${counters[item.category]}`,
        category: item.category,
        kind: "image",
        cloudinaryPublicId: uploaded.public_id,
        title,
        alt: title,
      });
      console.log(`Uploaded (${item.category}): ${uploaded.public_id}`);
    } catch (err) {
      console.error(`Upload failed for ${item.sourceUrl}:`, err);
    }
  }

  const fileContents = `// Generated by scripts/scrape-portfolio.ts — edit titles/alt text as needed.
export type PortfolioItem = {
  id: string;
  category: "photo" | "video" | "design";
  kind: "image" | "video-embed";
  cloudinaryPublicId?: string;
  embedUrl?: string;
  title: string;
  alt: string;
};

export const portfolioItems: PortfolioItem[] = ${JSON.stringify(manifest, null, 2)};
`;

  const contentPath = path.join(process.cwd(), "content", "portfolio.ts");
  await writeFile(contentPath, fileContents);
  console.log(`\nWrote ${manifest.length} items to ${contentPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
