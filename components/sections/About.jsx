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
              I&apos;m Kunal Kejriwal — a backend engineer specializing in building high-throughput, 
              distributed systems using Python (Django, FastAPI, DRF) and cloud-native architectures.
            </p>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
              At Deloitte, I architected asynchronous data pipelines processing 20M+ records/day, 
              built enterprise-grade search infrastructure on GCP, and improved API performance by 
              35% through deep backend optimizations. I work extensively with event-driven systems, 
              Celery-based task orchestration, and scalable REST APIs designed for real-world production loads.
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
