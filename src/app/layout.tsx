import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClickOrSkip - Find Your Perfect Travel Destination in 60 Seconds",
  description:
    "Our AI travel buddy asks a few quick questions and matches you with your dream destination. Free, fun, and takes less than a minute!",
  keywords:
    "travel quiz, destination finder, where should I travel, vacation planner, trip ideas, travel recommendations",
  authors: [{ name: "ClickOrSkip" }],
  openGraph: {
    title: "ClickOrSkip - Find Your Perfect Escape",
    description:
      "Discover your dream destination in 60 seconds with our AI travel buddy!",
    url: "https://clickorskip.online",
    siteName: "ClickOrSkip",
    images: [
      {
        url: "https://clickorskip.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClickOrSkip - Find Your Perfect Destination",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickOrSkip - Find Your Perfect Escape",
    description: "Discover your dream destination in 60 seconds!",
    images: ["https://clickorskip.online/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured Data for SEO & AI Optimization
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://clickorskip.online/#organization",
      "name": "ClickOrSkip",
      "url": "https://clickorskip.online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clickorskip.online/logo.png"
      },
      "description": "AI-powered travel destination finder that helps you discover your perfect trip in 60 seconds.",
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://clickorskip.online/#website",
      "url": "https://clickorskip.online",
      "name": "ClickOrSkip",
      "description": "Find your perfect travel destination with our AI-powered quiz. Compare flight deals and book your dream trip.",
      "publisher": {
        "@id": "https://clickorskip.online/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://clickorskip.online/#webpage",
      "url": "https://clickorskip.online",
      "name": "ClickOrSkip - Find Cheap Flights & Your Perfect Travel Destination",
      "description": "Discover your dream destination in 60 seconds with our AI travel buddy. Compare 100+ airlines and find flights up to 50% off.",
      "isPartOf": {
        "@id": "https://clickorskip.online/#website"
      },
      "about": {
        "@id": "https://clickorskip.online/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does ClickOrSkip find my perfect destination?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ClickOrSkip uses an AI-powered matching algorithm that analyzes your travel preferences through a quick 3-question quiz or chat conversation. Based on your answers about travel style, budget, and companions, we match you with destinations from our curated database and show you the best available flight deals."
          }
        },
        {
          "@type": "Question",
          "name": "Is ClickOrSkip free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, ClickOrSkip is completely free to use. You can take our travel quiz, chat with our AI, and browse destination matches without any cost. We earn a commission when you book through our partner links, which doesn't affect the price you pay."
          }
        },
        {
          "@type": "Question",
          "name": "How do I find cheap flights on ClickOrSkip?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After completing our travel quiz, we show you personalized flight deals to your matched destinations with prices up to 50% off. We compare prices from over 100 airlines through our booking partners to find you the best deals. You can also click directly on any destination card to search for flights."
          }
        },
        {
          "@type": "Question",
          "name": "What airlines does ClickOrSkip compare?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Through our booking partner Aviasales, we compare flight prices from over 100 airlines worldwide, including major carriers and budget airlines. This ensures you get the best available price for your chosen route."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get compensation for a delayed flight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! If your flight was delayed, cancelled, or overbooked, you may be entitled to up to 600 EUR in compensation under EU regulations. We partner with AirHelp to help you claim compensation. The process is simple and you only pay if you win your claim."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured Data for AI & SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Travelpayouts Emerald Auto-Monetization Script */}
        <Script
          id="travelpayouts-emerald"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrldtp.com/NzAyODQ5.js?t=702849';
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
