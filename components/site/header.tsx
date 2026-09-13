"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { altPath, langFromPath, langPath, marketFromPath, marketHomePath, usPath } from "@/lib/routes";
import { ThemeToggle } from "./theme-toggle";

const linkClass = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";
const activeLinkClass = "text-sm font-semibold text-primary";

export function Header() {
  const { setLang } = useI18n();
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Derived from the URL, not the ambient i18n context: this is a client component but its
  // first render must match the server-rendered HTML (no post-hydration flash) so crawlers
  // that don't execute JS still see the correct per-language nav links.
  const lang: Lang = langFromPath(pathname);
  const market = marketFromPath(pathname);
  const isUs = market === "us";
  const t = getDict(lang);
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));

  const handleLang = (l: Lang) => {
    const alt = altPath(pathname, l);
    setLang(l);
    if (alt !== pathname) router.push(alt);
  };

  // Market switcher always jumps to that market's home — not every MX page has a US
  // sibling yet (portfolio, blog, legal pages), so it can't preserve the current page.
  const otherMarketHref = marketHomePath(isUs ? "mx" : "us", lang);

  const items = isUs
    ? [
        { href: path("/servicios"), label: t.nav.services },
        { href: path("/precios"), label: t.usPricing.title },
        { href: path("/blog"), label: t.nav.blog },
        { href: path("/nosotros"), label: t.nav.about },
        { href: path("/contacto"), label: t.nav.contact },
      ]
    : [
        { href: path("/servicios"), label: t.nav.services },
        { href: path("/portafolio"), label: t.nav.portfolio },
        { href: path("/blog"), label: t.nav.blog },
        { href: path("/nosotros"), label: t.nav.about },
        { href: path("/contacto"), label: t.nav.contact },
      ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href={path("/")} className="font-display text-2xl font-bold tracking-[-0.06em]">
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
            <button
              type="button"
              onClick={() => handleLang("es")}
              className={`flex min-h-11 items-center px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === "es" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Español"
            >
              ES
            </button>
            <span className="text-border">/</span>
            <button
              type="button"
              onClick={() => handleLang("en")}
              className={`flex min-h-11 items-center px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === "en" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <ThemeToggle />

          <span className="hidden sm:block">
            <Link href={path("/contacto")} className="btn-primary !px-5 !py-2.5 text-[0.8rem]">
              {t.nav.cta}
            </Link>
          </span>

          <button
            type="button"
            className="flex size-11 flex-col items-center justify-center md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block h-px w-6 bg-foreground" />
            <span className="mt-1.5 block h-px w-6 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border md:hidden">
          <div className="container-x flex flex-col py-4">
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-muted-foreground"
              >
                {i.label}
              </Link>
            ))}
            <Link
              href={otherMarketHref}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-muted-foreground"
            >
              {isUs ? "Dizayn México" : "Dizayn for the US"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
