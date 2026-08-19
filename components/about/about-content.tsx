"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getDict, useI18n, type Lang } from "@/lib/i18n";
import { langPath } from "@/lib/routes";

export function AboutContent({ lang }: { lang: Lang }) {
  const { setLang } = useI18n();
  const t = getDict(lang);

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <div>
      <section className="container-x py-24">
        <h1 className="max-w-4xl text-[clamp(2.5rem,8vw,6rem)] leading-[0.95]">{t.about.title}</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{t.about.lead}</p>
      </section>

      <section className="rule">
        <div className="container-x grid gap-12 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-primary">{t.about.p1title}</h2>
            <p className="mt-4 text-muted-foreground">{t.about.p1}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-primary">{t.about.p2title}</h2>
            <p className="mt-4 text-muted-foreground">{t.about.p2}</p>
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="container-x py-16">
          <h2 className="font-display text-2xl">{t.about.valuesTitle}</h2>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v) => (
              <div key={v.k} className="bg-background p-6">
                <h3 className="font-display text-xl">{v.k}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <Link href={langPath("/contacto", lang)} className="btn-primary">
          {t.about.cta}
        </Link>
      </section>
    </div>
  );
}
