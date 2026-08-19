"use client";

import { usePathname } from "next/navigation";
import { CONTACT, waLink } from "@/content/contact";
import { getDict } from "@/lib/i18n";
import { langFromPath } from "@/lib/routes";

export function WhatsAppButton() {
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);
  const t = getDict(lang);

  return (
    <a
      href={waLink(t.waMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp ${CONTACT.whatsappDisplay}`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.86 9.86 0 0 0 4.69 1.2h.01c5.44 0 9.87-4.43 9.87-9.87S17.48 2 12.04 2zm0 17.98a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.17.83.85-3.09-.2-.32a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.21-8.2 8.21z" />
      </svg>
    </a>
  );
}
