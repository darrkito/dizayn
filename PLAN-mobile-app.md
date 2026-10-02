# PLAN: mobile app-feel + WhatsApp-first (dizayn.com.mx)

Based on `~/mobile-web-playbook.md` (Yume + Luvory). Primary mobile action: **WhatsApp quote**. Secondary: the contact form.

## Execution status

| Phase | Scope | Status |
|---|---|---|
| 0 | Baseline | done: home 390px = 7,498 px tall, first CTA at y=589 and it goes to the form, WhatsApp only as a floating bubble, 9 targets under 44 px, no horizontal overflow |
| 1 | Foundation: one WhatsApp URL builder with page-aware messages (`lib/whatsapp.ts`), `WhatsAppIcon`, `WhatsAppCTA`, Clarity `wa_click_*` events, touch CSS, 16 px inputs | done |
| 2 | App shell: bottom tab bar with raised WhatsApp center, "Más" sheet via `<dialog>`, header hides on scroll (transform only, no backdrop-filter on phones), floating bubble desktop-only, manifest + viewport-fit=cover | done |
| 3 | Pages: home (WhatsApp hero, swipe rails for stats/services/cases, WhatsApp band, WhatsApp closing), services list + detail, blog post, about, portfolio (paginated 24 at a time), contact, US pricing | done |
| 4 | Verify: 17 routes x 360/390/414 (ES, EN, US, 404): no horizontal overflow, tab bar visible, footer clears it, no tap target under 44 px outside prose, every WhatsApp anchor opens a page-specific message. Not done: PSI mobile and Clarity funnel comparison after deploy | partial |

## Decisions (made without the owner, all reversible)
- Tab bar: Inicio, Servicios, **WhatsApp (raised center)**, Portafolio, Más. US market swaps Servicios/Portafolio for Precios/Blog.
- WhatsApp green is used only on WhatsApp affordances; the brand blue stays for everything else.
- No response-time or "we reply in X minutes" claim anywhere (owner has not confirmed one).
- No new dependencies, no service worker, no scroll-reveal animations, no backdrop-filter on sticky chrome.
- Copy: no em dashes, sentence case on buttons, ES and EN in the same commit.

## Guardrails
Keep one H1, FAQ text, JSON-LD, alt text and internal links on every page. Markup mirrors visible content.

## Owner decisions still open
1. Real response-time claim for WhatsApp (left out until confirmed).
2. Real client photos / logos for social proof beyond the Luvory case studies.

## Measured (390 px)
| | Before | After |
|---|---|---|
| Home height | 7,498 px | 5,283 px |
| First WhatsApp CTA | none in page (floating bubble only) | y=420, inside the first screen |
| WhatsApp CTAs on home | 1 (bubble) | 4 (hero, band, closing, tab bar) |
| Portfolio height | 89,009 px | 13,821 px |
| Targets under 44 px | 9 on home | 0 outside prose |

## Left open
- PSI mobile and the Clarity `wa_click_*` funnel (dashboard step) after the deploy settles.
- Blog posts only get the WhatsApp card at the end (plus the tab bar); no mid-article card.
- Inline prose links stay under 44 px by design (WCAG inline exception).
