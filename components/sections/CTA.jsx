"use client";

import { Reveal } from "../ui";
import { ArrowRight } from "../icons";
import { scrollToElement } from "../../utils/helpers";

const CTA = () => (
  <section style={{ position: "relative", overflow: "hidden" }}>
    <div
      className="hero-orb"
      style={{
        width: 350,
        height: 350,
        background: "var(--accent)",
        top: "-20%",
        right: "10%",
        opacity: 0.1,
      }}
    />
    <div className="section" style={{ textAlign: "center" }}>
      <Reveal>
        <div className="section-label">{"// Let's Work Together"}</div>
        <h2
          className="section-title"
          style={{ maxWidth: 700, margin: "0 auto 20px" }}
        >
          Looking to build scalable backends or high-quality technical content?
        </h2>
        <p
          style={{
            color: "var(--text2)",
            maxWidth: 500,
            margin: "0 auto 40px",
            lineHeight: 1.7,
            fontSize: 15,
          }}
        >
          Whether you need a robust API platform, a full-stack backend system, or SEO-optimized
          developer content — let&apos;s talk.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => scrollToElement("contact")}>
            Contact Me <ArrowRight />
          </button>
          <button className="btn-secondary" onClick={() => scrollToElement("projects")}>
            See My Work
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTA;
