import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AddToCartProvider } from "@/context/AddToCartContext";
import { Toaster } from "sonner";
import { AddToFavoriteProvider } from "@/context/AddToFavoriteContext";

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-arabic",
  weight: ["200", "300", "500", "600", "700"],
  subsets: ["arabic"],
});

const robik = Rubik({
  variable: "--font-robik",
  weight: ["700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "My Shopex - Your Premium Shopping Experience",
    template: "%s | My Shopex",
  },
  description:
    "Discover premium products and exceptional shopping experience at My Shopex. Fast delivery, secure payments, and customer satisfaction guaranteed.",
  keywords: ["shopping", "ecommerce", "products", "online store", "My Shopex"],
  authors: [{ name: "My Shopex" }],
  creator: "My Shopex",
  publisher: "My Shopex",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://myshopex.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://myshopex.com",
    siteName: "My Shopex",
    title: "My Shopex - Your Premium Shopping Experience",
    description:
      "Discover premium products and exceptional shopping experience at My Shopex.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Shopex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Shopex",
    description: "Premium shopping experience",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://myshopex.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${notoKufiArabic.className} ${robik.variable} antialiased`}
        >
        <Toaster position="top-center" />
        <AddToFavoriteProvider>
          <AddToCartProvider>
            <Header />
            {children}
          </AddToCartProvider>
        </AddToFavoriteProvider>
      </body>
    </html>
  );
}
