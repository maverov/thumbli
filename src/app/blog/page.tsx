import Link from "next/link";
import BackButton from "@/components/BackButton";
import { getAllPosts } from "@/data/blogposts";

export const metadata = {
  title: "Blog",
  description:
    "Explore the Thumbli Blog — tutorials, guides, and insights on getting YouTube, Twitch, Dailymotion, and Rumble thumbnails efficiently.",
  alternates: { canonical: "https://thumbli.net/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
      <section className="card green" aria-labelledby="blog-title">
        <h1 id="blog-title">Blog</h1>
        {posts.length === 0 && <p>No posts yet — check back soon!</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((p) => (
            <li key={p.slug} style={{ marginBottom: "1.25rem" }}>
              <h2 style={{ margin: "0 0 0.25rem" }}>
                <Link href={`/blog/${p.slug}`} style={{ textDecoration: "none", color: "#000" }}>
                  {p.title}
                </Link>
              </h2>
              <p style={{ margin: 0, opacity: 0.8 }}>
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {" · "}
                {p.tags.join(" • ")}
              </p>
              <p style={{ marginTop: "0.5rem" }}>{p.description}</p>
              <Link href={`/blog/${p.slug}`}>Read more →</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
    </main>
  );
}
