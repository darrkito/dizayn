import type { ReactNode } from "react";
import type { Lang } from "@/content/services";
import { altPath } from "./routes";

/** Content strings write internal links as plain ES paths (e.g. `/servicios/seo`) regardless of
 * which language copy they're in — this both /en-prefixes AND translates the section/slug for
 * `en` (self-healing even against an already-/en-prefixed but untranslated legacy link). */
const localizePath = (path: string, lang: Lang) => altPath(path, lang);

export const parseInline = (text: string, lang: Lang) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(
      /\[([^\]]+)\]\((mailto:[^)]+)\)/g,
      '<a href="$2" class="text-primary underline underline-offset-4 hover:no-underline">$1</a>'
    )
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-4 hover:no-underline">$1</a>'
    )
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, (_match, label: string, path: string) => {
      const href = localizePath(path, lang);
      return `<a href="${href}" class="text-primary underline underline-offset-4 hover:no-underline">${label}</a>`;
    });

/** URL-safe anchor for a heading: lowercase, accents stripped, punctuation dropped. */
export const headingId = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

export const stripInline = (text: string) => text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/** The post's H2s, for the table of contents (anchors match the ids renderBlogContent emits). */
export function extractToc(content: string): { id: string; text: string }[] {
  return content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = stripInline(l.slice(3));
      return { id: headingId(text), text };
    });
}

/** Parses a small markdown-lite dialect (headers, bold, links, lists, blockquote, tables) into JSX. */
export function renderBlogContent(content: string, lang: Lang): ReactNode[] {
  const lines = content.trim().split("\n");
  const elements: ReactNode[] = [];
  let i = 0;
  let listBuffer: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (!listBuffer.length || !listType) return;
    const Tag = listType;
    elements.push(
      <Tag key={`list-${elements.length}`} className={`space-y-2 my-4 pl-5 ${Tag === "ul" ? "list-disc" : "list-decimal"}`}>
        {listBuffer}
      </Tag>
    );
    listBuffer = [];
    listType = null;
  };

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (trimmed.startsWith("|")) {
      flushList();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const parseRow = (row: string) => row.split("|").slice(1, -1).map((c) => c.trim());
      const dataRows = tableLines.filter((r) => !/^\|[\s\-|:]+\|$/.test(r));
      if (dataRows.length > 0) {
        const [header, ...body] = dataRows;
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  {parseRow(header).map((h, j) => (
                    <th
                      key={j}
                      className="border border-border px-4 py-2 text-left font-semibold text-foreground"
                      dangerouslySetInnerHTML={{ __html: parseInline(h, lang) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, j) => (
                  <tr key={j} className={j % 2 === 1 ? "bg-card" : ""}>
                    {parseRow(row).map((cell, k) => (
                      <td
                        key={k}
                        className="border border-border px-4 py-2 text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: parseInline(cell, lang) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (!trimmed) {
      flushList();
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      const text = stripInline(trimmed.slice(3));
      elements.push(
        <h2 key={i} id={headingId(text)} className="font-display text-2xl md:text-3xl text-foreground mt-12 mb-4 scroll-mt-28">
          {text}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      const text = stripInline(trimmed.slice(4));
      elements.push(
        <h3 key={i} id={headingId(text)} className="font-display text-xl text-foreground mt-8 mb-3 scroll-mt-28">
          {text}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-primary pl-5 my-6 text-lg text-foreground"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.slice(2), lang) }}
        />
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listBuffer.push(
        <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: parseInline(trimmed.slice(2), lang) }} />
      );
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listBuffer.push(
        <li
          key={i}
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.replace(/^\d+\.\s/, ""), lang) }}
        />
      );
      i++;
      continue;
    }

    flushList();
    elements.push(
      <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: parseInline(trimmed, lang) }} />
    );
    i++;
  }

  flushList();
  return elements;
}
