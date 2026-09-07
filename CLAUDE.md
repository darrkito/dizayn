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

## Deploy pipeline — real gotcha (2026-09-07)

Vercel auto-deploys on push to `main` **only when the commit author email is verified on the `darrkito` GitHub account.** The local repo's `git config user.email` had been set to `darrkito@gmail.com` — not a verified email on that account — so every push silently created zero Vercel deployments (confirmed via GitHub's Deployments API: commits stacked up with no deployment record, no error visible anywhere in git or the push output). Fixed by setting this repo's local `user.email` to `darrkito@users.noreply.github.com` (GitHub's own noreply address for the account — same pattern already correctly used in `luvory-genius-generator` and `Yume`, only `dizayn-web` had drifted). **If a push ever seems to have zero effect on the live site again, check `https://api.github.com/repos/darrkito/dizayn/deployments` first** — a missing entry for the latest SHA means the git integration didn't fire, not a slow build.

**Manual deploy fallback**: a Vercel deploy hook exists for emergencies where the git integration is broken and dashboard/CLI access isn't available (this project's Vercel team isn't reachable from this machine's `vercel` CLI login — different account than `between_chain`). URL saved at `/home/darrkito/dizayn-505307-vercel-deploy-hook.txt` (not committed — treat like any other credential). `curl -X POST <url>` triggers a production build of whatever is on `main`.

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
- **Search visibility ceiling is domain authority, not on-page (2026-08-27)**: pulled GSC Rendimiento queries sorted by impressions — core commercial terms ("seo guadalajara" pos 89, "agencia seo guadalajara" pos 94, "diseño de páginas web guadalajara" pos 97-99, "manejo de redes sociales guadalajara" pos 78) rank page 6-10+ despite title/canonical/internal-linking (8-27 contextual blog links per service, verified) all already correct. This is a young-domain authority/backlink gap, not fixable from content edits alone — don't re-diagnose this as an on-page bug in a future session; the fix is backlinks/citations over time, external to this repo. Added exact-match FAQ entries for the 3 weakest services anyway (real, low-cost lever) but don't expect it to move position 90+ terms to page 1 by itself.

