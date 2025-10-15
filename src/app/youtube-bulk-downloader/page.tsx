import BulkThumbnailDownloader from './BulkThumbnailDownloader';

export async function generateMetadata() {
  return {
    "title": "Bulk YouTube Thumbnail Downloader - Download Multiple Video Thumbnails",
    "description": "Download thumbnails from multiple YouTube videos at once. Paste multiple video URLs and get all thumbnails in high quality. Supports YouTube, Twitch, Dailymotion, BitChute, Rumble, and Streamable.",
    "keywords": [
        "bulk youtube thumbnail downloader",
        "download multiple youtube thumbnails",
        "batch thumbnail downloader",
        "youtube thumbnail extractor",
        "video thumbnail download tool",
        "high quality youtube thumbnails",
        "mass thumbnail download"
    ],
    "openGraph": {
        "title": "Bulk YouTube Thumbnail Downloader",
        "description": "Download thumbnails from multiple videos at once. Works with YouTube, Twitch, Dailymotion, BitChute, Rumble, and Streamable.",
        "type": "website"
    },
    "schema": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Bulk Thumbnail Downloader",
        "description": "Free online tool to download video thumbnails in bulk from YouTube and other platforms",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
        },
    "featureList": [
        "Bulk download multiple video thumbnails",
        "Support for YouTube, Twitch, Dailymotion, BitChute, Rumble, Streamable",
        "High quality thumbnail extraction",
        "Free and no registration required"
        ]
    },
    "canonical": "/bulk-thumbnail-downloader"
    }
};

export default function Page() {
  return <BulkThumbnailDownloader />;
};