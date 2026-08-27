import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.locale}
      className={`${dmSans.variable} ${playfair.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bone text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-brand focus:bg-petrol-800 focus:px-5 focus:py-3 focus:text-bone"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
