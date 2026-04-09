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
          <div
            className="card"
            style={{ display: "flex", gap: 24, alignItems: "start", flexWrap: "wrap" }}
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
                {exp.company}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "var(--accent)",
                }}
              >
                {exp.period}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{exp.role}</div>
              <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>
                {exp.description}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export default Experience;
