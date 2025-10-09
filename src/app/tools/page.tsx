import "../globals.scss";
import styles from "../../components/FAQs/FAQs.module.scss";

import Link from "next/link";
import BackButton from "@/components/BackButton";

const OTHER_TOOLS = [
    { name: 'IMDb Photo & Media Downloader', description: 'Extract and download high-quality movie posters and photos from IMDb instantly without an account', link: '/imdb-media-downloader' },
    { name: 'YouTube Bulk Thumbnail Downloader', description: 'Paste YouTube video links in bulk and instantly grab all their thumbnails so you can view or download them easily', link: '/youtube-bulk-downloader' },
];

export const metadata = {
  title: "Other Tools",
  description: "Thumbli offers a variety of free web tools for downloading and extracting media from popular platforms. Access IMDb photo downloaders, YouTube thumbnail extractors, and more useful utilities without registration.",
  keywords: "imdb media downloader, imdb photo download, imdb image scraper, youtube thumbnail bulk download, download thumbnails of multiple youtube videos",
  openGraph: {
    title: "Other Tools by Thumbli",
    description: "Thumbli offers a variety of free web tools for downloading and extracting media from popular platforms.",
    url: "https://thumbli.net/tools",
    type: "website",
  },
  alternates: { canonical: "https://thumbli.net/tools" },
};

export default function ToolsPage() {
  return (
    <main className="mainContainer">
        <section className="buttonContainer">
            <BackButton>Back</BackButton>
        </section>
        <section className="card green" aria-labelledby="tools-title">
            <h2 id="tools-title">Free Web Tools & Utilities</h2>
            <ul className={styles.faqList}>
                {OTHER_TOOLS.map((tool) => (
                    <li key={tool.name} className={styles.faqItem}>
                        <Link href={tool.link}>{tool.name}</Link> { tool.description ? `— ${tool.description}` : '' }
                    </li>
                ))}
            </ul>
        </section>
    </main>
  );
}