import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import "./globals.scss";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: {
    default: "Thumbli - Get YouTube Thumbnails, YouTube Shorts Thumbnails, Twitch Thumbnails, Dailymotion Thumbnails, Rumble Thumbnails",
    template: "%s - Thumbli",
  },
  description:
    "Free tool to grab and download thumbnails from YouTube, Twitch, Dailymotion, BitChute, Streamable, and Rumble. No account needed, no watermarks, just fast thumbnail access.",
  metadataBase: new URL("https://thumbli.net"),
  alternates: {
    canonical: "https://thumbli.net",
  },
  openGraph: {
    title: "Thumbli - Get YouTube Thumbnails, YouTube Shorts Thumbnails, Twitch Thumbnails, Dailymotion Thumbnails, Rumble Thumbnails",
    description:
      "Grab high-quality thumbnails from YouTube, Shorts, Twitch, Dailymotion, and more.",
    url: "https://thumbli.net",
    siteName: "Thumbli",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <AnalyticsTracker />
        {children}
        <Footer />
        <ScrollToTopButton />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
