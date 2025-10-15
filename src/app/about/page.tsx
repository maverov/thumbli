import "../globals.scss";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { FAQs } from "@/components/FAQs";

export const metadata = {
  title: "About",
  description:
    "Learn about Thumbli — a free online tool to get YouTube, Twitch, and Dailymotion thumbnails easily. Created by Hristiyan from Bulgaria, built for simplicity, privacy, and speed.",
  alternates: { canonical: "https://thumbli.net/about" },
};

export default function AboutPage() {
  return (
    <main id="about-top" className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
      <section className={`card green`}>
        <section aria-labelledby="about-title">
          <h1 id="about-title">About Thumbli</h1>
          <p>
            Thumbli is a free tool to <strong>get YouTube thumbnails</strong> (including{" "}
            <strong>YouTube Shorts thumbnails</strong>) and <strong>grab video thumbnails</strong> from{" "}
            Twitch (Live &amp; Clips), Dailymotion, BitChute,{" "}
            Streamable, and Rumble.
          </p>
          <p>
            Paste a link, and we’ll show <strong>every available size and variant</strong> in one place — from small
            previews to full-HD max-res — ready to preview, download, or{" "}
            copy the URL.
          </p>
        </section>

        <section aria-labelledby="why-title">
          <h2 id="why-title">Why Thumbli?</h2>
          <ul>
            <li>
              <strong>Multi-platform:</strong> YouTube, Shorts, Twitch (Live &amp; Clips), Dailymotion, BitChute,
              Streamable, Rumble.
            </li>
            <li>
              <strong>More thumbnail options:</strong> Thumbli shows every available size, from small previews to full-resolution images.
            </li>
            <li>
              <strong>Do it your way:</strong> Download one, multi-download all, or just{" "}
              copy the direct image link.
            </li>
            <li>
              <strong>Fast, free, no fluff:</strong> A simple tool that does one thing well.
            </li>
          </ul>
        </section>

        <section aria-labelledby="how-title">
          <h2 id="how-title">How it works</h2>
          <ol>
            <li>Paste a full video URL.</li>
            <li>We detect the platform and list all thumbnails and sizes we can find.</li>
            <li>Click to download or copy URL — done.</li>
          </ol>
        </section>

        <section aria-labelledby="privacy-title">
          <h2 id="privacy-title">Privacy &amp; cookies</h2>
          <p>
            Thumbli doesn’t ask for an account and <strong>doesn’t store your links or images</strong>. We also{" "}
            <strong>don’t set our own cookies</strong>. If ads are shown, the ad network may use its own cookies — see our{" "}
            <Link href="/privacy">Privacy Policy</Link> for details.
          </p>
        </section>
      </section>
      <section className={`card orange`}>
        <section aria-labelledby="ads-title">
          <h2 id="ads-title">Ads (and a tiny favor) 🙏</h2>
          <p>
            This site uses <strong>Google AdSense</strong> to keep it free. We don’t do pop-ups, forced clicks, or any
            sneaky stuff.
          </p>
          <p>
            If Thumbli helps you, please consider whitelisting the site in your ad blocker — totally
            optional, always appreciated. 💚
          </p>
        </section>
      </section>
      <div className={`card green`}>
        <FAQs />
      </div>
      <section className={`card orange`} aria-labelledby="changelog-title">
        <h2 id="changelog-title">Changelog / Updates</h2>
        <ul>
          <li><strong>October 2025:</strong> Added Rumble support and multi-download improvements.</li>
          <li><strong>September 2025:</strong> Better YouTube Shorts detection and size coverage.</li>
          <li><strong>August 2025:</strong> Multi-download all thumbnails.</li>
          <li><strong>July 2025:</strong> Copy thumbnail URL button.</li>
          <li><strong>June 2025:</strong> Initial launch with YouTube, Twitch, Dailymotion support.</li>
        </ul>
        <p style={{ marginTop: "0.75rem" }}>
          Want something added? <Link href="/contact">Tell me here</Link>.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does Thumbli work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Paste a full video URL and Thumblee detects the platform, fetches all available thumbnails, and lets you preview, download, or copy the image URL."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which platforms are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "YouTube (including Shorts), Twitch (Live and Clips), Dailymotion, BitChute, Streamable, and Rumble."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Thumbli free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, it’s free to use. No accounts, no paywalls."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you store my links or images?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Everything runs in your browser. We do not store your URLs or thumbnails."
                  }
                }
              ]
            }
          ),
        }}
      />
    </main>
  );
}
