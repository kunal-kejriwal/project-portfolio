"use client";

import { useState } from "react";
import { Reveal } from "../ui";
import { ArrowRight, MailIcon, LinkedInIcon, GitHubIcon, ExternalLink } from "../icons";

const CONTACT_LINKS = [
  { icon: <MailIcon />, label: "kunal@kunalkejriwal.com", href: "mailto:kunal@kunalkejriwal.com" },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/in/kunal-kejriwal" },
  { icon: <GitHubIcon />, label: "GitHub", href: "https://github.com/kunal-kejriwal" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <section id="contact" style={{ background: "var(--bg2)" }}>
      <div className="section">
        <div className="grid-2" style={{ gap: 48, alignItems: "start" }}>
          <Reveal>
            <div>
              <div className="section-label">// Contact</div>
              <h2 className="section-title">Get in touch</h2>
              <p
                style={{
                  color: "var(--text2)",
                  lineHeight: 1.7,
                  marginBottom: 36,
                  fontSize: 15,
                }}
              >
                Have a project in mind or want to discuss a collaboration? Drop me a message — I
                typically respond within 24 hours.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      color: "var(--text2)",
                      fontSize: 15,
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text2)")}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    <ExternalLink />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange("name")}
              />
              <input
                placeholder="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              <textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange("message")}
              />
              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "16px 28px" }}
              >
                Send Message <ArrowRight />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
