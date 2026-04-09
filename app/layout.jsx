import ThemeProvider from "../components/layout/ThemeProvider";
import "../styles/globals.css";

export const metadata = {
  title: {
    default: "Kunal Kejriwal — Backend Developer & Technical Writer",
    template: "%s | Kunal Kejriwal",
  },
  description:
    "Backend developer building scalable systems in Java & Spring Boot. Technical writer producing SEO-optimized content for developer audiences.",
  keywords: [
    "backend developer",
    "technical writer",
    "Java",
    "Spring Boot",
    "REST APIs",
    "system design",
    "SEO",
    "technical blog",
  ],
  authors: [{ name: "Kunal Kejriwal" }],
  creator: "Kunal Kejriwal",
  metadataBase: new URL("https://www.kunalkejriwal.com"),
  openGraph: {
    title: "Kunal Kejriwal — Backend Developer & Technical Writer",
    description:
      "Building scalable backend systems and writing technical content that ranks.",
    url: "https://www.kunalkejriwal.com",
    siteName: "Kunal Kejriwal",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Kejriwal — Backend Developer & Technical Writer",
    description:
      "Building scalable backend systems and writing technical content that ranks.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.kunalkejriwal.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
