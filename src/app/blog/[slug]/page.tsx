import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { getAllPosts, getPostBySlug } from "@/data/blogposts";
import type { Metadata } from "next";
import styles from "./BlogPost.module.scss";

export const runtime = 'edge';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://thumbli.net/blog/${post.slug}`;
  const imageUrl = "https://i.imgur.com/A33XqhE.png";

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      siteName: "Thumbli",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const wordCount = post.html.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = post.readingMinutes || Math.ceil(wordCount / 200);

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thumbli.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://thumbli.net/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://thumbli.net/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: "https://i.imgur.com/A33XqhE.png",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://thumbli.net",
    },
    publisher: {
      "@type": "Organization",
      name: "Thumbli",
      logo: {
        "@type": "ImageObject",
        url: "https://thumbli.net/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thumbli.net/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    wordCount: wordCount,
    articleBody: post.html.replace(/<[^>]*>/g, ""),
  };

  return (
    <>
      <main className="mainContainer">
        <section className="buttonContainer">
          <BackButton>Back to Blog</BackButton>
        </section>

        <article className="card green p3" itemScope itemType="https://schema.org/BlogPosting">
          <header className={styles.header}>
            <h1 itemProp="headline" className={styles.title}>
              {post.title}
            </h1>

            <div className={styles.metadata}>
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
                className={styles.authorBadge}
              >
                <span itemProp="name">Author: {post.author}</span>
              </span>

              <time dateTime={post.date} itemProp="datePublished" className={styles.metaItem}>
                📅{" "}
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <span className={styles.metaItem}>⏱️ {readingTime} min read</span>
            </div>

            {post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} itemProp="keywords" className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className={styles.content}
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <meta itemProp="dateModified" content={post.date} />
          <meta itemProp="image" content="https://i.imgur.com/A33XqhE.png" />
        </article>

        {relatedPosts.length > 0 && (
          <section className="card green" aria-labelledby="related-posts">
            <div>
              <h2 id="related-posts" className={styles.relatedTitle}>
                Related Articles
              </h2>
              <ul className={styles.relatedList}>
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className={styles.relatedLink}>
                      <h3 className={styles.relatedPostTitle}>{p.title}</h3>
                      <p className={styles.relatedPostDescription}>{p.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="buttonContainer">
          <BackButton>Back to Blog</BackButton>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}