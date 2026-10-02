"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { langFromPath } from "@/lib/routes";
import { onWaClick, waHrefFor } from "@/lib/whatsapp";

type Variant = "pill" | "ghost" | "inline";

const CLASS: Record<Variant, string> = {
  pill: "btn-wa",
  ghost: "btn-wa-ghost",
  inline: "inline-flex min-h-11 items-center gap-2 font-semibold text-wa-fg underline-offset-4 hover:underline",
};

/** The one WhatsApp call to action. Server HTML carries a generic (but valid) link; at click time
 * the message is rebuilt from the page's H1, so a service page opens a chat that names the service.
 * `place` is the Clarity event suffix (wa_click_<place>) so the funnel shows which CTA converted. */
export function WhatsAppCTA({
  label,
  place,
  variant = "pill",
  className = "",
  children,
}: {
  label: string;
  place: string;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const lang = langFromPath(pathname);

  return (
    <a
      href={waHrefFor(pathname, lang)}
      target="_blank"
      rel="noreferrer"
      onClick={onWaClick(pathname, lang, place)}
      className={`${CLASS[variant]} ${className}`.trim()}
    >
      <WhatsAppIcon />
      {label}
      {children}
    </a>
  );
}
