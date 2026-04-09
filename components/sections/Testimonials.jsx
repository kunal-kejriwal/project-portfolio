import { Reveal, SectionHeader } from "../ui";
import { QuoteIcon } from "../icons";
import testimonials from "../../data/testimonials";

const CATEGORIES = [
  { key: "AI & Technical Writing", label: "AI & Technical Writing", accent: "var(--accent2)" },
  { key: "Backend Engineering", label: "Backend Engineering", accent: "var(--accent)" },
];

const TestimonialCard = ({ t, delay, accentColor }) => (
  <Reveal delay={delay}>
    <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <QuoteIcon />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
            color: accentColor,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "3px 10px",
            letterSpacing: 0.5,
          }}
        >
          {t.category}
        </span>
      </div>
      <p
        style={{
          color: "var(--text2)",
          fontSize: 14,
          lineHeight: 1.75,
          flex: 1,
          marginBottom: 20,
          marginTop: 8,
        }}
      >
        "{t.text}"
      </p>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
        <div style={{ color: "var(--text3)", fontSize: 13 }}>{t.role}</div>
      </div>
    </div>
  </Reveal>
);

const Testimonials = () => {
  const backendTestimonials = testimonials.filter((t) => t.category === "Backend Engineering");
  const aiTestimonials = testimonials.filter((t) => t.category === "AI & Technical Writing");

  return (
    <div style={{ marginTop: 80 }}>
      <Reveal>
        <div className="section-label">// Testimonials</div>
        <h2 className="section-title">Trusted by engineers and AI leaders</h2>
        <p
          style={{
            color: "var(--text3)",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 0.5,
            marginBottom: 48,
            marginTop: -8,
          }}
        >
          Across distributed systems, backend engineering, and AI/ML communication
        </p>
      </Reveal>

      {/* Backend Engineering — 3 cards */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--accent)",
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          marginBottom: 16,
        }}
      >
        Backend Engineering · Deloitte
      </div>
      <div className="grid-3" style={{ marginBottom: 40 }}>
        {backendTestimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} delay={i * 0.1} accentColor="var(--accent)" />
        ))}
      </div>

      {/* AI & Technical Writing — 1 card, half-width centered */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--accent2)",
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          marginBottom: 16,
        }}
      >
        AI & Technical Writing · Unite.AI
      </div>
      <div style={{ maxWidth: 480 }}>
        {aiTestimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} delay={i * 0.1} accentColor="var(--accent2)" />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
