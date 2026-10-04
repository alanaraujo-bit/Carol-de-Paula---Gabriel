import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { site } from "@/content/site";
import { buildStructuredData } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { RevealObserver } from "@/components/motion/RevealObserver";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "../assets/fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Carol de Paula",
    "apresentadora",
    "mestre de cerimônias",
    "cerimonialista",
    "Canaã dos Carajás",
    "Pará",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    firstName: "Carol",
    lastName: "de Paula",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "events",
};

export const viewport: Viewport = {
  themeColor: "#f5f1ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = buildStructuredData();

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags JS support before paint so reveal animations never hide content without it. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a
          href="#conteudo"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-5 py-3 text-sm text-paper transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <MobileContactBar />
        <RevealObserver />
      </body>
    </html>
  );
}
