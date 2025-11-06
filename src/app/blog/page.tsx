import Link from "next/link";
import BackButton from "@/components/BackButton";
import { getAllPosts } from "@/data/blogposts";

export const metadata = {
  title: "Blog",
  description:
    "Explore the Thumbli Blog — tutorials, guides, and insights on getting YouTube, Twitch, Dailymotion, and Rumble thumbnails efficiently.",
  alternates: { canonical: "https://thumbli.net/blog" },
};

const POSTS_PER_PAGE = 10;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const allPosts = getAllPosts();
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <main className="mainContainer">
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
      <section className="card green" aria-labelledby="blog-title">
        <h1 id="blog-title">Blog</h1>
        {allPosts.length === 0 && <p>No posts yet — check back soon!</p>}

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

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            {currentPage > 1 && (
              <Link
                href={`/blog${currentPage === 2 ? "" : `?page=${currentPage - 1}`}`}
                style={{
                  padding: "0.5rem 1rem",
                  textDecoration: "none",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "#000",
                }}
              >
                ← Previous
              </Link>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/blog${page === 1 ? "" : `?page=${page}`}`}
                style={{
                  padding: "0.5rem 1rem",
                  textDecoration: "none",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: page === currentPage ? "#000" : "transparent",
                  color: page === currentPage ? "#fff" : "#000",
                  fontWeight: page === currentPage ? "bold" : "normal",
                }}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            ))}
            
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                style={{
                  padding: "0.5rem 1rem",
                  textDecoration: "none",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "#000",
                }}
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </section>
      <section className="buttonContainer">
        <BackButton>Back</BackButton>
      </section>
    </main>
  );
}