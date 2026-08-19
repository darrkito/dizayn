"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getService, services } from "@/content/services";
import { getDict, useI18n, type Lang } from "@/lib/i18n";

export function ServiceDetailContent({ slug, lang }: { slug: string; lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);
  const prefix = lang === "en" ? "/en" : "";
  const service = getService(slug)!;
  const copy = service[lang];
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <section className="container-x py-20">
        <Link href={`${prefix}/servicios`} className="text-xs uppercase tracking-[0.18em] text-primary hover:underline">
          ← {t.services.back}
        </Link>
        <p className="mt-10 text-xs tracking-[0.2em] text-primary">{service.number}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,7vw,5rem)] leading-[0.95]">{copy.name}</h1>
        <p className="mt-6 max-w-2xl font-display text-xl text-primary">{copy.tagline}</p>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{copy.intro}</p>
        <Link href={`${prefix}/contacto`} className="mt-10 btn-primary">
          {t.services.cta}
        </Link>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.includes}</h2>
          <ul className="grid gap-px bg-border sm:grid-cols-2">
            {copy.includes.map((i) => (
              <li key={i} className="bg-background p-5 text-sm text-muted-foreground">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.process}</h2>
          <ol className="space-y-8">
            {copy.process.map((p, idx) => (
              <li key={p.title} className="flex gap-6">
                <span className="text-xs tracking-[0.2em] text-primary">{String(idx + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.forWho}</h2>
          <ul className="space-y-4">
            {copy.forWho.map((f) => (
              <li key={f} className="border-l-2 border-primary pl-5 text-lg">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-2xl">{t.services.faq}</h2>
          <dl className="space-y-8">
            {copy.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-lg">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rule">
        <div className="container-x py-16">
          <h2 className="font-display text-2xl">{t.services.other}</h2>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`${prefix}/servicios/${o.slug}`}
                className="bg-background p-6 transition-colors hover:bg-card"
              >
                <h3 className="font-display text-xl">{o[lang].name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o[lang].tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
