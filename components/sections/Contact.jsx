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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/xgopbznn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      alert("Error submitting form.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" style={{ background: "var(--bg2)" }}>
      <div className="section">
        <div className="grid-2" style={{ gap: 48, alignItems: "start" }}>
          <Reveal>
            <div>
              <div className="section-label">{"// Contact"}</div>
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
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {success && (
                <p style={{ color: "var(--accent)", fontSize: 14 }}>
                  ✅ Message sent successfully!
                </p>
              )}
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange("name")}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />

              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange("message")}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "16px 28px",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Sending..." : "Send Message"} <ArrowRight />
            </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
