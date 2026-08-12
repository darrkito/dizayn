"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { portfolioItems } from "@/content/portfolio";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { useI18n } from "@/lib/i18n";

const teaserImages = portfolioItems.filter((i) => i.kind === "image").slice(0, 3);

export function HomeContent() {
  const { t, lang } = useI18n();

  return (
    <div>
      <section className="relative overflow-hidden sky-panel">
        <div className="container-x relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {t.home.eyebrow}
            </p>
            <h1 className="mt-7 text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02]">
              {t.home.h1a} <em className="not-italic text-primary">{t.home.h1b}</em>
              <br />
              {t.home.h1c}
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground">{t.home.lead}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contacto" className="btn-primary">
                {t.home.ctaPrimary}
              </Link>
              <Link href="/portafolio" className="btn-ghost">
                {t.home.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-2xl" aria-hidden />
            <Image
              src="/images/hero.jpg"
              alt="Producción creativa de Dizayn en Guadalajara"
              width={960}
              height={1200}
              priority
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_70px_-40px_oklch(0.58_0.19_256/0.7)]"
            />
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-10 py-16 md:grid-cols-3">
          {t.home.stats.map((s) => (
            <div key={s.k}>
              <h2 className="font-display text-xl">{s.k}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none">{t.home.servicesTitle}</h2>
            <p className="mt-4 max-w-md text-muted-foreground">{t.home.servicesLead}</p>
          </div>
          <Link href="/servicios" className="text-xs uppercase tracking-[0.18em] text-primary hover:underline">
            {t.home.servicesAll} →
          </Link>
        </div>

        <ul className="mt-14 border-t border-border">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border-b border-border px-3 py-7 transition-colors hover:bg-muted md:flex-row md:items-baseline md:gap-10 md:px-2"
              >
                <span className="text-xs tracking-[0.2em] text-primary">{s.number}</span>
                <span className="font-display text-2xl md:w-96 md:text-3xl">{s[lang].name}</span>
                <span className="text-sm text-muted-foreground md:flex-1">{s[lang].tagline}</span>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rule">
        <div className="container-x grid gap-10 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none">{t.home.portfolioTitle}</h2>
            <p className="mt-5 max-w-md text-muted-foreground">{t.home.portfolioLead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/portafolio" className="btn-primary">
                {t.home.portfolioCta}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {teaserImages.map((item) => (
              <Link
                key={item.id}
                href="/portafolio"
                className="relative flex aspect-[3/4] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={cloudinaryUrl(item.cloudinaryPublicId!, 400)}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-28 text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(2rem,6vw,4.5rem)] leading-[0.95]">{t.home.ctaTitle}</h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{t.home.ctaLead}</p>
        <Link href="/contacto" className="mt-10 btn-primary">
          {t.nav.cta}
        </Link>
      </section>
    </div>
  );
}
