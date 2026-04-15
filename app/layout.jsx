import ThemeProvider from "../components/layout/ThemeProvider";
import "../styles/globals.css";

export const metadata = {
  title: {
    default: "Backend Developer & Technical Writer | Kunal Kejriwal",
    template: "%s | Kunal Kejriwal",
  },
  description:
    "Kunal Kejriwal — backend engineer at Deloitte building async pipelines and APIs in Python, Django, and FastAPI. Technical writer at Unite.AI covering distributed systems and AI/ML.",
  keywords: [
    "backend developer",
    "Python backend developer",
    "Django developer",
    "FastAPI developer",
    "technical writer",
    "distributed systems",
    "REST API design",
    "system design",
    "GCP Cloud Run",
    "Celery Redis",
    "backend engineer for hire",
    "technical blog",
  ],
  authors: [{ name: "Kunal Kejriwal" }],
  creator: "Kunal Kejriwal",
  metadataBase: new URL("https://www.kunalkejriwal.com"),
  openGraph: {
    title: "Backend Developer & Technical Writer | Kunal Kejriwal",
    description:
      "Backend engineer building async pipelines and APIs in Python, Django, and FastAPI. Technical writer at Unite.AI covering distributed systems and AI/ML.",
    url: "https://www.kunalkejriwal.com",
    siteName: "Kunal Kejriwal",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Developer & Technical Writer | Kunal Kejriwal",
    description:
      "Backend engineer building async pipelines and APIs in Python, Django, and FastAPI. Technical writer at Unite.AI covering distributed systems and AI/ML.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.kunalkejriwal.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kunal Kejriwal",
  url: "https://www.kunalkejriwal.com",
  jobTitle: "Backend Developer & Technical Writer",
  worksFor: {
    "@type": "Organization",
    name: "Deloitte USI",
  },
  sameAs: [
    "https://www.linkedin.com/in/kunal-kejriwal",
    "https://github.com/kunal-kejriwal",
    "https://www.unite.ai/author/kunalkejriwal/",
    "https://medium.com/@kunal.resolute",
  ],
  knowsAbout: [
    "Python",
    "Django",
    "FastAPI",
    "Distributed Systems",
    "REST API Design",
    "GCP",
    "Celery",
    "Redis",
    "Technical Writing",
    "AI/ML",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
