@AGENTS.md

# Dizayn — agency marketing site

Next.js 16 (App Router, TS) rebuild of the Dizayn marketing agency site (Guadalajara, Jalisco). Bilingual ES/EN, dark+light theme.

## History — read before touching git remotes

This project replaced an earlier build at `dizayn-spark-studio` (TanStack Start + Lovable + Supabase). That repo is **Lovable-connected**: its build agent (`gpt-engineer-app[bot]`) auto-reinjects Vite-era scaffolding (`bun.lock`, `supabase/config.toml`, `src/integrations/supabase/*` with `import.meta.env` typing) whenever it doesn't recognize the project structure — it did this once already and broke the build. **This repo (`github.com/darrkito/dizayn`) is a separate, clean repo with no Lovable connection and no shared git history with `dizayn-spark-studio`.** Do not push this codebase back into `dizayn-spark-studio`.

## Commands

```bash
npm run dev            # localhost:3000
npm run build
npx tsc --noEmit        # type-check only
```

## Env vars (`.env.local`, gitignored)

- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` — same Supabase project as the old site (table: `contact_submissions`)
- `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — hosts the portfolio gallery images
- `NEXT_PUBLIC_SITE_URL` — `https://dizayn.com.mx`, used in `metadataBase`, `sitemap.ts`, `robots.ts`

## Architecture

- Bilingual copy lives in `lib/i18n.tsx` (dict-based context, `es`/`en`, no external i18n lib) + `content/services.ts` (7 services, bilingual, includes/process/FAQ/meta per service)
- Every route is a thin server component (`app/**/page.tsx`, exports `metadata`/`generateMetadata`) wrapping a `"use client"` content component (`components/**/*-content.tsx`) — required because client components can't export Next.js metadata
- Contact form: `components/contact/contact-form.tsx` (client) → `app/contacto/actions.ts` Server Action → Supabase insert (`lib/supabase/server.ts`)
- Portfolio gallery: `content/portfolio.ts` is a **generated file** (219 items — 134 photo / 75 design / 10 video), produced by `scripts/scrape-portfolio.ts`. Re-run with `node --env-file=.env.local ./node_modules/.bin/tsx scripts/scrape-portfolio.ts --upload` if the source portfolio (`dizaynpro.myportfolio.com`) gets new work — it scrapes real 1920px images off `cdn.myportfolio.com` and Adobe CCV video embeds, uploads images to Cloudinary
- `lib/cloudinary.ts` builds delivery URLs (`f_auto,q_auto,c_limit,w_{n}`) from `cloudinaryPublicId`

## SEO

- Google Search Console + Bing Webmaster both connected — see memory for credential locations
- `app/sitemap.ts` / `app/robots.ts` — Next.js MetadataRoute conventions, not static files
- **Keyword cannibalization audit (2026-08-27)**: full title/H1 dedup check across all static pages, 7 services (`content/services.ts`), and all blog posts (`content/blog.ts`, ES+EN) — zero exact-duplicate titles found. Blog posts and service pages are cleanly split by intent (informational/long-tail in blog, commercial head-term in services), which is the correct pattern, not a coincidence to re-verify each time. See `~/seo-ai-search-playbook.md` §5 for the audit method and what a real collision looks like (found and fixed on Luvory the same session).

