"use client";

import { useState, useEffect } from "react";
import { FAQs } from "@/components/FAQs";
import styles from "./ThumbnailWorkbench.module.scss";
import { getThumbnails, fetchRumbleThumbnail, detectPlatform } from "@/utils/videoHelper";
import { Thumbnail } from "@/types/video";


export const ThumbnailWorkbench = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>('');

  const handleUrlChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setVideoUrl(e.target.value);
    setError('');
  };

  useEffect(() => {
    const loadThumbnails = async () => {
      if (videoUrl) {
        // Validate URL
        try {
          new URL(videoUrl);
        } catch {
          setError('⚠️ Invalid URL — try again?');
          setThumbnails([]);
          return;
        }

        const platform = detectPlatform(videoUrl);
        
        if (!platform) {
          setError('❌ Sorry, that platform isn’t supported yet.');
          setThumbnails([]);
          return;
        }

        setError('');

        // Special handling for Rumble
        if (platform === "Rumble") {
          const thumbnail = await fetchRumbleThumbnail(videoUrl);
          if (thumbnail) {
            setThumbnails([{
              name: "rumble-thumbnail",
              url: thumbnail,
              platform: "Rumble",
            }]);
          } else {
            setError('❌ Failed to fetch Rumble thumbnail');
            setThumbnails([]);
          }
        } else {
          // All other platforms with direct URLs
          const results = getThumbnails(videoUrl);
          setThumbnails(results);
        }
        
        setLoadedThumbnails(new Set());
      } else {
        setThumbnails([]);
        setLoadedThumbnails(new Set());
        setError('');
      }
    };

    loadThumbnails();
}, [videoUrl]);

  const handleDownloadAll = async (items: Thumbnail[]) => {
    if (!items || items.length === 0) return;

    for (const thumb of items) {
      try {
        const response = await fetch(thumb.url, { mode: "cors" });
        if (!response.ok) throw new Error("HTTP " + response.status);

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${thumb.platform}_${thumb.name}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);

        // Add a tiny delay so browsers don't block rapid downloads
        await new Promise((r) => setTimeout(r, 200));
      } catch (err) {
        console.warn(`⚠️ Could not download ${thumb.name} (${thumb.platform})`, err);
        // fallback: open in new tab if blocked by CORS
        window.open(thumb.url, "_blank", "noopener,noreferrer");
      }
    }
  };

  const handleImageLoad = (name: string) => {
    setLoadedThumbnails(prev => new Set(prev).add(name));
  };

  const handleImageError = (name: string) => {
    // Remove thumbnail if it fails to load
    setThumbnails(prev => prev.filter(t => t.name !== name));
  };

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(url, '_blank');
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link');
    }
  };

  const getThumbnailSize = (name: string): string => {
    const sizes: Record<string, string> = {
      'maxresdefault': '1280×720',
      'default': '120×90',
      'mqdefault': '320×180',
      'hqdefault': '480×360',
      'sddefault': '640×480',
      'oar2': '405×720',
      '0': '480×360',
      '1': '120×90',
      '2': '120×90',
      '3': '120×90',
    };
    return sizes[name] || 'Unknown';
  };

  return (
    <section className={styles.workbench} aria-labelledby="tw-title">

      <section className={`${styles.card} ${styles.green}`} aria-labelledby="url-title">
        <h2 id="url-title" className={styles.cardTitle}>Paste your video link 👇</h2>

        <div className={styles.inlineRow}>
          <div className={styles.inputWrapper}>
            <input
              id="video-url"
              type="url"
              className={styles.input}
              placeholder="https://www.youtube.com/watch?v=..."
              aria-describedby="url-help"
              value={videoUrl}
              onChange={handleUrlChange}
            />
            {videoUrl && (
              <button
                className={styles.clearBtn}
                onClick={() => {
                  setVideoUrl('');
                  setThumbnails([]);
                  setLoadedThumbnails(new Set());
                  setError('');
                }}
                aria-label="Clear input"
              >
                ❌ Clear
              </button>
            )}
          </div>
        </div>
        {error && (
          <span className={styles.errorText}>
            {error}
          </span>
        )}

        <p id="url-help" className={styles.helpText}>
          Works with YouTube, YouTube Shorts, Twitch Clips & Live, Dailymotion, BitChute, and Streamable
        </p>
      </section>

      { 
        !videoUrl && (
          <div className={`${styles.heroSection} ${styles.card} ${styles.orange}`}>
            <h1>How It Works</h1>
            <ol>
              <li>Paste a video link from YouTube, Twitch, Dailymotion, BitChute, or Streamable</li>
              <li>We&apos;ll list the available thumbnails and show them to you</li>
              <li>Tap any image to download it, or grab them all at once</li>
            </ol>
          </div>
        )
      }

      {/* Display thumbnails */}
      {thumbnails.length > 0 && (
        <>
          <div className={styles.thumbnailCaption}>
            <p>🎉 Thumbnails ready!</p>
            <p>Click any image to download — or grab them all below</p>
            <button 
              className={`${styles.downloadBtn} ${styles.mt1}`}
              onClick={() => handleDownloadAll(thumbnails)}
            >
              Download All
            </button>
          </div>
          
          <div className={styles.thumbnailGrid}>
            {thumbnails.map((thumb) => (
              <div key={thumb.name} className={styles.thumbnailWrapper}>
                <img 
                  src={thumb.url} 
                  alt={`Thumbnail: ${thumb.name}`} 
                  className={styles.thumbnailImage}
                  onClick={() => handleDownload(thumb.url, thumb.name)}
                  onLoad={() => handleImageLoad(thumb.name)}
                  onError={() => handleImageError(thumb.name)}
                />
                <div className={styles.thumbnailInfo}>
                  <span className={styles.thumbnailSize}>
                    Standard ({getThumbnailSize(thumb.name)})
                  </span>
                   <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className={styles.downloadBtn}
                        onClick={() => handleCopyLink(thumb.url)}
                      >
                        Copy Link
                      </button>
                      <button 
                        className={styles.downloadBtn}
                        onClick={() => handleDownload(thumb.url, thumb.name)}
                      >
                        Download Thumbnail
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </div>

        </>
      )}

      <div className={`${styles.card} ${styles.green}`}>
        <FAQs limit={25} />
      </div>

    </section>
  );
}