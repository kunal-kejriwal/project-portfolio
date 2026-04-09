const experience = [
  {
    company: "Deloitte USI",
    role: "Associate Engineer — Backend",
    period: "Oct 2023 – Present",
    location: "Gurugram, India",
    context: "Backend engineer on ChangeScout — an enterprise OCM platform serving 150+ global clients within a 40-person eng/PM/QA team.",
    bullets: [
      "Async Pipeline Ownership: Architected high-throughput async pipelines processing 20M+ records/day (load-tested to ~30M), orchestrating Celery workers with Redis-backed task queues under strict API rate limits. Selected Cloud Run over GKE for stateless workloads to minimize operational overhead while retaining auto-scaling.",
      "Latency Optimization: Cut API response time by 35% by eliminating N+1 query patterns (batched prefetch joins), refactoring O(n²) list-intersection logic to O(n) hash-set lookups, and compressing response payloads across critical endpoints.",
      "Enterprise Search (GCP): Built and owned an end-to-end search feature — integrated GCP Search with a Java/Spring Boot service layer, indexed 50K+ documents in Cloud Storage, and served ranked results via a low-latency REST API (p95 < 200ms).",
      "Observability & Logging: Designed a centralized error-logging system for all REST API failures with structured logs, request context, stack traces, and severity tagging. Built role-based access (admin-only) with indexed lookup by timestamp and endpoint.",
      "CI/CD & Cloud Ops: Architected deployment pipelines (GitHub Actions + GCP Cloud Build) enabling zero-downtime containerized releases on Cloud Run with automated rollback.",
    ],
  },
  {
    company: "Unite.AI",
    role: "Technical Writer — AI/ML",
    period: "Oct 2023 – Present",
    location: "Remote",
    context: "Contributing writer covering cutting-edge AI/ML research for a global developer and research audience.",
    bullets: [
      "Authored 100+ in-depth technical articles on LLMs, multimodal models, diffusion models, model optimization (MoE, PEFT), and AI infrastructure.",
      "Topics span from foundational research to applied systems: vision-language models, efficient inference, world models, AutoML, and Vertex AI.",
      "Content reaches a global developer and research audience — consistently translating dense academic papers into clear, actionable technical writing.",
    ],
    link: "https://www.unite.ai/author/kunalkejriwal/",
  },
  {
    company: "DeepVision",
    role: "Project Intern — Backend",
    period: "Jan 2023 – Jun 2023",
    location: "Remote",
    context: "Backend internship focused on productionizing computer vision model inference.",
    bullets: [
      "Built production REST APIs in Python serving computer vision model inference on image and video input.",
      "Implemented structured error handling, input validation, and latency monitoring across inference endpoints.",
    ],
  },
];

export default experience;
