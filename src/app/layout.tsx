import type { Metadata } from "next";
import { Manrope, Merriweather, Geist_Mono, Source_Sans_3, Kalam } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import CartLink from "@/components/cart/CartLink";

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

export const metadata: Metadata = {
  title: "Сад Олега - Тут росте диво",
  description: "Свіжі овочі та фрукти з власного саду. Натуральні продукти для вашої родини.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
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
