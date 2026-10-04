"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { altPath, langFromPath, langPath, marketFromPath, marketHomePath, usPath } from "@/lib/routes";
import { ThemeToggle } from "./theme-toggle";

const linkClass = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";
const activeLinkClass = "text-sm font-semibold text-primary";

const hrefLangFor = (l: Lang, market: "mx" | "us") => `${l}-${market === "us" ? "US" : "MX"}`;

export function Header() {
  const { setLang } = useI18n();
  const pathname = usePathname() ?? "/";
  const [hidden, setHidden] = useState(false);

  // Phones: hide on scroll down, show on scroll up. Transform only, so no layout shift.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > 80 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Derived from the URL, not the ambient i18n context: this is a client component but its
  // first render must match the server-rendered HTML (no post-hydration flash) so crawlers
  // that don't execute JS still see the correct per-language nav links.
  const lang: Lang = langFromPath(pathname);
  const market = marketFromPath(pathname);
  const isUs = market === "us";
  const t = getDict(lang);
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));

  // Market switcher always jumps to that market's home — not every MX page has a US
  // sibling yet (portfolio, blog, legal pages), so it can't preserve the current page.
  const otherMarketHref = marketHomePath(isUs ? "mx" : "us", lang);

  const items = isUs
    ? [
        { href: path("/servicios"), label: t.nav.services },
        { href: path("/precios"), label: t.nav.pricing },
        { href: path("/blog"), label: t.nav.blog },
        { href: path("/nosotros"), label: t.nav.about },
        { href: path("/contacto"), label: t.nav.contact },
      ]
    : [
        { href: path("/servicios"), label: t.nav.services },
        { href: path("/portafolio"), label: t.nav.portfolio },
        { href: path("/precios"), label: t.nav.pricing },
        { href: path("/blog"), label: t.nav.blog },
        { href: path("/nosotros"), label: t.nav.about },
        { href: path("/contacto"), label: t.nav.contact },
      ];

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/70 bg-background transition-transform duration-200 md:z-50 md:bg-background/80 md:backdrop-blur-xl ${hidden ? "max-md:-translate-y-full" : ""}`}
    >
      <div className="container-x flex h-14 items-center justify-between gap-6 md:h-20">
        <Link href={path("/")} className="inline-flex min-h-11 items-center font-display text-2xl font-bold tracking-[-0.06em]">
          DIZAYN<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={pathname?.startsWith(i.href) ? activeLinkClass : linkClass}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={otherMarketHref}
            className="hidden min-h-11 items-center px-1 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
            title={isUs ? "Dizayn México" : "Dizayn para EE.UU. / for the US"}
          >
            {isUs ? "MX" : "US"}
          </Link>

          <div className="flex items-center gap-1 text-xs uppercase tracking-[0.18em]">
            {(["es", "en"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-border">/</span>}
                {/* Real links (not buttons + router.push) so crawlers can follow the language
                    sibling; setLang still records the visitor's preference. */}
                <Link
                  href={altPath(pathname, l)}
                  hrefLang={hrefLangFor(l, market)}
                  onClick={() => setLang(l)}
                  aria-current={lang === l ? "true" : undefined}
                  className={`flex min-h-11 items-center px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === l ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label={l === "es" ? "Español" : "English"}
                >
                  {l.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>

          <ThemeToggle />

          <span className="hidden sm:block">
            <Link href={path("/contacto")} className="btn-primary !px-5 !py-2.5 text-[0.8rem]">
              {t.nav.cta}
            </Link>
          </span>

        </div>
      </div>

    </header>
  );
}
