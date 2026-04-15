import { Reveal, SectionHeader } from "../ui";
import featuredWriting from "../../data/featuredWriting";

const ExternalArrow = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const PUBLICATION_COLORS = {
  "Unite.AI": "var(--accent2)",
  "getint.io": "var(--accent3)",
};

const FeaturedWriting = () => (
  <section id="writing" style={{ background: "var(--bg)" }}>
    <div className="section">
      <SectionHeader
        label="// Featured Writing"
        title="Published externally"
        description="Selected articles from Unite.AI and getint.io — covering AI/ML research, distributed systems, and developer tooling."
      />
      <div className="grid-3">
        {featuredWriting.map((article, i) => (
          <Reveal key={article.url} delay={i * 0.07}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block", height: "100%" }}
            >
              <div
                className="card"
                style={{
                  padding: 24,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  cursor: "pointer",
                  transition: "border-color 0.25s",
                }}
              >
                {/* Publication badge + date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: PUBLICATION_COLORS[article.publication] || "var(--accent)",
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      padding: "3px 10px",
                      letterSpacing: 0.5,
                    }}
                  >
                    {article.publication}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--text3)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "'Syne', sans-serif",
                      lineHeight: 1.4,
                      color: "var(--text)",
                      flex: 1,
                    }}
                  >
                    {article.title}
                  </h3>
                  <ExternalArrow />
                </div>

                {/* Summary */}
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text2)",
                    lineHeight: 1.7,
                  }}
                >
                  {article.summary}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Link to full Unite.AI profile */}
      <Reveal delay={0.3}>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a
            href="https://www.unite.ai/author/kunalkejriwal/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--accent2)",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            View all 100+ articles on Unite.AI <ExternalArrow />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default FeaturedWriting;
