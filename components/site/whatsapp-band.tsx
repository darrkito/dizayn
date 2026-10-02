import { WhatsAppCTA } from "@/components/site/whatsapp-cta";
import { getDict, type Lang } from "@/lib/i18n";

/** Full-width "not sure where to start?" strip with the WhatsApp action. One component so the
 * wording, spacing and tracking id stay identical on every page that uses it. */
export function WhatsAppBand({ lang, place }: { lang: Lang; place: string }) {
  const t = getDict(lang);
  return (
    <section className="rule bg-card">
      <div className="container-x flex flex-col items-start gap-5 py-10 md:flex-row md:items-center md:justify-between md:py-14">
        <div>
          <h2 className="font-display text-2xl">{t.home.waBandTitle}</h2>
          <p className="mt-2 max-w-md text-muted-foreground">{t.home.waBandLead}</p>
        </div>
        <WhatsAppCTA label={t.nav.waCta} place={place} className="w-full md:w-auto" />
      </div>
    </section>
  );
}
