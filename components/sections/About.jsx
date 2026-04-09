import { Reveal } from "../ui";

const About = () => (
  <section id="about" style={{ background: "var(--bg2)" }}>
    <div className="section">
      <div className="grid-2" style={{ alignItems: "center" }}>
        <Reveal>
          <div>
            <div className="section-label">{"// About"}</div>
            <h2 className="section-title">
              Engineer by trade.
              <br />
              Writer by craft.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
              I&apos;m Kunal Kejriwal — a backend developer who builds APIs and distributed systems in
              Java and Spring Boot, and a technical writer who turns complex architecture into clear,
              SEO-driven content.
            </p>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
              Over the past 3+ years, I&apos;ve worked with companies like Deloitte building
              enterprise-grade platforms, while simultaneously producing 50+ technical articles that
              have driven hundreds of thousands of organic impressions.
            </p>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: 15 }}>
              I operate at the intersection of building and explaining — designing systems that
              perform under pressure, and writing content that makes complex technology accessible
              and discoverable.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
