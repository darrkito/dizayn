import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CONTACT } from "@/content/contact";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const title = "Dizayn | Agencia de marketing en Guadalajara";
const description =
  "Agencia de marketing en Guadalajara: sitios web, SEO, posicionamiento en IA, redes sociales, embudos de venta, fotografía y video. México y el mundo.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dizayn.com.mx";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Dizayn" },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
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
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Dizayn",
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
    {
      "@type": "LocalBusiness",
      name: "Dizayn",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Guadalajara",
        addressRegion: "Jalisco",
        addressCountry: "MX",
      },
      email: CONTACT.email,
      areaServed: ["Guadalajara", "Jalisco", "Mexico", "Worldwide"],
      sameAs: [CONTACT.instagram],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full`} suppressHydrationWarning>
      <head>
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
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
