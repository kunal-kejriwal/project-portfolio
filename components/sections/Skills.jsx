import { Reveal, SectionHeader } from "../ui";
import skills from "../../data/skills";

const Skills = () => (
  <section id="skills">
    <div className="section">
      <SectionHeader
        label="// Skills & Expertise"
        title="Technical toolkit"
        titleStyle={{ marginBottom: 48 }}
      />
      <div className="grid-2">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.1}>
            <div className="card">
              <div
                style={{
                  width: 4,
                  height: 32,
                  background: group.accent,
                  borderRadius: 4,
                  position: "absolute",
                  top: 28,
                  left: 0,
                }}
              />
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 18,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {group.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
