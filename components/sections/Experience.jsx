import { Reveal, SectionHeader } from "../ui";
import experience from "../../data/experience";

const Experience = () => (
  <div>
    <SectionHeader
      label="// Experience"
      title="Where I've worked"
      titleStyle={{ marginBottom: 48 }}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {experience.map((exp, i) => (
        <Reveal key={exp.company} delay={i * 0.1}>
          <div className="card" style={{ padding: 32 }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "start",
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              <div style={{ flex: "0 0 auto", minWidth: 160 }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 4,
                  }}
                >
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    exp.company
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--accent)",
                    marginBottom: 2,
                  }}
                >
                  {exp.period}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text3)",
                  }}
                >
                  {exp.location}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>{exp.role}</div>
                <p style={{ color: "var(--text2)", fontSize: 13, lineHeight: 1.6, marginBottom: exp.bullets?.length ? 16 : 0 }}>
                  {exp.context}
                </p>

                {exp.bullets && exp.bullets.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.bullets.map((b, j) => {
                      const colonIdx = b.indexOf(":");
                      const hasLabel = colonIdx > -1 && colonIdx < 40;
                      return (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            gap: 10,
                            fontSize: 13,
                            color: "var(--text2)",
                            lineHeight: 1.65,
                          }}
                        >
                          <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }}>▸</span>
                          <span>
                            {hasLabel ? (
                              <>
                                <span style={{ fontWeight: 600, color: "var(--text)" }}>
                                  {b.slice(0, colonIdx + 1)}
                                </span>
                                {b.slice(colonIdx + 1)}
                              </>
                            ) : (
                              b
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export default Experience;
