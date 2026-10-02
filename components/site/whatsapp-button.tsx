"use client";

import { usePathname } from "next/navigation";
import { CONTACT } from "@/content/contact";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { langFromPath } from "@/lib/routes";
import { onWaClick, waHrefFor } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);

  return (
    <a
      href={waHrefFor(pathname, lang)}
      onClick={onWaClick(pathname, lang, "float")}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp ${CONTACT.whatsappDisplay}`}
      className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lg transition-transform hover:scale-105 md:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
