import type { Metadata } from "next";
import Script from 'next/script'
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Thumbli - Get YouTube Thumbnails, YouTube Shorts Thumbnails, Twitch Thumbnails, Dailymotion Thumbnails, Rumble Thumbnails",
    template: "%s - Thumbli",
  },
  description:
    "Instantly download high-quality thumbnails from YouTube, YouTube Shorts, Twitch, Dailymotion, BitChute, Streamable, and Rumble. Free thumbnail grabber with no account, no watermarks, no limits.",
  metadataBase: new URL("https://thumbli.net"),
  keywords: [
    "youtube thumbnail downloader",
    "youtube shorts thumbnail",
    "twitch thumbnail downloader",
    "dailymotion thumbnail",
    "rumble thumbnail",
    "video thumbnail grabber",
    "thumbnail extractor",
    "free thumbnail download",
    "hd thumbnail downloader",
  ],
  authors: [{ name: "Thumbli" }],
  creator: "Thumbli",
  publisher: "Thumbli",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://thumbli.net",
  },
  openGraph: {
    title: "Thumbli - Download YouTube Thumbnails, Shorts, Twitch & More",
    description:
      "Instantly grab and download high-quality thumbnails from YouTube, Shorts, Twitch, Dailymotion, and more. Free, fast, no watermarks.",
    url: "https://thumbli.net",
    siteName: "Thumbli",
    images: [
      {
        url: "https://i.imgur.com/hXrhIRX.png",
        width: 1200,
        height: 630,
        alt: "Thumbli - Free Thumbnail Downloader for YouTube, Twitch & More",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thumbli - Download YouTube Thumbnails, Shorts, Twitch & More",
    description:
      "Instantly grab and download high-quality thumbnails from YouTube, Shorts, Twitch, Dailymotion, and more.",
    images: ["https://i.imgur.com/A33XqhE.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-7603862946328325",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Thumbli",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Ezoic Privacy Scripts - MUST load first */}
      <Script
        src="https://cmp.gatekeeperconsent.com/min.js"
        data-cfasync="false"
        strategy="beforeInteractive"
      />
      <Script
        src="https://the.gatekeeperconsent.com/cmp.min.js"
        data-cfasync="false"
        strategy="beforeInteractive"
      />

      {/* Ezoic Header Script */}
      <Script
        async
        src="//www.ezojs.com/ezoic/sa.min.js"
        strategy="beforeInteractive"
      />
      <Script
        id="ezoic-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `,
        }}
      />
      
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7603862946328325"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTopButton />

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-9KHW76JQCJ"} />
      </body>
    </html>
  );
}
