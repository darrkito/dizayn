import Link from "next/link";
import type { Lang } from "@/content/services";
import { langPath, usPath, type Market } from "@/lib/routes";

type Part = string | { href: string; label: string };

/** One sentence of body copy with real inline links. Pages whose only links live in the
 * nav/footer give crawlers (and readers) no contextual path onward — this adds one. */
function Sentence({ parts, className }: { parts: Part[]; className?: string }) {
  return (
    <p className={className ?? "mt-8 max-w-2xl text-sm text-muted-foreground"}>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          p
        ) : (
          <Link key={i} href={p.href} className="underline underline-offset-4 hover:text-foreground">
            {p.label}
          </Link>
        ),
      )}
    </p>
  );
}

const COPY = {
  es: {
    mx: (p: (s: string) => string): Part[] => [
      "Conoce nuestros ",
      { href: p("/servicios"), label: "servicios" },
      ", revisa el ",
      { href: p("/portafolio"), label: "portafolio" },
      " o lee un ",
      { href: p("/blog/caso-luvory-sitio-web"), label: "caso real de sitio web" },
      " y las ",
      { href: p("/blog"), label: "guías del blog" },
      ".",
    ],
    us: (p: (s: string) => string): Part[] => [
      "Consulta los ",
      { href: p("/precios"), label: "precios reales en USD" },
      " o lee las ",
      { href: p("/blog"), label: "guías para negocios en EE.UU." },
      ".",
    ],
  },
  en: {
    mx: (p: (s: string) => string): Part[] => [
      "Explore our ",
      { href: p("/servicios"), label: "services" },
      ", browse the ",
      { href: p("/portafolio"), label: "portfolio" },
      " or read a ",
      { href: p("/blog/caso-luvory-sitio-web"), label: "real website case study" },
      " and the ",
      { href: p("/blog"), label: "blog guides" },
      ".",
    ],
    us: (p: (s: string) => string): Part[] => [
      "See the ",
      { href: p("/precios"), label: "real USD pricing" },
      " or read the ",
      { href: p("/blog"), label: "guides for US businesses" },
      ".",
    ],
  },
} as const;

export function ExploreLinks({ lang, market = "mx", className }: { lang: Lang; market?: Market; className?: string }) {
  const p = (esPath: string) => (market === "us" ? usPath(esPath, lang) : langPath(esPath, lang));
  return <Sentence parts={COPY[lang][market](p)} className={className} />;
}
