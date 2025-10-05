import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { getAllPosts, getPostBySlug } from "@/data/blogposts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `https://thumbli.com/blog/${post.slug}`;
  return {
    title: `${post.title} – Thumbli`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      tags: post.tags,
    },
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

  return (
    <main className="mainContainer">
      <section className="buttonContainer blogPost">
        <BackButton>Back to Blog</BackButton>
      </section>

      <article className="card green blogPost p3">
        <header>
          <h1 style={{ marginBottom: "1.4rem" }}>{post.title}</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>
            <span>Author: {post.author}</span>{" · "}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>{" · "}
            {post.tags.join(" • ")}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
          </p>
        </header>

        <hr style={{ margin: "1rem 0" }} />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              datePublished: post.date,
              dateModified: post.date,
              description: post.description,
              mainEntityOfPage: `https://thumbli.com/blog/${post.slug}`,
              author: { "@type": "Person", name: post.author },
              publisher: { "@type": "Organization", name: "Thumbli" },
            }),
          }}
        />
      </article>

      <section className="buttonContainer blogPost">
        <BackButton>Back to Blog</BackButton>
      </section>
    </main>
  );
}
