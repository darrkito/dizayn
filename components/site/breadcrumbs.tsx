import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbList, type Crumb } from "@/lib/schema";

/** Visible breadcrumb trail plus its BreadcrumbList JSON-LD, generated from the same items so
 * the markup always matches what's on screen. The last crumb is the current page (not a link). */
export function Breadcrumbs({ items, label, className = "" }: { items: Crumb[]; label: string; className?: string }) {
  return (
    <>
      <nav aria-label={label} className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-x-2">
                {last ? (
                  <span aria-current="page" className="line-clamp-1 max-w-[16rem] text-primary">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="inline-flex min-h-11 items-center hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {c.label}
                  </Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbList(items)} />
    </>
  );
}
