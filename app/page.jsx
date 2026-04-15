"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Hero,
  About,
  Skills,
  Projects,
  BlogPreview,
  FeaturedWriting,
  ExperienceAndTestimonials,
  CTA,
  Contact,
} from "../components/sections";
import { scrollToElement } from "../utils/helpers";

const ScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        scrollToElement(scrollTo);
      }, 100);
    }
  }, [searchParams]);

  return null;
};

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <BlogPreview />
      <FeaturedWriting />
      <ExperienceAndTestimonials />
      <CTA />
      <Contact />
    </>
  );
}
