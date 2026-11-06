import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "FestiveVault | Holiday Custom Shirts & Tech Gadgets 2026",
  description: "Shop exclusive Christmas-themed graphic shirts, cozy holiday apparel, and cutting-edge tech gadgets. Fast shipping & festive gift bundles!",
  keywords: ["Christmas shirts", "holiday apparel", "tech gadgets 2026", "Christmas gifts", "custom tees"],
  openGraph: {
    title: "FestiveVault | Holiday Custom Shirts & Tech Gadgets",
    description: "Discover the ultimate collection of holiday apparel and smart tech gadgets this Christmas season.",
    url: 'https://yourbrandname.com',
    siteName: 'FestiveVault',
    images: [
      {
        url: 'https://yourbrandname.com/og-christmas.jpg',
        width: 1200,
        height: 630,
        alt: 'FestiveVault Christmas Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Schema.org JSON-LD for E-Commerce Google Ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "FestiveVault",
              "image": "https://yourbrandname.com/logo.png",
              "@id": "https://yourbrandname.com",
              "url": "https://yourbrandname.com",
              "telephone": "+1-800-555-FEST",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Holiday Lane",
                "addressLocality": "City",
                "addressRegion": "State",
                "postalCode": "12345",
                "addressCountry": "US"
              }
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#12372A] text-[#F5EBDD] antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}