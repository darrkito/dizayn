import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { WebMcpRegister } from "@/components/webmcp-register";
import { CONTACT } from "@/content/contact";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const title = "Dizayn | Agencia de marketing en Guadalajara";
const description =
  "Agencia de marketing en Guadalajara: sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. México y el mundo.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dizayn.com.mx";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Dizayn" },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dizayn" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  alternates: { canonical: "/" },
  verification: {
    google: "zqve3zaRBgJl0Xq3QfdJ6j3btWpsueyE_uohdujsiM0",
  },
};

// This schema block renders identically on every route (root layout can only declare it once —
// see the <html lang> note below for the same static-generation tradeoff). It deliberately
// carries no marketing-copy `description` field, so it has nothing to be the wrong language
// about — each page's own JSON-LD (blog posts, service details) and <meta name="description">
// already carry the real per-language copy. Only structural identity facts (name/address/areaServed)
// live here, in English, since schema.org values are machine-read identifiers, not display copy.
// Single @id-anchored entity (ProfessionalService + LocalBusiness merged), matching the
// Luvory pattern — every "Dizayn" reference sitewide (blog author/publisher, service
// provider) points at this same @id instead of re-declaring anonymous duplicate
// Organization nodes, which fragments entity recognition for Google/AI crawlers.
export const ORG_ID = `${SITE_URL}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": ORG_ID,
      name: "Dizayn",
      url: SITE_URL,
      telephone: `+${CONTACT.whatsapp}`,
      areaServed: ["Guadalajara", "Jalisco", "Mexico", "Worldwide"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Guadalajara",
        addressRegion: "Jalisco",
        addressCountry: "MX",
      },
      email: CONTACT.email,
      sameAs: [CONTACT.instagram],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <WebMcpRegister />
          </I18nProvider>
        </ThemeProvider>
        {/* Microsoft Clarity — session recording/heatmaps. strategy="lazyOnload"
            (matches the pattern already established for GA4 on the
            SwapperBetweenChains project): Clarity's own snippet dynamically
            injects a second script tag, so there's no benefit to loading it
            any earlier than the page becoming interactive. */}
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y7tbs2av0v");
          `}
        </Script>
      </body>
    </html>
  );
}
