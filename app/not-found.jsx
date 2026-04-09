import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ paddingTop: 128, textAlign: "center", minHeight: "60vh" }}>
      <div className="section">
        <h1
          className="section-title"
          style={{ fontFamily: "'Syne', sans-serif", marginBottom: 16 }}
        >
          404 — Page not found
        </h1>
        <p style={{ color: "var(--text2)", marginBottom: 32, fontSize: 15 }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
