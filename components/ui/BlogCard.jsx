"use client";

import Link from "next/link";
import { ArrowRight } from "../icons";
import { CATEGORY_COLORS } from "../../utils/theme";
import Reveal from "./Reveal";

const BlogCard = ({ blog, index = 0 }) => (
  <Reveal delay={index * 0.08}>
    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: CATEGORY_COLORS[blog.category] || "var(--accent)",
              padding: "4px 10px",
              borderRadius: 4,
              background: "var(--accent-glow)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {blog.category}
          </span>
          <span
            style={{
              fontSize: 12,
              color: "var(--text3)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {blog.time} read
          </span>
        </div>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: 10,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {blog.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "var(--text2)",
            lineHeight: 1.65,
            flex: 1,
            marginBottom: 18,
          }}
        >
          {blog.summary}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "var(--accent)",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Read Article <ArrowRight />
        </div>
      </div>
    </Link>
  </Reveal>
);

export default BlogCard;
