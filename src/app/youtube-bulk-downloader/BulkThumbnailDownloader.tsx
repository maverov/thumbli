"use client";

import { useState } from "react";
import { FAQs } from "@/components/FAQs";
import BackButton from "@/components/BackButton";
import styles from "../../components/ThumbnailWorkbench/ThumbnailWorkbench.module.scss";
import { getThumbnails, fetchRumbleThumbnail, detectPlatform } from "@/utils/videoHelper";
import { Thumbnail } from "@/types/video";

interface VideoWithThumbnails {
  url: string;
  thumbnails: Thumbnail[];
  error?: string;
}

const BulkThumbnailDownloader = () => {
  const [urls, setUrls] = useState('');
  const [videos, setVideos] = useState<VideoWithThumbnails[]>([]);
  const [processing, setProcessing] = useState(false);

  // Smart URL parser that handles newlines, commas, and spaces
  const parseUrls = (input: string): string[] => {
    return input
      .split(/[\n,\s]+/) // Split by newlines, commas, or spaces
      .map(u => u.trim())
      .filter(u => {
        // Filter out empty strings and common non-URL words
        if (!u || u.length < 10) return false;
        // Must contain http:// or https://
        return u.startsWith('http://') || u.startsWith('https://');
      });
  };

  const handleProcess = async () => {
    setProcessing(true);
    setVideos([]);

    const urlList = parseUrls(urls);

    if (urlList.length === 0) {
      setProcessing(false);
      return;
    }

    const results: VideoWithThumbnails[] = [];

    for (const videoUrl of urlList) {
      try {
        new URL(videoUrl);
      } catch {
        results.push({
          url: videoUrl,
          thumbnails: [],
          error: 'Invalid URL'
        });
        continue;
      }

      const platform = detectPlatform(videoUrl);
      
      if (!platform) {
        results.push({
          url: videoUrl,
          thumbnails: [],
          error: 'Platform not supported'
        });
        continue;
      }

      if (platform === "Rumble") {
        const thumbnail = await fetchRumbleThumbnail(videoUrl);
        results.push({
          url: videoUrl,
          thumbnails: thumbnail ? [{
            name: "rumble-thumbnail",
            url: thumbnail,
            platform: "Rumble",
          }] : [],
          error: thumbnail ? undefined : 'Failed to fetch thumbnail'
        });
      } else {
        const thumbs = getThumbnails(videoUrl);
        results.push({
          url: videoUrl,
          thumbnails: thumbs,
          error: thumbs.length === 0 ? 'No thumbnails found' : undefined
        });
      }
    }

    setVideos(results);
    setProcessing(false);
  };

  const handleDownloadAll = async () => {
    const allThumbnails = videos.flatMap(v => v.thumbnails);
    
    for (const thumb of allThumbnails) {
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

        await new Promise((r) => setTimeout(r, 200));
      } catch (err) {
        console.warn(`⚠️ Could not download ${thumb.name}`, err);
        window.open(thumb.url, "_blank", "noopener,noreferrer");
      }
    }
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

  const totalThumbnails = videos.reduce((sum, v) => sum + v.thumbnails.length, 0);
  const detectedUrls = parseUrls(urls);

  return (
    <section className={`${styles.workbench} ${styles.mainContainer}`} aria-labelledby="bulk-title">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
      
      <section className={`${styles.card} ${styles.green}`} aria-labelledby="url-title">
        <h2 id="url-title" className={styles.cardTitle}>Paste YouTube video links 👇</h2>

        <div className={styles.inlineRow}>
          <textarea
            id="video-urls"
            className={styles.input}
            placeholder="Paste YouTube URLs separated by newlines, commas, or spaces:&#10;https://www.youtube.com/watch?v=... https://www.youtube.com/watch?v=...&#10;https://youtube.com/shorts/..., https://youtu.be/..."
            aria-describedby="url-help"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={6}
            style={{ resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>

        <p id="url-help" className={styles.helpText}>
          Smart parser: Paste YouTube URLs any way you like - separated by new lines, commas, or spaces. Works with all YouTube URL formats.
        </p>

        {detectedUrls.length > 0 && (
          <p className={styles.helpText} style={{ color: '#4ade80', marginTop: '0.5rem' }}>
            ✓ Detected {detectedUrls.length} URL{detectedUrls.length !== 1 ? 's' : ''}
          </p>
        )}

        <div className={styles.mt2}>
          <button
            onClick={handleProcess}
            disabled={processing || detectedUrls.length === 0}
            className="actionLink"
          >
            {processing ? 'Processing...' : `Fetch Thumbnails${detectedUrls.length > 0 ? ` (${detectedUrls.length})` : ''}`}
          </button>
        </div>
      </section>

      {videos.length > 0 && totalThumbnails > 0 && (
        <div className={styles.thumbnailCaption}>
          <p>🎉 Found {totalThumbnails} thumbnails from {videos.length} videos!</p>
          <button 
            className={`${styles.downloadBtn} ${styles.mt1}`}
            onClick={handleDownloadAll}
          >
            Download All ({totalThumbnails} images)
          </button>
        </div>
      )}

      {videos.map((video, videoIdx) => (
        <div key={videoIdx} className={`${styles.card} ${video.error ? styles.orange : styles.green} ${styles.mt2}`}>
          <h3 className={styles.cardTitle}>
            Video {videoIdx + 1}
          </h3>
          <p className={styles.helpText} style={{ wordBreak: 'break-all', marginBottom: '1rem' }}>
            {video.url}
          </p>

          {video.error && (
            <span className={styles.errorText}>{video.error}</span>
          )}

          {video.thumbnails.length > 0 && (
            <div className={styles.thumbnailGrid}>
              {video.thumbnails.map((thumb) => (
                <div key={thumb.name} className={styles.thumbnailWrapper}>
                  <img 
                    src={thumb.url} 
                    alt={`Thumbnail: ${thumb.name}`} 
                    className={styles.thumbnailImage}
                    style={{ maxWidth: '900px' }}
                    onClick={() => handleDownload(thumb.url, thumb.name)}
                  />
                  <div className={styles.thumbnailInfo}>
                    <span className={styles.thumbnailSize}>
                      {getThumbnailSize(thumb.name)}
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
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className={`${styles.card} ${styles.green} ${styles.mt2}`}>
        <FAQs limit={25} />
      </div>
    </section>
  );
};

export default BulkThumbnailDownloader;