import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com"],
    remotePatterns: [
      { protocol: "https", hostname: "static-cdn.jtvnw.net" },
      { protocol: "https", hostname: "clips-media-assets2.twitch.tv" },
    ],
  },
};

export default nextConfig;
