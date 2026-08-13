"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";

const linkClass = "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";
const activeLinkClass = "text-sm font-semibold text-primary";

/** /blog and /en/blog are the only routes with a real per-language URL pair so far —
 * everywhere else the toggle still just flips client state (see seo-ai-search-playbook.md §6). */
function blogSiblingPath(pathname: string, targetLang: Lang): string | null {
  if (pathname === "/en/blog" || pathname.startsWith("/en/blog/")) {
    const esPath = pathname.slice(3); // strip "/en" prefix
    return targetLang === "en" ? pathname : esPath;
  }
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return targetLang === "en" ? `/en${pathname}` : pathname;
  }
  return null;
}

export function Header() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLang = (l: Lang) => {
    const alt = blogSiblingPath(pathname ?? "", l);
    setLang(l);
    if (alt && alt !== pathname) router.push(alt);
  };

  const items = [
    { href: "/servicios", label: t.nav.services },
    { href: "/portafolio", label: t.nav.portfolio },
    { href: lang === "en" ? "/en/blog" : "/blog", label: t.nav.blog },
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl font-bold tracking-[-0.06em]">
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
          <div className="flex items-center gap-1 text-xs uppercase tracking-[0.18em]">
            <button
              type="button"
              onClick={() => handleLang("es")}
              className={lang === "es" ? "text-primary" : "text-muted-foreground hover:text-foreground"}
              aria-label="Español"
            >
              ES
            </button>
            <span className="text-border">/</span>
            <button
              type="button"
              onClick={() => handleLang("en")}
              className={lang === "en" ? "text-primary" : "text-muted-foreground hover:text-foreground"}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <ThemeToggle />

          <span className="hidden sm:block">
            <Link href="/contacto" className="btn-primary !px-5 !py-2.5 text-[0.8rem]">
              {t.nav.cta}
            </Link>
          </span>

          <button
            type="button"
            className="md:hidden"
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
          </div>
        </nav>
      )}
    </header>
  );
}
