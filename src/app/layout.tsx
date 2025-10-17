import type { Metadata } from "next";
import { Manrope, Merriweather, Geist_Mono, Source_Sans_3, Kalam } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import CartLink from "@/components/cart/CartLink";
import { generateLocalBusinessSchema, generateWebSiteSchema } from "@/utils/schemaUtils";
import { generateHomeOGTags } from "@/utils/ogUtils";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-description",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-handwriting",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Генеруємо мета-дані з Open Graph тегами
const homeOGTags = generateHomeOGTags();

export const metadata: Metadata = {
  title: homeOGTags.title,
  description: homeOGTags.description,
  keywords: "саджанці хурми, саджанці персика, саджанці абрикоса, саджанці інжиру, сад Закарпаття, доставка саджанців, купити саджанці, плодові дерева, екзотичні рослини, хурма сорти, персик сорти, абрикос сорти",
  authors: [{ name: "Сад Олега" }],
  creator: "Сад Олега",
  publisher: "Сад Олега",
  robots: "index, follow",
  alternates: {
    canonical: "https://sad-olega.com/",
  },
  openGraph: {
    title: homeOGTags.title,
    description: homeOGTags.description,
    url: homeOGTags.url,
    siteName: homeOGTags.siteName,
    images: [
      {
        url: homeOGTags.image,
        width: 1200,
        height: 630,
        alt: homeOGTags.imageAlt,
      },
    ],
    locale: homeOGTags.locale,
    type: homeOGTags.type,
  },
  twitter: {
    card: "summary_large_image",
    title: homeOGTags.title,
    description: homeOGTags.description,
    images: [homeOGTags.image],
  },
  other: {
    "og:image:alt": homeOGTags.imageAlt,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="uk">
      <head>
        {/* Schema.org розмітка */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${merriweather.variable} ${sourceSans.variable} ${kalam.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <CartLink />
        </Providers>
      </body>
    </html>
  );
}
