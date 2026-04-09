import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";

const SOCIAL_LINKS = [
  { icon: <GitHubIcon />, href: "https://github.com/kunal-kejriwal" },
  { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/kunal-kejriwal" },
  { icon: <MailIcon />, href: "mailto:kunal@kunalkejriwal.com" },
];

const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px" }}>
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <span style={{ color: "var(--accent)" }}>K</span> Kejriwal
      </Link>
      <div style={{ color: "var(--text3)", fontSize: 13 }}>
        © {new Date().getFullYear()} Kunal Kejriwal. Built with purpose.
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {SOCIAL_LINKS.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text3)", transition: "color 0.25s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
