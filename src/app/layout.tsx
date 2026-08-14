import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Analytics from "@/components/Analytics";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";
import { cinemaInfo } from "@/data/cinema";
import { getBaseUrl } from "@/lib/env";
import "./globals.css";
import DisclaimerBanner from "@/components/DisclaimerBanner";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = {
  default: "Cineplaza Itumbiara | Cinema no Shopping Center Plaza",
  template: "%s | Cineplaza Itumbiara",
};
const description =
  "Confira filmes em cartaz, horários, pré-vendas, experiências e o cardápio do Cineplaza Itumbiara. Grandes histórias, pertinho de você.";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  title,
  description,
  keywords: [
    "Cineplaza",
    "Cineplaza Itumbiara",
    "cinema Itumbiara",
    "programação de cinema",
    "ingressos",
    "filmes em cartaz",
    "cardápio",
    "Shopping Center Plaza",
    cinemaInfo.address.city,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: title.default,
    description,
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: `${cinemaInfo.name} Itumbiara`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Cineplaza Itumbiara — cinema local",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description,
    images: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${manrope.variable} dark`}>
      <body className="antialiased bg-background text-foreground font-body">
        <JsonLdOrganization />
        <Analytics />
        {children}
        <CookieConsent />
        <FloatingWhatsApp />
        <DisclaimerBanner />
      </body>
    </html>
  );
}
