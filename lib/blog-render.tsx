import type { ReactNode } from "react";
import type { Lang } from "@/content/services";

/** Content strings write internal links as plain ES paths (e.g. `/servicios/seo`) regardless of
 * which language copy they're in — this prefixes them for `en` so EN pages don't link back into
 * the ES URL tree. Paths already under `/en` (e.g. cross-links to other EN blog posts) are left alone. */
const localizePath = (path: string, lang: Lang) =>
  lang === "en" && !path.startsWith("/en") ? `/en${path}` : path;

const parseInline = (text: string, lang: Lang) =>
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
                    <th key={j} className="border border-border px-4 py-2 text-left font-semibold text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, j) => (
                  <tr key={j} className={j % 2 === 1 ? "bg-card" : ""}>
                    {parseRow(row).map((cell, k) => (
                      <td key={k} className="border border-border px-4 py-2 text-muted-foreground">
                        {cell}
                      </td>
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
      elements.push(
        <h2 key={i} className="font-display text-2xl md:text-3xl text-foreground mt-12 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="font-display text-xl text-foreground mt-8 mb-3">
          {trimmed.slice(4)}
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
