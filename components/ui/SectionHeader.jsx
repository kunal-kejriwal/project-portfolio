import Reveal from "./Reveal";

const SectionHeader = ({ label, title, description, titleStyle = {}, delay = 0 }) => (
  <Reveal delay={delay}>
    <div className="section-label">{label}</div>
    <h2 className="section-title" style={titleStyle}>
      {title}
    </h2>
    {description && (
      <p
        style={{
          color: "var(--text2)",
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 32,
          fontSize: 15,
        }}
      >
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeader;
