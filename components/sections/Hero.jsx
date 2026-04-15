"use client";

import { Reveal } from "../ui";
import { ArrowRight } from "../icons";
import { scrollToElement } from "../../utils/helpers";

const STATS = [
  ["3+", "Years Experience"],
  ["100+", "Articles Published"],
];

const Hero = () => {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 64,
      }}
    >
      <div
        className="hero-orb"
        style={{ width: 400, height: 400, background: "var(--accent)", top: "10%", left: "-5%", opacity: 0.12 }}
      />
      <div
        className="hero-orb"
        style={{ width: 300, height: 300, background: "var(--accent2)", top: "60%", right: "-5%", opacity: 0.1, animationDelay: "2s" }}
      />
      <div
        className="hero-orb"
        style={{ width: 200, height: 200, background: "var(--accent3)", bottom: "10%", left: "30%", opacity: 0.08, animationDelay: "4s" }}
      />

      <div className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent3)",
                animation: "pulse 2s infinite",
              }}
            />
            Available for freelance & collaboration
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 800,
              marginBottom: 24,
            }}
          >
            I build <span style={{ color: "var(--accent)" }}>scalable backends</span> & write content
            that <span style={{ color: "var(--accent2)" }}>ranks</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "var(--text2)",
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Backend developer and technical writer helping companies ship reliable systems and publish
            content that drives organic growth.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="hero-btns">
            <button className="btn-primary" onClick={() => scrollToElement("projects")}>
              View My Work <ArrowRight />
            </button>
            <button className="btn-secondary" onClick={() => scrollToElement("blog")}>
              Read Blog
            </button>
            <button className="btn-secondary" onClick={() => scrollToElement("contact")}>
              Hire Me
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div style={{ display: "flex", gap: 48, marginTop: 64, flexWrap: "wrap" }}>
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="stat-number">{n}</div>
                <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
