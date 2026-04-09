import Experience from "./Experience";
import Testimonials from "./Testimonials";

const ExperienceAndTestimonials = () => (
  <section id="experience" style={{ background: "var(--bg2)" }}>
    <div className="section">
      <Experience />
      <Testimonials />
    </div>
  </section>
);

export default ExperienceAndTestimonials;
