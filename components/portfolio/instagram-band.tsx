"use client";

import { CONTACT } from "@/content/contact";
import { useI18n } from "@/lib/i18n";

export function InstagramBand() {
  const { t } = useI18n();

  return (
    <div className="mt-20 border border-border p-10 text-center">
      <h2 className="font-display text-3xl">{t.portfolio.igTitle}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">{t.portfolio.igLead}</p>
      <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="mt-8 inline-block btn-primary">
        {t.portfolio.igCta}
      </a>
    </div>
  );
}
