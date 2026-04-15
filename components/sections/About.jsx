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
              I&apos;m a backend engineer at Deloitte building async data pipelines that process 20M+ records/day on GCP,
              with a 35% API latency improvement shipped through N+1 elimination and algorithmic refactoring.
              My stack is Python — Django, FastAPI, DRF — with Celery, Redis, PostgreSQL, and Cloud Run for the infrastructure layer.
            </p>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
              Outside of Deloitte, I&apos;ve published 100+ technical articles at Unite.AI covering LLMs, multimodal models,
              and AI infrastructure — and I maintain two open-source backend tools, APIEngine and MeshEngine,
              both built to production standards with observability, automated tests, and real deployment pipelines.
            </p>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: 15 }}>
              I care about systems that are observable, maintainable, and documented well enough
              that the next engineer doesn&apos;t have to guess. If you need backend depth
              and the communication skills to match — that&apos;s the combination I bring.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
