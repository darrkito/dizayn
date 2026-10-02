"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/content/contact";
import { services } from "@/content/services";
import { getDict } from "@/lib/i18n";
import { langFromPath, langPath, marketFromPath, usPath } from "@/lib/routes";

export function Footer() {
  // Derived from the URL (see header.tsx) so the initial render matches SSR — no hydration flash.
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);
  const market = marketFromPath(pathname);
  const isUs = market === "us";
  const t = getDict(lang);
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));
  const footerServices = isUs ? services.filter((s) => s.us) : services;
  const year = new Date().getFullYear();

  return (
    <footer className="rule mt-32 bg-background">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl font-bold tracking-[-0.06em]">
            DIZAYN<span className="text-primary">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary">{t.footer.services}</h2>
          <ul className="mt-4 space-y-2">
            {footerServices.map((s) => {
              const copy = isUs ? s.us![lang] : s[lang];
              return (
                <li key={s.slug}>
                  <Link
                    href={path(`/servicios/${s.slug}`)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copy.metaTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary">{t.footer.company}</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href={path("/nosotros")} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {t.nav.about}
              </Link>
            </li>
            {isUs ? (
              <>
                <li>
                  <Link href={path("/precios")} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {t.usPricing.title}
                  </Link>
                </li>
                <li>
                  <Link href={path("/blog")} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {t.nav.blog}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={langPath("/portafolio", lang)} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {t.nav.portfolio}
                  </Link>
                </li>
                <li>
                  <Link href={langPath("/blog", lang)} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {t.nav.blog}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href={path("/contacto")} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:+${CONTACT.whatsapp}`} className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                @dizayn_mx
              </a>
            </li>
            <li>{CONTACT.city[lang]}</li>
          </ul>
        </div>
      </div>

      <div className="rule">
        <div className="container-x flex flex-col gap-2 py-6 text-xs uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:justify-between">
          <span>
            © {year} Dizayn. {t.footer.rights}
          </span>
          <span className="flex gap-4 normal-case tracking-normal">
            <Link href={langPath("/privacidad", lang)} className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {t.footer.privacy}
            </Link>
            <Link href={langPath("/terminos", lang)} className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {t.footer.terms}
            </Link>
          </span>
          <span>
            Guadalajara · {lang === "en" ? "Mexico" : "México"} · {isUs ? "USA" : "Worldwide"}
          </span>
        </div>
      </div>
    </footer>
  );
}
