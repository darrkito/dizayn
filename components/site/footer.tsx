"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/content/contact";
import { services } from "@/content/services";
import { getDict } from "@/lib/i18n";
import { langFromPath, langPath } from "@/lib/routes";

export function Footer() {
  // Derived from the URL (see header.tsx) so the initial render matches SSR — no hydration flash.
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);
  const t = getDict(lang);
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
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={langPath(`/servicios/${s.slug}`, lang)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s[lang].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary">{t.footer.company}</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href={langPath("/nosotros", lang)} className="text-sm text-muted-foreground hover:text-foreground">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href={langPath("/portafolio", lang)} className="text-sm text-muted-foreground hover:text-foreground">
                {t.nav.portfolio}
              </Link>
            </li>
            <li>
              <Link href={langPath("/blog", lang)} className="text-sm text-muted-foreground hover:text-foreground">
                {t.nav.blog}
              </Link>
            </li>
            <li>
              <Link href={langPath("/contacto", lang)} className="text-sm text-muted-foreground hover:text-foreground">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground">
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
            <Link href={langPath("/privacidad", lang)} className="hover:text-foreground">
              {t.footer.privacy}
            </Link>
            <Link href={langPath("/terminos", lang)} className="hover:text-foreground">
              {t.footer.terms}
            </Link>
          </span>
          <span>Guadalajara · {lang === "en" ? "Mexico" : "México"} · Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
