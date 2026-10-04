/** Renders schema.org JSON-LD. Falsy entries are skipped so callers can pass optional nodes
 * (e.g. an FAQPage that only exists when the page has FAQs). `<` is escaped so content strings
 * can never close the script tag. */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const nodes = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
