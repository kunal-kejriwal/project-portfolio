const projects = [
  {
    title: "APIEngine",
    category: "Developer Tools / SaaS",
    problem:
      "Mock APIs and localhost servers don't behave like production systems — no real validation, no persistence, no network behavior. Integration issues surface late in development when changes are costly.",
    solution:
      "Built a schema-driven live backend simulation platform with a custom URL dispatcher and request multiplexer. Developers define JSON Schema Objects and instantly get globally accessible REST endpoints with real persistence, per-user namespace isolation, configurable rate limits, and full CRUD. Background jobs run via Celery + Redis with retry logic and dead-letter queues; deployed on GCP.",
    stack: ["Python", "Django", "DRF", "FastAPI", "Redis", "Celery", "PostgreSQL", "Docker", "GCP"],
    outcome:
      "500+ developers (organic), 250K+ API calls/user/month — live at theapiengine.com.",
    link: "https://theapiengine.com",
    highlights: [
      "Custom URL dispatcher with per-user namespace isolation",
      "Celery + Redis background jobs with retry logic and dead-letter queues",
      "Full CRUD with filtering, sorting, and pagination out of the box",
      "Configurable rate limits and extensible schema support",
    ],
  },
  {
    title: "MeshEngine",
    category: "Systems / Infrastructure",
    problem:
      "Distributed systems research and defence/disaster-recovery planning require testing self-healing drone mesh networks, but existing tools are either too RF-specific or too general — no async event model, no HTTP interface, no real failure simulation.",
    solution:
      "Built a backend simulation platform with a control-plane/worker-plane split: FastAPI control plane handles topology and failure-aware Dijkstra routing [O((V+E) log V)], while independent async workers subscribe to Redis Pub/Sub events for fan-out execution. Chose Redis Pub/Sub over Kafka for lower operational overhead given PostgreSQL-backed persistence. Deployed on GCP Cloud Run with Cloud SQL and Memorystore.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis Pub/Sub", "SQLAlchemy", "WebSockets", "Docker", "GCP"],
    outcome:
      "End-to-end simulation of self-healing mesh networks: real-time failure/recovery events, multi-hop Dijkstra routing, per-message hop-by-hop latency breakdown, and live WebSocket event stream. 25 automated tests (unit + topology).",
    highlights: [
      "Failure-aware Dijkstra — DOWN nodes pruned before traversal, O((V+E) log V)",
      "Redis Pub/Sub fan-out across independent async worker plane",
      "structlog + per-message latency breakdown + GCP Cloud Monitoring uptime checks",
      "WebSocket /ws/stream for live topology events",
    ],
  },
];

export default projects;
