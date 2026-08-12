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
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Dizayn",
      description,
      areaServed: ["Guadalajara", "Jalisco", "México", "Worldwide"],
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
      description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Guadalajara",
        addressRegion: "Jalisco",
        addressCountry: "MX",
      },
      email: CONTACT.email,
      areaServed: ["Guadalajara", "Jalisco", "México", "Worldwide"],
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
