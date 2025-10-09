'use client';

import "../globals.scss";
import styles from "../../components/ThumbnailWorkbench/ThumbnailWorkbench.module.scss";

import { useState, memo } from 'react';
import BackButton from "@/components/BackButton";


// CORS Proxy Configuration
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-anywhere.herokuapp.com/',
  'https://thingproxy.freeboard.io/fetch/',
  'https://yacdn.org/proxy/',
  'https://api.allorigins.win/get?url=',
  'https://crossorigin.me/',
  'https://cors-proxy.htmldriven.com/?url=',
  'https://proxy.cors.sh/',
];

// Test all proxies to check availability
async function testProxies(): Promise<{ proxy: string; working: boolean }[]> {
  const testUrl = 'https://www.imdb.com';
  const results = await Promise.all(
    CORS_PROXIES.map(async (proxy) => {
      try {
        const url = proxy + encodeURIComponent(testUrl);
        const response = await fetch(url, { 
          method: 'HEAD', 
          signal: AbortSignal.timeout(5000),
          headers: {
            'Accept': '*/*',
          }
        });
        return { proxy, working: response.ok };
      } catch {
        return { proxy, working: false };
      }
    })
  );
  return results;
}

const extractImdbId = (imdbUrl: string): string | null => {
  // Try to extract from /title/tt... format
  let match = imdbUrl.match(/title\/(tt\d+)/);
  if (match) return match[1];
  
  // Try to extract from playlistId parameter (video URLs)
  match = imdbUrl.match(/playlistId=(tt\d+)/);
  if (match) return match[1];
  
  // Try to extract if just the ID is pasted
  match = imdbUrl.match(/^(tt\d+)$/);
  if (match) return match[1];
  
  return null;
};

const extractMediaViewerId = (imdbUrl: string): string | null => {
  // Extract mediaviewer ID like rm2018032130
  const match = imdbUrl.match(/mediaviewer\/(rm\d+)/);
  return match ? match[1] : null;
};

const FAQ_ITEMS = [
  {
    q: 'What IMDb URL format should I use?',
    a: 'Use the main movie/TV show page URL like https://www.imdb.com/title/tt9362736/ - You can also paste video URLs (e.g., https://www.imdb.com/video/vi1483982873/?playlistId=tt9362736) or just the movie ID (e.g., tt9362736). The tool will extract the movie ID automatically.',
  },
  {
    q: 'Is this IMDb image scraper free to use?',
    a: 'Yes, this tool is completely free. You can download as many images as you need from any IMDb title without any charges or limitations.',
  },
  {
    q: 'Do I need an IMDb account to download images?',
    a: 'No, you don&apos;t need an IMDb account. Simply paste the movie or TV show URL and the tool will extract all available images.',
  },
  {
    q: 'How many images can I download from a single movie?',
    a: 'The tool fetches ALL images from the movie&apos;s media gallery. This can range from a few dozen to several hundred images depending on the title.',
  },
  {
    q: 'What image quality will I get?',
    a: 'The tool automatically converts thumbnail images to their full-size versions, giving you the highest quality images available on IMDb.',
  },
  {
    q: 'Can I download images from TV shows?',
    a: 'Yes, the tool works with both movies and TV shows. Any IMDb title with a media gallery can be scraped.',
  },
  {
    q: 'Why does it say "trying multiple proxies"?',
    a: 'IMDb blocks direct scraping, so we use multiple CORS proxy servers to fetch the content. The tool automatically tries different proxies until one works.',
  },
  {
    q: 'Are the downloaded images legal to use?',
    a: 'The images remain property of their copyright holders. This tool is for personal use, research, or educational purposes. Commercial use requires proper licensing.',
  },
  {
    q: 'What happens if no images are found?',
    a: 'Some IMDb titles may not have public media galleries. Make sure you&apos;re using a direct title URL and that the title has uploaded images in its media index.',
  },
  {
    q: 'Can I download posters and promotional images?',
    a: 'Yes, the tool extracts all images from the IMDb media index, including posters, stills, promotional photos, and behind-the-scenes images.',
  },
  {
    q: 'How long does it take to fetch images?',
    a: 'Usually 5-15 seconds depending on proxy availability and the number of images. The tool tries multiple proxies sequentially for reliability.',
  },
  {
    q: 'Does this work on mobile devices?',
    a: 'Yes, the tool is fully responsive and works on phones, tablets, and desktop computers.',
  },
  {
    q: 'Can I bulk download images from multiple movies?',
    a: 'Currently, the tool processes one movie at a time. You need to enter each URL separately.',
  },
  {
    q: 'Is my data or search history stored?',
    a: 'No, all processing happens in your browser. We don&apos;t store any URLs, images, or user data on our servers.',
  },
  {
    q: 'What if all proxies fail?',
    a: 'This is rare but can happen if all proxy services are down. Try again in a few minutes, or check if the IMDb URL is correct.',
  },
];

const HowItWorks = memo(() => (
  <div className={`${styles.card} ${styles.green} ${styles.mt2}`}>
    <h1 className={styles.cardTitle}>How It Works</h1>
    <ol>
      <li>Find any movie or TV show on IMDb (e.g., https://www.imdb.com/title/tt9362736/)</li>
      <li>Copy the full URL from your browser&apos;s address bar</li>
      <li>Paste the URL into the input field above</li>
      <li>Click &quot;Fetch Images&quot; and wait while the tool extracts all available photos</li>
      <li>Browse the image gallery and click any image to view or download it in full resolution</li>
    </ol>
  </div>
));
HowItWorks.displayName = 'HowItWorks';

const BehindTheScenes = memo(() => (
  <div className={`${styles.card} ${styles.orange} ${styles.mt2}`}>
    <h1 className={styles.cardTitle}>Behind The Scenes</h1>
    <p className={styles.helpText}>
      IMDb hosts movie images on Amazon&apos;s content delivery network (CDN). Each image has a unique URL 
      with various size parameters (like _V1_UX200_CR0,0,200,300_). This tool extracts these URLs 
      from IMDb&apos;s media viewer and converts them to full-resolution versions by removing size constraints.
    </p>
    <p className={`${styles.helpText} ${styles.mt1}`}>
      Since IMDb prevents direct scraping through CORS (Cross-Origin Resource Sharing) policies, 
      we use multiple proxy servers that act as intermediaries. When you submit a URL, the tool 
      automatically tries different proxies until it finds one that&apos;s available, fetches the HTML 
      content, parses it to find image URLs, and displays them for you to download.
    </p>
    <p className={`${styles.helpText} ${styles.mt1}`}>
      All processing happens in your browser - no data is sent to external servers except through 
      the proxy to fetch IMDb&apos;s public content. The tool uses the DOMParser API to extract image 
      elements and regex patterns to identify and upgrade image URLs to their highest quality versions.
    </p>
  </div>
));
BehindTheScenes.displayName = 'BehindTheScenes';

const FAQ = memo(() => (
  <div className={`${styles.card} ${styles.green} ${styles.mt2}`}>
    <h1 className={styles.cardTitle}>Frequently Asked Questions</h1>
    {FAQ_ITEMS.map((item, idx) => (
      <div key={idx} className={idx > 0 ? styles.mt2 : ''}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.q}</p>
        <p className={styles.helpText}>{item.a}</p>
      </div>
    ))}
  </div>
));
FAQ.displayName = 'FAQ';

const ImageCard = memo(({ img, idx }: { img: string; idx: number }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(img);
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(img);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `imdb-image-${idx + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(img, '_blank');
    }
  };

  return (
    <div className={styles.thumbnailWrapper}>
      <img
        src={img}
        alt={`Movie image ${idx + 1}`}
        className={styles.thumbnailImage}
        onClick={() => window.open(img, '_blank')}
        loading="lazy"
        crossOrigin="anonymous"
      />
      <div className={styles.thumbnailInfo}>
        <span className={styles.thumbnailSize}>Image {idx + 1}</span>
        <div>
          <button
            className={styles.downloadBtn}
            style={{ marginRight: "1rem" }}
            onClick={copyLink}
          >
            Copy Link
          </button>
          <button
            className={styles.downloadBtn}
            onClick={downloadImage}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
});
ImageCard.displayName = 'ImageCard';

export default function IMDBMediaDownloader() {
  const [url, setUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  const fetchImages = async () => {
    setLoading(true);
    setError('');
    setImages([]);
    setLoadingMessage('Fetching images...');

    const mediaViewerId = extractMediaViewerId(url);

    // Handle mediaviewer links separately
    if (mediaViewerId) {
      const mediaViewerUrl = url.includes('http') ? url : `https://www.imdb.com/title/${mediaViewerId}/mediaviewer/${mediaViewerId}/`;
      let html = '';
      let proxyIndex = 0;

      for (const proxy of CORS_PROXIES) {
        try {
          proxyIndex++;
          setLoadingMessage(`Trying proxy ${proxyIndex} of ${CORS_PROXIES.length}...`);
          
          const proxyUrl = proxy + encodeURIComponent(mediaViewerUrl);
          const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });
          
          if (response.ok) {
            const text = await response.text();
            html = proxy.includes('allorigins.win/get') ? JSON.parse(text).contents : text;
            if (html && html.length > 1000) break;
          }
        } catch { continue; }
      }

      if (html && html.length > 1000) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imageUrls: string[] = [];
        
        doc.querySelectorAll('img[src*="media-amazon.com"]').forEach((img) => {
          const src = img.getAttribute('srcset')?.split(',').pop()?.trim().split(' ')[0] || img.getAttribute('src');
          if (src?.includes('_V1_')) {
            const fullSizeUrl = src.replace(/\._V1_[^.]*\.(jpg|jpeg|png)/i, '._V1_UX1200_.$1');
            if (!imageUrls.includes(fullSizeUrl)) imageUrls.push(fullSizeUrl);
          }
        });

        if (imageUrls.length > 0) {
          setImages(imageUrls);
          setLoadingMessage('');
          setLoading(false);
          return;
        }
      }
    }

    try {
      const imdbId = extractImdbId(url);
      if (!imdbId) {
        throw new Error('Invalid IMDb URL. Please use a format like: https://www.imdb.com/title/tt9362736/');
      }

      const photosUrl = `https://www.imdb.com/title/${imdbId}/mediaindex/`;
      let html = '';
      let proxyIndex = 0;

      for (const proxy of CORS_PROXIES) {
        try {
          proxyIndex++;
          setLoadingMessage(`Trying proxy ${proxyIndex} of ${CORS_PROXIES.length}...`);
          
          const proxyUrl = proxy + encodeURIComponent(photosUrl);
          const response = await fetch(proxyUrl, { 
            signal: AbortSignal.timeout(15000),
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml',
              'Accept-Language': 'en-US,en;q=0.9',
            }
          });
          
          if (response.ok) {
            const text = await response.text();
            
            if (proxy.includes('allorigins.win') && text.startsWith('{')) {
              try {
                const json = JSON.parse(text);
                html = json.contents;
              } catch {
                html = text;
              }
            } else {
              html = text;
            }
            
            if (html && html.length > 1000) {
              setLoadingMessage('Processing images...');
              break;
            }
          }
        } catch (err) {
          console.log(`Proxy ${proxyIndex} failed:`, err);
          continue;
        }
      }

      if (!html || html.length < 1000) {
        throw new Error('All proxies failed. Please try again later.');
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const imageUrls: string[] = [];
      
      // Method 1: Find all links to mediaviewer
      const mediaViewerLinks = doc.querySelectorAll('a[href*="/mediaviewer/"]');
      
      mediaViewerLinks.forEach((link) => {
        const img = link.querySelector('img');
        if (img) {
          // Get srcset attribute which contains higher resolution versions
          const srcset = img.getAttribute('srcset');
          const src = img.getAttribute('src');
          
          let bestUrl = '';
          
          if (srcset) {
            // Parse srcset: "url1, url2 1.5x, url3 2x"
            const sources = srcset.split(',').map(s => s.trim());
            // Get the highest resolution (2x version, which is usually the last one)
            const highestResSource = sources[sources.length - 1];
            bestUrl = highestResSource.split(' ')[0];
          } else if (src) {
            bestUrl = src;
          }
          
          if (bestUrl && bestUrl.includes('media-amazon.com')) {
            // Remove all size/quality parameters to get full resolution
            // Pattern: ._V1_QL75_UX414_.jpg -> ._V1_.jpg
            const fullSizeUrl = bestUrl.replace(/\._V1_[^.]*\.(jpg|jpeg|png)/i, '._V1_UX1200_.$1');
            
            if (!imageUrls.includes(fullSizeUrl)) {
              imageUrls.push(fullSizeUrl);
            }
          }
        }
      });
      
      // Method 2: Direct image search as fallback
      if (imageUrls.length < 5) {
        const allImages = doc.querySelectorAll('img[src*="media-amazon.com"]');
        allImages.forEach((img) => {
          const src = img.getAttribute('src');
          if (src && src.includes('_V1_')) {
            const fullSizeUrl = src.replace(/\._V1_[^.]*\.(jpg|jpeg|png)/i, '._V1_UX1200_.$1');
            if (!imageUrls.includes(fullSizeUrl)) {
              imageUrls.push(fullSizeUrl);
            }
          }
        });
      }

      if (imageUrls.length === 0) {
        throw new Error('No images found. Make sure the movie has a media gallery with photos.');
      }

      console.log(`Found ${imageUrls.length} images`);
      setImages(imageUrls);
      setLoadingMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      setLoadingMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>

      <div className={`${styles.card} ${styles.green}`}>
        <p className={`${styles.helpText} ${styles.mb2}`}>
          This free IMDb image scraper allows you to extract and download all available photos, stills, 
          and promotional images from any movie or TV show on IMDb. Simply paste an IMDb URL, and the 
          tool will automatically fetch high-quality images from the title&apos;s media gallery. Perfect for 
          film enthusiasts, researchers, designers, and anyone who needs access to movie photography.
        </p>
        <div className={`${styles.inlineRow}`}>
          <label className={styles.inlineLabel}>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.imdb.com/title/tt9362736/"
            className={styles.input}
            onKeyPress={(e) => e.key === 'Enter' && fetchImages()}
          />
        </div>
        <p className={styles.helpText}>Paste any IMDb URL format: movie page, video URL, or just the movie ID (e.g., tt9362736)</p>

        <div className={styles.mt2}>
          <button
            onClick={fetchImages}
            disabled={loading || !url}
            className="actionLink"
          >
            {loading ? 'Loading...' : 'Fetch Images'}
          </button>
        </div>

        {loading && loadingMessage && (
          <p className={`${styles.helpText} ${styles.mt1}`}>
            <strong>{loadingMessage}</strong>
          </p>
        )}

        {error && (
          <span className={styles.errorText}>{error}</span>
        )}
      </div>

      {images.length > 0 && (
        <>
          <h1 className={`${styles.cardTitle} ${styles.mt2}`}>Found {images.length} images</h1>
          <div className={styles.thumbnailGrid}>
            {images.map((img, idx) => (
              <ImageCard key={idx} img={img} idx={idx} />
            ))}
          </div>
        </>
      )}

      <HowItWorks />
      <BehindTheScenes />
      <FAQ />
    </main>
  );
}