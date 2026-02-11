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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Travelpayouts Emerald Auto-Monetization Script */}
        <Script
          id="travelpayouts-emerald"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrldtp.com/NDk3MzY5.js?t=497369';
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
