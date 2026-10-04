import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared 1200x630 share card for blog posts and service pages. Brand colors are the dark-theme
 * tokens from app/globals.css as hex (Satori has no oklch support). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/bricolage-grotesque-700.woff")),
  readFile(join(process.cwd(), "assets/fonts/plus-jakarta-sans-500.woff")),
]);

export async function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const [display, body] = await fonts;
  const size = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 15%, #1d3f8f 0%, #0d1017 55%)",
          color: "#f4f6fb",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 40, letterSpacing: "-0.06em" }}>
            DIZAYN<span style={{ color: "#4ea8f5" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#4ea8f5",
              border: "2px solid rgba(78,168,245,0.4)",
              borderRadius: 999,
              padding: "8px 22px",
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: size, lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: 1040 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a9b3c7" }}>{footer}</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage", data: display, weight: 700, style: "normal" },
        { name: "Jakarta", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}

