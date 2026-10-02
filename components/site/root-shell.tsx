import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { WebMcpRegister } from "@/components/webmcp-register";
import { CONTACT } from "@/content/contact";
import { SITE_URL } from "@/lib/api-response";
import type { Lang } from "@/content/services";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const COPY = {
  es: {
    title: "Dizayn | Agencia de marketing en Guadalajara",
    description:
      "Agencia de marketing en Guadalajara: sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. México y el mundo.",
    path: "/",
  },
  en: {
    title: "Dizayn | Marketing agency in Guadalajara",
    description:
      "Marketing agency in Guadalajara: websites, SEO, AI visibility, social media, sales funnels, photography and video. Serving Mexico and the world.",
    path: "/en",
  },
} as const;

/** Default metadata for a root layout. Two root layouts exist ((es) and (en) route groups)
 * so that <html lang> is correct in the server-rendered HTML — a single root layout can only
 * hardcode one language. Every page still overrides title/description/alternates itself. */
export const rootMetadata = (lang: Lang): Metadata => {
  const { title, description, path } = COPY[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | Dizayn" },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dizayn" }],
    },
    twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
    alternates: { canonical: path },
    verification: {
      google: "zqve3zaRBgJl0Xq3QfdJ6j3btWpsueyE_uohdujsiM0",
    },
  };
};

// Structural identity facts only (name/address/areaServed), in English — schema.org values are
// machine-read identifiers, not display copy, so this block is identical in both root layouts.
// Single @id-anchored entity (ProfessionalService + LocalBusiness merged): every "Dizayn"
// reference sitewide (blog author/publisher, service provider) points at this same @id
// instead of re-declaring anonymous duplicate Organization nodes.
export const ORG_ID = `${SITE_URL}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": ORG_ID,
      name: "Dizayn",
      description: "Design and web development agency based in Guadalajara, Jalisco, Mexico.",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: `+${CONTACT.whatsapp}`,
      areaServed: ["Guadalajara", "Jalisco", "Mexico", "Worldwide"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Guadalajara",
        addressRegion: "Jalisco",
        addressCountry: "MX",
      },
      email: CONTACT.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${CONTACT.whatsapp}`,
        email: CONTACT.email,
        contactType: "customer service",
        areaServed: "Worldwide",
      },
      sameAs: [CONTACT.instagram],
    },
  ],
};

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${jakarta.variable} ${bricolage.variable} h-full`} suppressHydrationWarning>
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
        {/* Microsoft Clarity — session recording/heatmaps. strategy="lazyOnload": Clarity's own
            snippet dynamically injects a second script tag, so there's no benefit to loading it
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
