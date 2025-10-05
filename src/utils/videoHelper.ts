import { Thumbnail } from "@/types/video";

interface PlatformConfig {
  name: string;
  patterns: RegExp[];
  extractId: (url: string) => string | null;
  generateThumbnails: (id: string) => Thumbnail[];
}

const YOUTUBE_CONFIG: PlatformConfig = {
  name: "YouTube",
  patterns: [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ],
  extractId: (url: string): string | null => {
    // Try regex patterns first
    for (const pattern of YOUTUBE_CONFIG.patterns) {
      const match = url.match(pattern);
      if (match?.[1]) return match[1];
    }

    // Fallback to URL parsing
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname;

      if (hostname.includes("youtu.be")) {
        return parsed.pathname.slice(1).split(/[?#]/)[0];
      }
      
      if (hostname.includes("youtube.com")) {
        const videoId = parsed.searchParams.get("v");
        if (videoId) return videoId;
        
        const shortsMatch = parsed.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
        if (shortsMatch?.[1]) return shortsMatch[1];
      }
    } catch {
      return null;
    }

    return null;
  },
  generateThumbnails: (id: string): Thumbnail[] => {
    const names = [
      "maxresdefault",
      "sddefault",
      "hqdefault",
      "default",
      "mqdefault",
      "0",
      "1",
      "2",
      "3",
      "oar2"
    ] as const;

    return names.map((name) => ({
      name: `${name}`,
      url: `https://img.youtube.com/vi/${id}/${name}.jpg`,
      platform: "YouTube",
    }));
  },
};

const DAILYMOTION_CONFIG: PlatformConfig = {
  name: "Dailymotion",
  patterns: [
    /dailymotion\.com\/video\/([a-zA-Z0-9]+)/,
    /dai\.ly\/([a-zA-Z0-9]+)/,
  ],
  extractId: (url: string): string | null => {
    for (const pattern of DAILYMOTION_CONFIG.patterns) {
      const match = url.match(pattern);
      if (match?.[1]) return match[1];
    }

    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname;

      if (hostname.includes("dailymotion.com")) {
        const pathMatch = parsed.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
        if (pathMatch?.[1]) return pathMatch[1];
      }

      if (hostname.includes("dai.ly")) {
        return parsed.pathname.slice(1).split(/[?#]/)[0];
      }
    } catch {
      return null;
    }

    return null;
  },
  generateThumbnails: (id: string): Thumbnail[] => {
    return [
      {
        name: "thumbnail",
        url: `https://www.dailymotion.com/thumbnail/video/${id}`,
        platform: "Dailymotion",
      },
      {
        name: "thumbnail-large",
        url: `https://www.dailymotion.com/thumbnail/video/${id}?size=large`,
        platform: "Dailymotion",
      },
      {
        name: "thumbnail-medium",
        url: `https://www.dailymotion.com/thumbnail/video/${id}?size=medium`,
        platform: "Dailymotion",
      },
      {
        name: "thumbnail-small",
        url: `https://www.dailymotion.com/thumbnail/video/${id}?size=small`,
        platform: "Dailymotion",
      },
    ];
  },
};

const STREAMABLE_CONFIG: PlatformConfig = {
  name: "Streamable",
  patterns: [
    /streamable\.com\/([a-zA-Z0-9]+)/,
  ],
  extractId: (url: string): string | null => {
    const match = url.match(STREAMABLE_CONFIG.patterns[0]);
    if (match?.[1]) return match[1];

    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("streamable.com")) {
        return parsed.pathname.slice(1).split(/[?#]/)[0];
      }
    } catch {
      return null;
    }

    return null;
  },
  generateThumbnails: (id: string): Thumbnail[] => {
    return [
      {
        name: "thumbnail-east",
        url: `https://cdn-cf-east.streamable.com/image/${id}.jpg`,
        platform: "Streamable",
      },
      {
        name: "thumbnail-west",
        url: `https://cdn-cf-west.streamable.com/image/${id}.jpg`,
        platform: "Streamable",
      },
    ];
  },
};

const BITCHUTE_CONFIG: PlatformConfig = {
  name: "BitChute",
  patterns: [
    /bitchute\.com\/video\/([a-zA-Z0-9]+)/,
  ],
  extractId: (url: string): string | null => {
    const match = url.match(BITCHUTE_CONFIG.patterns[0]);
    if (match?.[1]) return match[1];

    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("bitchute.com")) {
        const pathMatch = parsed.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
        if (pathMatch?.[1]) return pathMatch[1];
      }
    } catch {
      return null;
    }

    return null;
  },
  generateThumbnails: (id: string): Thumbnail[] => {
    // BitChute thumbnails follow this pattern
    return [
      {
        name: "thumbnail",
        url: `https://static-3.bitchute.com/live/cover_images/video/${id}/thumbnail.jpg`,
        platform: "BitChute",
      },
    ];
  },
};

const RUMBLE_CONFIG: PlatformConfig = {
  name: "Rumble",
  patterns: [
    /rumble\.com\/([v][a-zA-Z0-9]+)/,
  ],
  extractId: (url: string): string | null => {
    // Return the full URL as we need it for scraping
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("rumble.com")) {
        return url;
      }
    } catch {
      return null;
    }

    return null;
  },
  generateThumbnails: (fullUrl: string): Thumbnail[] => {
    return [
      {
        name: "rumble-thumbnail",
        url: fullUrl,
        platform: "Rumble",
      },
    ];
  },
};

const TWITCH_LIVE_CONFIG: PlatformConfig = {
  name: "Twitch (Live)",
  // Accepts https://www.twitch.tv/<user>, https://m.twitch.tv/<user>, with optional slash/query/hash
  patterns: [
    /^(?:https?:\/\/)?(?:www\.|m\.)?twitch\.tv\/([a-zA-Z0-9_]+)(?:[\/?#].*)?$/i,
  ],
  extractId: (url: string): string | null => {
    console.log("[TWITCH LIVE] extractId() called with url:", url);

    // 1) Try regex
    try {
      const patterns = TWITCH_LIVE_CONFIG.patterns;
      console.log("[TWITCH LIVE] patterns:", patterns.map(p => p.toString()));

      for (const p of patterns) {
        const m = url.match(p);
        console.log("[TWITCH LIVE] regex test:", p.toString(), "=>", m);
        if (m?.[1]) {
          const id = m[1].toLowerCase();
          console.log("[TWITCH LIVE] regex matched username:", id);
          return id;
        }
      }
    } catch (e) {
      console.error("[TWITCH LIVE] regex step threw:", e);
    }

    // 2) Fallback: parse URL & take first path segment
    try {
      const u = new URL(url);
      const rawHost = u.hostname;
      const host = rawHost.replace(/^www\.|^m\./, "");
      const pathname = u.pathname;
      const segs = pathname.split("/").filter(Boolean);

      console.log("[TWITCH LIVE] URL parsed:", {
        rawHost,
        normalizedHost: host,
        pathname,
        segs,
      });

      if (host !== "twitch.tv") {
        console.warn("[TWITCH LIVE] host is not twitch.tv ->", host);
        return null;
      }

      if (!segs.length) {
        console.warn("[TWITCH LIVE] no path segments");
        return null;
      }

      const first = segs[0];
      console.log("[TWITCH LIVE] first segment:", first);

      if (["videos", "clip", "directory", "p"].includes(first.toLowerCase())) {
        console.warn("[TWITCH LIVE] first segment is a non-live path:", first);
        return null;
      }

      const id = first.toLowerCase();
      console.log("[TWITCH LIVE] fallback extracted username:", id);
      return id;
    } catch (e) {
      console.error("[TWITCH LIVE] URL parsing failed:", e);
      return null;
    }
  },
  generateThumbnails: (username: string): Thumbnail[] => {
    console.log("[TWITCH LIVE] generateThumbnails() for username:", username);

    // Common sizes Twitch serves; add a cache-buster to dodge stale edges
    const sizes: Array<[number, number]> = [
      [320, 180],
      [480, 270],
      [640, 360],
      [1280, 720],
      [1920, 1080],
    ];

    const cb = `cb=${Date.now()}`;
    console.log("[TWITCH LIVE] sizes:", sizes, "cacheBuster:", cb);

    const thumbs = sizes.map(([w, h]) => {
      const url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${username}-${w}x${h}.jpg?${cb}`;
      const item = { name: `${w}x${h}`, url, platform: "Twitch" as const };
      console.log("[TWITCH LIVE] built thumb:", item);
      return item;
    });

    console.log("[TWITCH LIVE] total thumbnails generated:", thumbs.length);
    return thumbs;
  },
};
/* ---------------------------- TWITCH: CLIPS --------------------------- */
const TWITCH_CLIP_CONFIG: PlatformConfig = {
  name: "Twitch (Clip)",
  // Only match real clip URLs
  patterns: [
    /^(?:https?:\/\/)?(?:www\.)?clips\.twitch\.tv\/([^/?#]+)(?:[\/?#].*)?$/i,
    /^(?:https?:\/\/)?(?:www\.)?twitch\.tv\/[^/]+\/clip\/([^/?#]+)(?:[\/?#].*)?$/i,
  ],
  extractId: (url: string): string | null => {
    console.log("[TWITCH CLIP] extractId() url:", url);
    for (const p of TWITCH_CLIP_CONFIG.patterns) {
      const m = url.match(p);
      console.log("[TWITCH CLIP] test:", p.toString(), "=>", m ? m[1] : null);
      if (m?.[1]) return m[1];
    }
    console.warn("[TWITCH CLIP] no match (returning null)");
    return null; // <-- IMPORTANT: no fallback grabbing last segment
  },
  generateThumbnails: (slug: string): Thumbnail[] => {
    console.log("[TWITCH CLIP] generateThumbnails slug:", slug);
    return [
      { name: "preview-260x147", url: `https://clips-media-assets2.twitch.tv/${slug}-preview-260x147.jpg`, platform: "Twitch" },
      { name: "preview-480x272", url: `https://clips-media-assets2.twitch.tv/${slug}-preview-480x272.jpg`, platform: "Twitch" },
      { name: "social-preview",  url: `https://clips-media-assets2.twitch.tv/${slug}-social-preview.jpg`,  platform: "Twitch" },
    ];
  },
};

// Add or remove platforms here to configure what's supported
const PLATFORMS: PlatformConfig[] = [
  YOUTUBE_CONFIG,
  DAILYMOTION_CONFIG,
  STREAMABLE_CONFIG,
  BITCHUTE_CONFIG,
  TWITCH_LIVE_CONFIG,
  TWITCH_CLIP_CONFIG,
  RUMBLE_CONFIG
];

export const getThumbnails = (url: string): Thumbnail[] => {
  if (!url || typeof url !== "string") return [];

  // Try each platform until one matches
  for (const platform of PLATFORMS) {
    const id = platform.extractId(url);
    if (id) {
      return platform.generateThumbnails(id);
    }
  }

  return [];
};

export const detectPlatform = (url: string): string | null => {
  if (!url || typeof url !== "string") return null;

  for (const platform of PLATFORMS) {
    const id = platform.extractId(url);
    if (id) return platform.name;
  }

  return null;
};

export const getSupportedPlatforms = (): string[] => {
  return PLATFORMS.map(p => p.name);
};

export const extractYouTubeId = (url: string): string | null => {
  return YOUTUBE_CONFIG.extractId(url);
};

export const fetchRumbleThumbnail = async (url: string): Promise<string | null> => {
  try {
    const CORS_PROXY = "https://api.allorigins.win/raw?url=";
    const response = await fetch(CORS_PROXY + encodeURIComponent(url));
    const html = await response.text();

    console.log('html: ', html)
    
    // Parse HTML to find og:image
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    console.log('doc: ', doc)
    const ogImage = doc.querySelector('meta[property="og:image"]');
    console.log('ogImage:', ogImage)
    
    return ogImage?.getAttribute("content") || null;
  } catch (error) {
    console.error("Failed to fetch Rumble thumbnail:", error);
    return null;
  }
};