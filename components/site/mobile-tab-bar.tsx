"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { Home, Layers, Image as ImageIcon, BookOpen, Tag, Menu } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getDict } from "@/lib/i18n";
import { langFromPath, langPath, marketFromPath, marketHomePath, usPath } from "@/lib/routes";
import { onWaClick, track, waHrefFor } from "@/lib/whatsapp";

const tabClass =
  "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[0.68rem] font-medium transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary";

/** Phones only. Five slots, the middle one is the raised WhatsApp action (the site's primary
 * mobile action). Replaces the old hamburger and the floating bubble below `md`. */
export function MobileTabBar() {
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);
  const market = marketFromPath(pathname);
  const isUs = market === "us";
  const t = getDict(lang);
  const sheet = useRef<HTMLDialogElement>(null);
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));

  const slots: { href: string; label: string; icon: ReactNode }[] = isUs
    ? [
        { href: marketHomePath("us", lang), label: t.nav.home, icon: <Home size={20} /> },
        { href: path("/precios"), label: t.usPricing.title, icon: <Tag size={20} /> },
      ]
    : [
        { href: marketHomePath("mx", lang), label: t.nav.home, icon: <Home size={20} /> },
        { href: path("/servicios"), label: t.nav.services, icon: <Layers size={20} /> },
      ];
  const slotsRight: { href: string; label: string; icon: ReactNode }[] = isUs
    ? [{ href: path("/blog"), label: t.nav.blog, icon: <BookOpen size={20} /> }]
    : [{ href: path("/portafolio"), label: t.nav.portfolio, icon: <ImageIcon size={20} /> }];

  const isActive = (href: string) =>
    href === marketHomePath(market, lang) ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const renderTab = (s: { href: string; label: string; icon: ReactNode }) => (
    <Link
      key={s.href}
      href={s.href}
      aria-current={isActive(s.href) ? "page" : undefined}
      onClick={() => track(`tab_${s.href}`)}
      className={`${tabClass} ${isActive(s.href) ? "text-primary" : "text-muted-foreground"}`}
    >
      {s.icon}
      {s.label}
    </Link>
  );

  const close = () => sheet.current?.close();
  const moreLinks = [
    ...(isUs ? [] : [{ href: path("/blog"), label: t.nav.blog }]),
    { href: path("/nosotros"), label: t.nav.about },
    { href: path("/contacto"), label: t.nav.contact },
    { href: marketHomePath(isUs ? "mx" : "us", lang), label: isUs ? "Dizayn México" : "Dizayn for the US" },
  ];

  return (
    <>
      <nav
        aria-label={t.nav.menu}
        className="tabbar fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <div className="relative mx-auto flex max-w-md items-stretch">
          {slots.map(renderTab)}
          <a
            href={waHrefFor(pathname, lang)}
            target="_blank"
            rel="noreferrer"
            onClick={onWaClick(pathname, lang, "tab")}
            aria-label={`${t.nav.wa}: ${t.nav.waCta}`}
            className="relative -mt-5 flex flex-1 flex-col items-center justify-start text-[0.68rem] font-semibold text-wa-fg"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_8px_20px_-6px_oklch(0.4_0.1_165/0.7)] ring-4 ring-background transition-transform active:scale-90">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
            <span className="mt-0.5">{t.nav.wa}</span>
          </a>
          {slotsRight.map(renderTab)}
          <button
            type="button"
            onClick={() => {
              track("tab_more");
              sheet.current?.showModal();
            }}
            className={`${tabClass} text-muted-foreground`}
          >
            <Menu size={20} />
            {t.nav.more}
          </button>
        </div>
      </nav>

      <dialog
        ref={sheet}
        aria-label={t.nav.moreTitle}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="sheet md:hidden"
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="font-display text-lg">{t.nav.moreTitle}</h2>
          <button
            type="button"
            onClick={close}
            aria-label={t.nav.close}
            className="flex size-11 items-center justify-center rounded-full border border-border text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <WhatsAppCTA label={t.nav.waSheet} place="sheet" className="w-full" />
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {moreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="flex min-h-12 items-center text-base font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <Link href={path("/contacto")} onClick={close} className="flex min-h-11 items-center underline underline-offset-4">
              {t.nav.formCta}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </dialog>
    </>
  );
}
