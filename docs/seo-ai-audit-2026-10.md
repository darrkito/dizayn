# SEO + AI visibility audit, October 2026

Goal: rank #1 for Guadalajara commercial terms ("agencia de marketing en Guadalajara", "agencia SEO Guadalajara", "diseño de páginas web Guadalajara"...) and get Dizayn cited by Google AI Overviews / AI Mode, ChatGPT, Perplexity, Claude and Copilot.

Bottom line: the on-page and technical side is now in very good shape. The gap to #1 is off-site: Google Business Profile, reviews, mentions and links on other sites. Those are owner actions (section 4) and take months, not a deploy.

## 1. What changed in search (2025-2026)

| Change | Date | What it means for Dizayn |
|---|---|---|
| Google's [guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | 2026-05-15 | Wins: original, non-commodity, first-hand content; quality images and video; good page experience. Not needed: llms.txt, chunking, rewriting for AI, special schema. |
| FAQ rich results removed from Google ([changelog](https://developers.google.com/search/updates)) | 2026-05-07 | FAQPage markup is still valid but no longer gives a Google result feature. Keep FAQs for people and other engines, don't expect SERP lift. |
| Search Console AI performance data + opt-out toggle, all sites | 2026-08-31 | You can now see which pages appear in AI Overviews / AI Mode. Check it monthly. |
| Bing Webmaster Tools [AI Performance report](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) (Citation Share added June) | 2026-02-10 | Copilot citations are measurable. ChatGPT search also leans on Bing results, so Bing indexing matters. |
| March and May 2026 core updates | 2026-03-27, 2026-05-21 | Helpful-content signals are part of the core algorithm; thin commercial pages and "commodity" posts lose. |
| AI crawlers split into training / search / user-fetch bots | ongoing | Each needs its own robots.txt token; blocking one does not block the others. |
| Local search | ongoing | Google Business Profile is the largest local ranking factor and the main source AI Overviews cite for local queries. |

## 2. Audit findings and what was fixed (branch `claude/cool-gauss-uclrql`)

### Technical (fixed)
- **Sitemap hreflang pointed to 404s** (`/us/portafolio`, `/us/privacidad`, `/us/terminos`...), used `es`/`en` while pages used `es-MX`/`en-MX`, and had no `x-default`. The sitemap now reuses the exact alternates the pages emit; a full crawl of all 132 URLs finds zero mismatches and zero broken alternates.
- **robots.txt**: explicit groups for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot(-Extended), Bingbot, CCBot, Meta and others. AI training allowed (owner decision). `/api/` unblocked (llms.txt sends agents there) and kept out of the index with `X-Robots-Tag: noindex`. The non-standard `Content-Signal` line was removed (Lighthouse flagged it).
- **Open Graph**: every page now has `og:locale` + alternates, `og:site_name`, image size and alt; posts carry published/modified times. Every blog post and service has its own share image at `/og/...png`.
- Legal pages rendered "| Dizayn | Dizayn"; 3 titles over 60 chars and 4 descriptions over 160 trimmed.
- ES/EN switch is now real `<a hreflang>` links (were buttons). Half-translated duplicate URLs (`/en/services/sitios-web`) now 308 to the English slug.
- 404 pages no longer declare the homepage as their canonical.
- Lighthouse (local, mobile): SEO 100, accessibility 100, performance 92-96, CLS 0 on home, a service, a post and pricing.

### Structured data (fixed)
- One Organization entity (ProfessionalService + LocalBusiness) that everything references. Description now says "marketing agency" (it said "design and web development agency"); service area lists Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco, Jalisco, Mexico and the US; service-area business, so no street address.
- Service pages: Service with MXN (MX) or USD (US) price ranges, FAQPage, BreadcrumbList.
- Posts: BlogPosting with section, word count, image, `isPartOf`; the duplicate partial microdata entity was removed.
- Hubs: CollectionPage/ItemList, Blog, AboutPage, ContactPage, OfferCatalog on pricing.
- Visible breadcrumbs on every inner page.

### Content (fixed)
- **New MXN pricing page** (`/precios`, `/en/pricing`) with ranges from 2026 Guadalajara/Mexico market data. Every service page shows its range; the "¿Cuánto cuesta?" FAQs now state numbers.
- **Answer-first summary** under every service H1: who, where, what, price, timeline.
- **H1s now name what and where** (home: "Agencia de marketing en Guadalajara, Jalisco"; services, blog, portfolio, about, contact, pricing).
- **Two posts were factually out of date**: they said FAQPage schema is how you get cited in AI Overviews. Corrected against Google's May 2026 guide, with linked sources. Other SEO guides now link primary sources (Google, web.dev, Ahrefs, Clutch).
- Table of contents and heading anchors on long posts; related posts matched by topic.
- `llms.txt` lists MXN prices; new generated `/llms-full.txt`; the API, MCP server and A2A agent answer price questions with real MXN/USD ranges.

### Not fixed (needs the owner, see section 5)
- No named person anywhere (owner chose brand-only authorship).
- The 9 Luvory case studies have no numbers.
- Phone has a 462 (Irapuato) area code and the email is a Gmail address.
- 219 portfolio images have generic alt text ("Fotografía 12").
- Only one client in the case studies.

## 3. Before merging

1. **Confirm the MXN prices** in `content/mx-pricing.ts` (they feed `/precios`, the service pages, schema, llms.txt, API, MCP and A2A). Change any number there and everything updates.
2. **Add the Facebook and TikTok URLs** in `content/contact.ts` (`facebook`, `tiktok`; also `googleBusinessProfile` once it exists). Empty fields are skipped everywhere.
3. Merge to `main`, then confirm a deployment exists for the merge SHA at `https://api.github.com/repos/darrkito/dizayn/deployments` (see CLAUDE.md deploy gotcha).
4. Submit changed URLs: `scripts/indexnow.sh` (Bing, Yandex; feeds Copilot and ChatGPT search), and resubmit `sitemap.xml` in Search Console and Bing Webmaster Tools.

## 4. Owner checklist: off-site work that moves rankings

Ordered by impact for a Guadalajara agency.

### Google Business Profile (highest impact)
- [ ] Create/verify the profile as a **service-area business** (hide address) serving Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco.
- [ ] Primary category "Agencia de marketing"; secondary: "Diseñador de sitios web", "Consultor de marketing", "Servicio de fotografía", "Productora de video".
- [ ] Add all 7 services with the same MXN ranges as `/precios`.
- [ ] Upload real work photos (from the portfolio) and add new ones every month. No stock or AI-generated images.
- [ ] Post weekly (new case study, new blog post, a reel).
- [ ] Review routine: after every delivery, send the review link by WhatsApp. Aim for steady new reviews every month, and reply to all of them.
- [ ] Put the profile URL in `content/contact.ts` → `googleBusinessProfile`.

### Consistent listings (same name, phone, URL everywhere)
- [ ] Bing Places for Business (import from Google).
- [ ] Apple Business Connect.
- [ ] Facebook page and TikTok (add URLs to `content/contact.ts`). Consider a LinkedIn company page.
- [ ] Agency directories: Clutch, GoodFirms, Sortlist, DesignRush, agencias.marketing.
- [ ] Mexican directories: Sección Amarilla, Cylex México, Hotfrog México.

### Proof and mentions
- [ ] Ask Luvory for a written testimonial (name, role, one concrete result) and a "Sitio por Dizayn" credit link in their footer.
- [ ] Pull Luvory's Search Console and Bing numbers (clicks, impressions, positions, AI citations; before vs after, with dates) and add them to the case studies. The `results` field in `content/blog.ts` renders a results table automatically.
- [ ] Land a second and third client case study. One client is a thin base for "agency" proof.
- [ ] Local press and community: El Informador, Mural, Guadalajara business associations, talks at local events. Mentions on other sites correlate with AI visibility more strongly than backlinks do.
- [ ] Genuine answers in Reddit / Quora / Facebook groups about marketing in Guadalajara (no spam, disclose who you are).
- [ ] YouTube: short versions of the existing reels and video work, with Spanish titles that name the service and the city.

### Strongly recommended
- [ ] A Guadalajara (33) phone number for local trust signals.
- [ ] A domain email (e.g. hola@dizayn.com.mx) instead of Gmail.
- [ ] Reconsider a named founder/team profile: E-E-A-T is easier to show with a real person behind the work.

## 5. Measurement (monthly)

- **Search Console**: Performance (queries, positions for the head terms above) and the AI features report (which pages appear in AI Overviews / AI Mode).
- **Bing Webmaster Tools**: AI Performance (Copilot citations, Citation Share) and IndexNow submissions.
- **Clarity**: WhatsApp click events per page.
- **Fixed prompt set**, asked in ChatGPT, Perplexity, Gemini, Claude and Copilot on the same day each month. Record whether Dizayn is mentioned and which URL is cited:
  1. "¿Cuál es la mejor agencia de marketing en Guadalajara?"
  2. "Agencia SEO en Guadalajara recomendada"
  3. "¿Cuánto cuesta el SEO en Guadalajara?"
  4. "¿Cuánto cuesta un sitio web en Guadalajara?"
  5. "Agencia para aparecer en ChatGPT en México"
  6. "Nearshore marketing agency in Mexico for a US business"
