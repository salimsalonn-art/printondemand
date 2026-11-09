import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

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
        {/* Microsoft Clarity Tracking Script */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
            `,
          }}
        />

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
      <body className={`${inter.className} bg-[#FAF7F0] text-[#252B25] antialiased`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen justify-between">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </CartProvider>
        
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}