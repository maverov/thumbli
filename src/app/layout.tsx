import type { Metadata } from "next";
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
    "Free tool to grab and download thumbnails from YouTube, Twitch, Dailymotion, BitChute, Streamable, and Rumble. No account needed, no watermarks, just fast thumbnail access.",
  metadataBase: new URL("https://thumbli.com"),
  alternates: {
    canonical: "https://thumbli.com",
  },
  openGraph: {
    title: "Thumbli - Get YouTube Thumbnails, YouTube Shorts Thumbnails, Twitch Thumbnails, Dailymotion Thumbnails, Rumble Thumbnails",
    description:
      "Grab high-quality thumbnails from YouTube, Shorts, Twitch, Dailymotion, and more.",
    url: "https://thumbli.com",
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
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
