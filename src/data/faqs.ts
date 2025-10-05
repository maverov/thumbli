// src/data/faqs.ts
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  // --- General ---
  {
    id: 1,
    question: "What does Thumbli do?",
    answer: `Thumbli is a web app that makes it super easy to get YouTube thumbnails or grab video thumbnails in full quality. Just paste a link — we’ll fetch every available thumbnail for you to preview and download. ✨
  No logins, no limits, just click and save! 🧡`
  },
  {
    id: 1212,
    question: "How does it work?",
    answer: `It’s super simple! 💡
  Just paste a full video URL — for example a YouTube, Twitch, or Dailymotion link — and Thumbli instantly detects the platform, fetches the available thumbnails, and shows them in every size and quality. 🖼️
  From there, you can preview, download, or copy the link for any thumbnail you like — it’s the easiest way to get or grab video thumbnails online. 🚀

  Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  },
  {
    id: 2,
    question: "Which platforms are supported?",
    answer: `We support YouTube (including Shorts), Twitch (Live & Clips), Dailymotion, BitChute, Streamable, and Rumble. ✅`
  },

  // --- YouTube ---
  {
    id: 3,
    question: "Can I use this for YouTube Shorts?",
    answer: `Absolutely! 🎬
Just paste a Shorts link like youtube.com/shorts/... and you’ll instantly see all the thumbnail sizes YouTube makes for it — from the smallest preview to full HD maxresdefault. 🔍
Example: https://www.youtube.com/shorts/abc123XYZ`
  },
  {
    id: 4,
    question: "Which YouTube thumbnail sizes can I download?",
    answer: `We show YouTube’s known sizes: maxresdefault, sddefault, hqdefault, mqdefault, default, plus 0.jpg–3.jpg and oar2.jpg when available.`
  },
  {
    id: 41115,
    question: "What's the difference between different YouTube resolutions?",
    answer: `YouTube generates multiple thumbnail resolutions so that videos look good on every device and connection speed.

  - maxresdefault.jpg (1280×720) — the highest quality, used for HD screens and large embeds.
  - sddefault.jpg (640×480) — standard definition, a solid fallback when max-res isn’t available.
  - hqdefault.jpg (480×360) — high quality, commonly used for desktop previews.
  - mqdefault.jpg (320×180) — medium quality, usually shown on smaller players or slower networks.
  - default.jpg (120×90) — small, lightweight preview used in mobile lists and search results.

  When you get or grab a YouTube thumbnail with Thumbli, you’ll see all available versions so you can pick the resolution that fits your design or platform best.`
  },
  {
    id: 5,
    question: "How do I copy a direct YouTube thumbnail URL?",
    answer: `Use the pattern: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg (swap VIDEO_ID). 🔗
You can also pick hqdefault, sddefault, mqdefault, default, or 0.jpg–3.jpg.`
  },
  {
    id: 6,
    question: "What are 0.jpg–3.jpg frames on YouTube?",
    answer: `YouTube automatically generates four smaller thumbnail frames for each video — named 0.jpg, 1.jpg, 2.jpg, and 3.jpg. 🖼️
These are alternate snapshots taken from different parts of the video and are often used as backups if a custom thumbnail isn’t set.`
  },
  {
    id: 7,
    question: "Why is maxresdefault missing on some YouTube videos?",
    answer: `Not every video has a true max-res image. If maxresdefault isn’t available, we’ll still show the highest size YouTube provides (like sddefault or hqdefault). 👍`
  },
  {
    id: 8,
    question: "What’s the recommended YouTube thumbnail size?",
    answer: `YouTube recommends 1280×720 (16:9), minimum width 640, and under 2 MB. ✅`
  },

  // --- Twitch ---
  {
    id: 9,
    question: "Can I get thumbnails from Twitch?",
    answer: `Yes — Twitch Live and Clips are supported (not VODs). Paste a channel or clip link and grab the preview image.
Examples:
Live: https://www.twitch.tv/somechannel
Clip: https://clips.twitch.tv/FunnyMoment123`
  },
  {
    id: 10,
    question: "How do I choose the exact Twitch thumbnail size?",
    answer: `Twitch preview URLs use a {width}x{height} pattern. We’ll help you get common sizes (1920×1080, 1280×720, 640×360) or you can set your own.`
  },
  {
    id: 11,
    question: "Why do Twitch thumbnails change?",
    answer: `Twitch live stream thumbnails update automatically every few seconds to show a fresh preview of the stream.
If you refresh the page or click the image later, you might see a different frame — that’s totally normal and helps keep previews current.`
  },
  {
    id: 12,
    question: "Do you support Twitch VOD thumbnails?",
    answer: `Not at the moment — Thumbli supports Twitch Live previews and Clip thumbnails only.`
  },

  // --- Dailymotion ---
  {
    id: 13,
    question: "Can I get thumbnails from Dailymotion?",
    answer: `Yes! Paste a Dailymotion video link and we’ll fetch the available thumbnail sizes automatically.
Example: https://www.dailymotion.com/video/x7xyz12`
  },

  // --- BitChute ---
  {
    id: 14,
    question: "Can I get thumbnails from BitChute?",
    answer: `Yep — drop a BitChute video link and we’ll show the cover/preview image in the best quality we can find.
Example: https://www.bitchute.com/video/abcdEFGH/`
  },

  // --- Streamable ---
  {
    id: 15,
    question: "Can I get thumbnails from Streamable?",
    answer: `You bet. Paste any Streamable link to fetch the preview image and download it or copy its URL.
Example: https://streamable.com/xyz123`
  },

  // --- Rumble ---
  {
    id: 16,
    question: "Can I get thumbnails from Rumble?",
    answer: `Yes — Rumble is supported. Paste a video URL and we’ll display the thumbnail for quick download.
Example: https://rumble.com/v4abcd1-video-title.html`
  },

  // --- General use / UX ---
  {
    id: 17,
    question: "Is Thumbli free to use?",
    answer: `Yep — 100% free. No accounts or paywalls, just paste and save. 😊`
  },
  {
    id: 18,
    question: "Do you store my links or images?",
    answer: `Nope. Everything happens in your browser — we don’t keep your URLs or thumbnails. 🔒`
  },
  {
    id: 19,
    question: "How do I save thumbnails on mobile?",
    answer: `Long-press any image and choose “Download” or “Save to Photos.” You can also copy the image link if you prefer.`
  },
  {
    id: 20,
    question: "I see a broken or blank image — what should I do?",
    answer: `Try opening the thumbnail in a new tab (sometimes previews are cached or blocked). You can also click “Download All” and we’ll retry.`
  },
  {
    id: 21,
    question: "Can I share feedback or suggest new features?",
    answer: `We’d love that! Visit our Contact page to share ideas, report bugs, or just say hi. 💌`
  }
];
