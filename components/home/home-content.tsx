"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { portfolioItems } from "@/content/portfolio";
import { blogPosts } from "@/content/blog";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { langPath, usPath, type Market } from "@/lib/routes";
import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { WhatsAppBand } from "@/components/site/whatsapp-band";

const teaserImages = portfolioItems.filter((i) => i.kind === "image").slice(0, 3);

// Real, documented client work — not written testimonials, since we don't have
// any client-quote testimonials to show yet (see eeat_multisite_fixes memory).
const CASE_STUDY_SLUGS = ["caso-luvory-sitio-web", "caso-luvory-seo", "caso-luvory-geo-posicionamiento-ia"];
const caseStudies = CASE_STUDY_SLUGS.map((slug) => blogPosts.find((p) => p.slug === slug)!).filter(Boolean);

// Only the 5 services exportable to a remote US client (excludes photography/video).
const usServices = services.filter((s) => s.us);

export function HomeContent({ lang, market = "mx" }: { lang: Lang; market?: Market }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const isUs = market === "us";
  const home = isUs ? t.usHome : t.home;
  const path = (esPath: string) => (isUs ? usPath(esPath, lang) : langPath(esPath, lang));
  const shownServices = isUs ? usServices : services;

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <section className="relative overflow-hidden sky-panel">
        <div className="container-x relative grid items-center gap-8 py-8 md:gap-14 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {home.eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] md:mt-7">
              {home.h1a} <em className="not-italic text-primary">{home.h1b}</em>
              <br />
              {home.h1c}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:mt-7 md:text-lg">{home.lead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-9">
              <WhatsAppCTA label={t.nav.waCta} place="hero" />
              <Link href={isUs ? path("/precios") : langPath("/portafolio", lang)} className="btn-ghost">
                {home.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-2xl" aria-hidden />
            <Image
              src="/images/hero.jpg"
              alt={home.heroAlt}
              width={960}
              height={1200}
              priority
              className="relative aspect-[16/11] w-full rounded-[2rem] md:aspect-[4/5] object-cover shadow-[0_30px_70px_-40px_oklch(0.58_0.19_256/0.7)]"
            />
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="container-x rail py-10 md:grid md:grid-cols-3 md:gap-10 md:py-16">
          {home.stats.map((s) => (
            <div key={s.k} className="rail-item rounded-2xl border border-border p-5 md:rounded-none md:border-0 md:p-0">
              <h2 className="font-display text-xl">{s.k}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {!isUs && (
        <section className="rule">
          <div className="container-x py-10 md:py-16">
            <h2 className="font-display text-2xl">{t.home.whatTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">{t.home.whatAnswer}</p>
          </div>
        </section>
      )}

      <section className="container-x py-14 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none">{home.servicesTitle}</h2>
            <p className="mt-4 max-w-md text-muted-foreground">{home.servicesLead}</p>
          </div>
          <Link
            href={path("/servicios")}
            className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.18em] text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {home.servicesAll} →
          </Link>
        </div>

        <ul className="rail mt-8 md:mt-14 md:block md:border-t md:border-border">
          {shownServices.map((s) => {
            const copy = isUs ? s.us![lang] : s[lang];
            return (
              <li key={s.slug} className="rail-item">
                <Link
                  href={path(`/servicios/${s.slug}`)}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border p-5 transition-colors active:bg-muted hover:bg-muted md:flex-row md:items-start md:gap-10 md:border-0 md:border-b md:px-2 md:py-7"
                >
                  <span className="text-xs tracking-[0.2em] text-primary md:pt-2">{s.number}</span>
                  <span className="font-display text-xl leading-snug md:w-96 md:text-3xl">{copy.metaTitle}</span>
                  <span className="text-sm text-muted-foreground md:flex-1 md:pt-2">{copy.tagline}</span>
                  <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rule">
        <div className="container-x grid gap-10 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none">{home.portfolioTitle}</h2>
            <p className="mt-5 max-w-md text-muted-foreground">{home.portfolioLead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={langPath("/portafolio", lang)} className="btn-primary">
                {home.portfolioCta}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {teaserImages.map((item) => (
              <Link
                key={item.id}
                href={langPath("/portafolio", lang)}
                className="relative flex aspect-[3/4] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={cloudinaryUrl(item.cloudinaryPublicId!, 400)}
                  alt={`${t.portfolio.photo} ${item.id.split("-").pop()}`}
                  fill
                  // 3-up thumbnail grid: without `sizes`, fill images default to 100vw and
                  // download a far larger variant than the ~1/3-width slot needs.
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="container-x py-14 md:py-24">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none">{home.casesTitle}</h2>
          <p className="mt-5 max-w-md text-muted-foreground">{home.casesLead}</p>
          <div className="rail mt-8 md:mt-10 md:grid md:grid-cols-3 md:gap-6">
            {caseStudies.map((post) => {
              const copy = post[lang];
              return (
                <Link
                  key={post.slug}
                  href={langPath(`/blog/${post.slug}`, lang)}
                  className="rail-item flex flex-col rounded-2xl border border-border p-6 transition-colors hover:border-primary active:bg-muted"
                >
                  <span className="text-xs uppercase tracking-[0.18em] text-primary">{copy.category}</span>
                  <h3 className="mt-3 font-display text-lg leading-snug">{copy.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{copy.excerpt}</p>
                  <span className="mt-4 text-sm font-medium text-primary">{home.casesCta} →</span>
                </Link>
              );
            })}
          </div>
          <Link href={langPath("/blog", lang)} className="mt-6 inline-flex min-h-11 items-center text-sm text-primary hover:underline">
            {home.casesAll} →
          </Link>
        </div>
      </section>

      <WhatsAppBand lang={lang} place="band" />

      <section className="container-x py-16 text-center md:py-28">
        <h2 className="mx-auto max-w-3xl text-[clamp(2rem,6vw,4.5rem)] leading-[0.95]">{home.ctaTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:mt-6">{home.ctaLead}</p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:mt-10">
          <WhatsAppCTA label={t.nav.waCta} place="closing" />
          <Link href={path("/contacto")} className="btn-ghost">
            {t.nav.formCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
