"use client";

import Link from "next/link";
import { Reveal } from "../../../components/ui";
import { ArrowLeft, ArrowRight } from "../../../components/icons";
import { CATEGORY_COLORS } from "../../../utils/theme";
import blogs from "../../../data/blogs";

const BlogPostClient = ({ slug }) => {
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div style={{ paddingTop: 128, textAlign: "center" }}>
        <div className="section">
          <h1 className="section-title">Post not found</h1>
          <p style={{ color: "var(--text2)", marginBottom: 32 }}>
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog" className="btn-primary" style={{ textDecoration: "none" }}>
            <ArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const renderContent = (content) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              marginTop: 40,
              marginBottom: 16,
              color: "var(--text)",
            }}
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={i}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              marginTop: 28,
              marginBottom: 12,
              color: "var(--text)",
            }}
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <p
            key={i}
            style={{
              color: "var(--text2)",
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 8,
              paddingLeft: 20,
            }}
          >
            {trimmed}
          </p>
        );
      }
      return (
        <p
          key={i}
          style={{
            color: "var(--text2)",
            fontSize: 15,
            lineHeight: 1.8,
            marginBottom: 12,
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div style={{ paddingTop: 96 }}>
      <div className="section" style={{ maxWidth: 780 }}>
        <Reveal>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--accent)",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 32,
              textDecoration: "none",
            }}
          >
            <ArrowLeft /> Back to Blog
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: CATEGORY_COLORS[blog.category] || "var(--accent)",
                padding: "5px 14px",
                borderRadius: 6,
                background: "var(--accent-glow)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {blog.category}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {blog.time} read
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            {blog.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            style={{
              fontSize: 17,
              color: "var(--text2)",
              lineHeight: 1.7,
              marginBottom: 40,
              paddingBottom: 32,
              borderBottom: "1px solid var(--border)",
            }}
          >
            {blog.summary}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <article>{renderContent(blog.content)}</article>
        </Reveal>

        {/* Nav between posts */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--text2)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
            >
              <ArrowLeft /> {prevPost.title}
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--text2)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                textAlign: "right",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
            >
              {nextPost.title} <ArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostClient;
