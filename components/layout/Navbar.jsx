"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Sun, Moon, MenuIcon, CloseIcon } from "../icons";

const ResumeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
import { NAV_ITEMS } from "../../utils/theme";
import { scrollToElement } from "../../utils/helpers";

const Navbar = ({ dark, setDark }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (item) => {
    setMobileMenu(false);
    if (pathname !== "/") {
      router.push("/?scrollTo=" + item.toLowerCase());
    } else {
      scrollToElement(item.toLowerCase());
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: dark ? "rgba(10,10,15,0.85)" : "rgba(250,250,250,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <span style={{ color: "var(--accent)" }}>K</span>
          <span style={{ color: "var(--text)" }}>Kejriwal</span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 28 }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((n) => (
            <span
              key={n}
              className="nav-link"
              onClick={() => handleNavClick(n)}
            >
              {n}
            </span>
          ))}
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "6px 8px",
              cursor: "pointer",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <a
            href="/Kunal_Kejriwal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Kunal_Kejriwal_Resume.pdf"
            className="btn-secondary"
            style={{ padding: "8px 20px", fontSize: 13, textDecoration: "none" }}
          >
            <ResumeIcon /> Resume
          </a>
          <button
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: 13 }}
            onClick={() => handleNavClick("Contact")}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <div style={{ display: "none" }} className="mobile-toggle">
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              cursor: "pointer",
              marginRight: 12,
            }}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              cursor: "pointer",
            }}
          >
            {mobileMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div
          style={{
            background: "var(--bg2)",
            borderTop: "1px solid var(--border)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {NAV_ITEMS.map((n) => (
            <span
              key={n}
              className="nav-link"
              style={{ fontSize: 16 }}
              onClick={() => handleNavClick(n)}
            >
              {n}
            </span>
          ))}
          <a
            href="/Kunal_Kejriwal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Kunal_Kejriwal_Resume.pdf"
            className="btn-secondary"
            style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
          >
            <ResumeIcon /> Resume
          </a>
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => handleNavClick("Contact")}
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
