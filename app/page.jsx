"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Hero,
  About,
  Skills,
  Projects,
  BlogPreview,
  ExperienceAndTestimonials,
  CTA,
  Contact,
} from "../components/sections";
import { scrollToElement } from "../utils/helpers";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        scrollToElement(scrollTo);
      }, 100);
    }
  }, [searchParams]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <BlogPreview />
      <ExperienceAndTestimonials />
      <CTA />
      <Contact />
    </>
  );
}
