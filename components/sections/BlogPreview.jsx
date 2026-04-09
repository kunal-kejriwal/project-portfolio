"use client";

import { useState } from "react";
import { Reveal, SectionHeader, BlogCard } from "../ui";
import blogs from "../../data/blogs";
import { BLOG_CATEGORIES } from "../../utils/theme";

const BlogPreview = () => {
  const [activeBlogFilter, setActiveBlogFilter] = useState("All");

  const filteredBlogs =
    activeBlogFilter === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeBlogFilter);

  return (
    <section id="blog">
      <div className="section">
        <SectionHeader
          label="// Blog"
          title="Technical writing that ranks"
          description="Deep dives into backend engineering, system design, AI, and developer tooling — written for practitioners, optimized for search."
        />
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-tag ${activeBlogFilter === cat ? "active" : ""}`}
                onClick={() => setActiveBlogFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid-3">
          {filteredBlogs.map((b, i) => (
            <BlogCard key={b.slug} blog={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
