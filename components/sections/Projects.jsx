import { Reveal, SectionHeader } from "../ui";
import projects from "../../data/projects";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const ProjectCard = ({ project }) => (
  <div className="card" style={{ padding: 32 }}>
    {/* Header row */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>
          {project.title}
        </h3>
        {project.category && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--text2)",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "3px 10px",
              letterSpacing: 0.5,
            }}
          >
            {project.category}
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {project.stack.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* Body */}
    <div className="grid-2" style={{ gap: 32, marginTop: 20 }}>
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--accent)",
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Problem
        </div>
        <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
          {project.problem}
        </p>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--accent3)",
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Solution
        </div>
        <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>{project.solution}</p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ marginTop: 16 }}>
            {project.highlights.map((h) => (
              <div
                key={h}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 6,
                  fontSize: 13,
                  color: "var(--text2)",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>▸</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
        <div
          style={{
            background: "var(--accent-glow)",
            borderRadius: 12,
            padding: 20,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--accent2)",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Impact
          </div>
          <p style={{ color: "var(--text)", fontSize: 15, fontWeight: 600, lineHeight: 1.6 }}>
            {project.outcome}
          </p>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ alignSelf: "flex-start", fontSize: 13 }}
          >
            View Project <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" style={{ background: "var(--bg2)" }}>
    <div className="section">
      <SectionHeader
        label="// Selected Work"
        title="Projects that shipped"
        titleStyle={{ marginBottom: 48 }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
