import { toSlug } from "../utils/helpers";

const blogsRaw = [
  // ── Original portfolio articles ──────────────────────────────────────────
  {
    title: "How I Designed a Rate Limiter from Scratch",
    category: "System Design",
    time: "8 min",
    date: "Dec 10, 2024",
    summary:
      "A deep dive into token bucket algorithms, sliding window counters, and production-ready rate limiting in Spring Boot.",
    content: `
Rate limiting is one of those things every backend engineer knows they need but few implement well from scratch. In this post, I walk through three approaches I evaluated — fixed window, sliding window log, and token bucket — and explain why I chose a hybrid for a production Spring Boot service handling 10K+ RPM.

## Why Build Your Own?

Off-the-shelf solutions like API gateways handle rate limiting at the edge, but sometimes you need fine-grained, business-logic-aware throttling. Our use case required per-tenant, per-endpoint limits with dynamic configuration.

## The Token Bucket Algorithm

The token bucket is elegant: imagine a bucket that fills with tokens at a fixed rate. Each request consumes a token. If the bucket is empty, the request is rejected. This naturally allows short bursts while enforcing average rates.

I implemented this using Redis for distributed state, with a Lua script to make the check-and-decrement atomic. The key insight was using a single Redis key per tenant-endpoint pair with a TTL matching the refill window.

## Sliding Window Counters

For endpoints where we needed stricter smoothing, I implemented sliding window counters. Instead of hard window boundaries (which cause burst problems at window edges), this approach weights the previous window's count proportionally.

## Production Considerations

The real complexity isn't the algorithm — it's the operational concerns. How do you handle Redis failures? (I used a local fallback with a generous limit.) How do you surface rate limit status to callers? (Standard headers: X-RateLimit-Remaining, X-RateLimit-Reset.) How do you monitor and tune limits without deployments? (Dynamic config via a feature flag service.)

## Results

After deploying, we saw a 73% reduction in abuse-related incidents and zero legitimate traffic impact. The system processes rate limit decisions in under 2ms p99.
    `,
  },
  {
    title: "Understanding Vector Databases for AI Search",
    category: "AI / ML",
    time: "6 min",
    date: "Jan 15, 2025",
    summary:
      "Why traditional databases fall short for semantic search and how vector embeddings change the game.",
    content: `
If you've tried to build search that understands meaning rather than just matching keywords, you've likely encountered vector databases. Here's what I learned integrating one into a production search pipeline.

## The Problem with Traditional Search

Keyword search (TF-IDF, BM25) works well when users know exactly what to search for. But it fails spectacularly for semantic queries. Searching "how to handle errors gracefully in API responses" won't match a document titled "REST Exception Handling Patterns" — even though they're about the same thing.

## What Are Vector Embeddings?

Embedding models (like OpenAI's text-embedding-ada-002 or open-source alternatives like Sentence-BERT) convert text into high-dimensional numerical vectors. Similar meanings cluster together in this vector space. The key insight: you can measure semantic similarity by computing the distance between vectors.

## Choosing a Vector Database

I evaluated Pinecone, Weaviate, Milvus, and pgvector. For our use case (under 1M documents, PostgreSQL already in the stack), pgvector won on operational simplicity. For larger scales, dedicated solutions like Pinecone offer better performance.

## The Architecture

Our pipeline: documents are chunked, embedded via API, and stored with their vectors. At query time, the search query is embedded using the same model, and we perform an approximate nearest neighbor (ANN) search. We combine this with metadata filtering for hybrid search.

## Lessons Learned

Embedding quality matters more than the database choice. Chunk size dramatically affects retrieval quality — too large and you lose precision, too small and you lose context. And always build an evaluation set before optimizing.
    `,
  },
  {
    title: "Spring Boot 3 Migration Guide: What Actually Changed",
    category: "Backend Engineering",
    time: "10 min",
    date: "Mar 5, 2025",
    summary:
      "A practical, no-fluff migration checklist with code examples for upgrading from Spring Boot 2.x.",
    content: `
Migrating from Spring Boot 2.x to 3.x isn't just a version bump — it's a move to Jakarta EE, Java 17+, and a new baseline. Here's everything that actually matters, distilled from migrating three production services.

## The Big Breaking Change: javax → jakarta

Every import starting with javax.* needs to change to jakarta.*. This sounds simple but touches everything: servlets, persistence, validation, mail. Use your IDE's find-and-replace, but manually verify edge cases.

## Java 17 Baseline

Spring Boot 3 requires Java 17 minimum. If you're still on 11, this is the bigger migration. The good news: records, sealed classes, and pattern matching make your code significantly cleaner.

## Spring Security Overhaul

The SecurityFilterChain approach is now the only way. WebSecurityConfigurerAdapter is gone. If you haven't already migrated your security config, this is the most labor-intensive change. I've included before/after examples for common patterns: JWT auth, OAuth2, and method-level security.

## Observability Changes

Micrometer is now the default observation API. Spring Boot Actuator endpoints have changed paths. If you have monitoring dashboards, update them before deploying.

## My Migration Checklist

1. Upgrade to the latest Spring Boot 2.7.x first
2. Fix all deprecation warnings
3. Switch to Java 17
4. Run the OpenRewrite migration recipe
5. Manually fix what OpenRewrite misses
6. Update security configuration
7. Test everything — especially integration tests
8. Update monitoring and alerting

The whole process took about 2 days per service for us, with most time spent on security configuration and integration test fixes.
    `,
  },
  {
    title: "The Developer's Guide to Writing Docs People Read",
    category: "Developer Tools",
    time: "5 min",
    date: "May 20, 2025",
    summary:
      "Frameworks and patterns for writing technical documentation that developers actually want to read.",
    content: `
Most technical documentation is written for the author, not the reader. After producing 100+ technical articles and documentation sets, here are the patterns that consistently produce docs developers actually reference.

## The Inverted Pyramid

Start with the answer, then explain. Developers scan documentation — they don't read it linearly. Put the code example first, then the explanation. Show the happy path before edge cases.

## The Four Types of Documentation

Divio's documentation framework nails it: tutorials (learning-oriented), how-to guides (task-oriented), reference (information-oriented), and explanation (understanding-oriented). Most projects only have reference docs. Adding even basic how-to guides dramatically improves developer experience.

## Writing Code Examples That Work

Every code example should be runnable. Copy-paste should work. Include imports. Show the output. If there are prerequisites, list them explicitly. Nothing destroys trust faster than a code example that doesn't compile.

## Structure for Scannability

Use descriptive headings (not "Introduction" — say what the section actually covers). Keep paragraphs to 3-4 sentences. Use code blocks liberally. Add a TL;DR at the top for long documents.

## The Maintenance Problem

Documentation rots faster than code. Link your docs to your CI pipeline. Use documentation linters. Assign ownership. Treat docs like code: review them, test them, version them.
    `,
  },
  {
    title: "Building Event-Driven Microservices with RabbitMQ",
    category: "Backend Engineering",
    time: "9 min",
    date: "Jul 8, 2025",
    summary:
      "Patterns for reliable async communication between services using message queues.",
    content: `
Synchronous HTTP calls between microservices create tight coupling and cascading failures. Here's how I implemented event-driven communication using RabbitMQ in a Spring Boot ecosystem.

## Why Event-Driven?

In our order processing system, a single order creation triggered calls to inventory, payment, notification, and analytics services. If any downstream service was slow or down, the order creation would fail or timeout. Moving to events decoupled these concerns.

## Exchange Patterns

RabbitMQ offers three exchange types that matter: direct (point-to-point), topic (pattern-based routing), and fanout (broadcast). We use topic exchanges for most inter-service communication because they offer routing flexibility without tight coupling.

## Reliable Publishing

The biggest challenge isn't sending messages — it's ensuring they're sent exactly once in conjunction with your database transaction. We use the Transactional Outbox pattern: write the event to an outbox table in the same transaction as the business data, then publish from the outbox asynchronously.

## Consumer Idempotency

Messages can be delivered more than once. Every consumer must be idempotent. We use a processed-events table with the message ID as a unique constraint. Before processing, check if the message ID exists. If it does, skip it.

## Dead Letter Queues

Failed messages need somewhere to go. We configure a dead letter exchange for every queue. Messages that fail after 3 retries (with exponential backoff) land in the DLQ. A monitoring dashboard alerts on DLQ depth, and we have tooling to replay messages after fixing the underlying issue.

## Results

After migration, our order creation p99 latency dropped from 2.3s to 180ms, and we eliminated cascading failures entirely. The system now gracefully handles individual service outages without impacting the critical path.
    `,
  },
  {
    title: "Why Your Technical Blog Isn't Ranking (And How to Fix It)",
    category: "Developer Tools",
    time: "7 min",
    date: "Sep 14, 2025",
    summary:
      "SEO strategies specifically for developer content — from keyword research to technical on-page optimization.",
    content: `
I've written 100+ technical articles, and the ones that rank share specific patterns. Here's what I've learned about SEO for developer content that most technical writers miss.

## Developer Keyword Research Is Different

Tools like Ahrefs and SEMrush work, but developer search behavior is unique. Developers search with code snippets, error messages, and specific version numbers. "Spring Boot @Transactional not working" is a real keyword with real volume. Target these long-tail, high-intent queries.

## Content Depth Beats Content Volume

One comprehensive, 2000+ word guide outranks ten shallow 500-word posts. Google's helpful content update explicitly rewards depth and first-hand experience. Write from experience, include real code, show actual results.

## Technical On-Page SEO

Developers build websites but often neglect basic SEO on their own blogs. Ensure proper heading hierarchy (H1 → H2 → H3). Use descriptive meta titles that include the primary keyword. Add structured data (Article schema). Optimize images with descriptive alt text.

## The Code Block Advantage

Google increasingly surfaces code snippets in search results. Well-formatted, clearly commented code blocks with language annotations give you a chance at featured snippets. Every technical article should have at least one code block that directly answers the target query.

## Internal Linking Strategy

Create topic clusters: a pillar page on "Spring Boot" linking to specific posts on testing, security, caching, etc. This builds topical authority and helps Google understand your content structure.

## Distribution Matters

SEO is a long game. In the short term, distribute on dev.to, Hashnode, and HackerNews. Each backlink and social signal compounds. But always publish on your own domain first — syndicated content should use canonical tags pointing to your original.
    `,
  },

  // ── Medium articles ───────────────────────────────────────────────────────
  {
    title: "Building a Rate Limiter in Pure Python — No Redis Required",
    category: "Backend Engineering",
    time: "6 min",
    date: "Apr 4, 2026",
    summary:
      "No Redis. No django-ratelimit. Just a sliding window, a dictionary, and 40 lines of code.",
    content: `
Most rate limiters hide behind libraries. Here's what's actually inside one — a sliding window, a dictionary, and timestamps you control.

While Redis-backed rate limiters and django-ratelimit work well at scale, there are situations where they feel excessive: small internal tools, personal projects, or lightweight APIs. Building one from scratch is also the best way to understand the underlying mechanics.

## The Algorithm: Sliding Window Counter

For every incoming request, examine the last N seconds of activity. Count requests from that client in this window. If the count exceeds your limit, reject it; otherwise allow it and record the timestamp.

The window doesn't reset — it slides. Anything older than 60 seconds gets pruned on every request. This avoids the burst problem at window boundaries that plagues fixed-window approaches.

## The Core Logic

\`\`\`python
import time
from collections import defaultdict

# Stores request timestamps per client key
request_log = defaultdict(list)

def is_rate_limited(client_key: str, limit: int, window_seconds: int) -> bool:
    now = time.time()
    window_start = now - window_seconds
    # Keep only timestamps within the current window
    request_log[client_key] = [
        ts for ts in request_log[client_key]
        if ts > window_start
    ]
    if len(request_log[client_key]) >= limit:
        return True
    request_log[client_key].append(now)
    return False
\`\`\`

\`request_log\` maps client identifiers (IP addresses, user IDs, API keys) to timestamp lists. On each request the function prunes stale timestamps, checks the count, and either blocks or allows the request while recording the new timestamp.

## Plugging It Into Django Middleware

\`\`\`python
import time
from collections import defaultdict
from django.http import JsonResponse

request_log = defaultdict(list)

class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.limit = 60        # max requests
        self.window = 60       # per 60 seconds

    def __call__(self, request):
        client_key = self._get_client_key(request)
        if is_rate_limited(client_key, self.limit, self.window):
            return JsonResponse(
                {"error": "Too many requests. Slow down."},
                status=429
            )
        return self.get_response(request)

    def _get_client_key(self, request):
        # Use forwarded IP if behind a proxy, else REMOTE_ADDR
        forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR", "unknown")
\`\`\`

Register it in settings.py:

\`\`\`python
MIDDLEWARE = [
    "yourapp.middleware.RateLimitMiddleware",
    # ... rest of your middleware
]
\`\`\`

## The IP Extraction Detail Worth Knowing

When Django sits behind a load balancer or reverse proxy (Nginx, AWS ALB), REMOTE_ADDR contains the proxy's IP, not the client's. HTTP_X_FORWARDED_FOR may contain comma-separated IPs — the first one is the original client.

## Making It Configurable Per-View

For endpoint-specific limits, use a decorator:

\`\`\`python
from functools import wraps
from django.http import JsonResponse

def rate_limit(limit=30, window=60):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            client_key = f"{request.META.get('REMOTE_ADDR')}:{view_func.__name__}"
            if is_rate_limited(client_key, limit, window):
                return JsonResponse({"error": "Rate limit exceeded."}, status=429)
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

# Usage
@rate_limit(limit=5, window=60)
def login(request):
    ...

@rate_limit(limit=100, window=60)
def public_feed(request):
    ...
\`\`\`

The client_key includes the view name, scoping limits per endpoint so activity on one endpoint doesn't consume quota elsewhere.

## What This Doesn't Do — And When to Reach for Redis

This approach has real limitations:

- No persistence: the in-memory log vanishes on server restart
- No distribution: multiple Gunicorn workers each maintain their own log, allowing clients to multiply quota by hitting different workers
- Unbounded growth: under heavy unique-client traffic, memory grows unless cleanup is added

Use this when you have a single-process application, a personal project, or an internal tool. Reach for Redis when you have multiple dynos, multiple EC2 instances behind a load balancer, or any distributed setup requiring shared state.

Build the simple version first. You'll know exactly when you've outgrown it.
    `,
  },
  {
    title: "The Cryptic Ledger: What a CTF Challenge Taught Me About Hashing",
    category: "System Design",
    time: "6 min",
    date: "Apr 4, 2026",
    summary:
      "A corrupted log file, thousands of lines of noise, and one bug that breaks everything — a missing newline you'd never think to check.",
    content: `
A corrupted log file. Thousands of lines of noise. One hidden security sequence to recover. This is the setup for a CTF challenge that taught me more about how hashing actually works than any textbook.

## The Setup

You're given a file of terminal logs. Your job is to extract a hidden security sequence by following five strict rules:

- Skip lines starting with "SYSTEM" or "#"
- Compute the MD5 hash of each valid line, including its trailing newline character
- Check the last character of the 32-character hex hash
- Letters (a–f): discard as "hollow"
- Digits (0–9): keep as "mined" — extract the character at index 6
- Concatenate extracted characters to form the final sequence

## The Trap That Got Me

My first attempt used .strip() before hashing — completely standard practice when reading files. It seemed harmless. It broke everything.

MD5('LOGDATA-X4-TERMINAL\\n') and MD5('LOGDATA-X4-TERMINAL') produce entirely different hashes.

That missing newline changes every hash, which changes which lines are classified as "mined" vs "hollow", which changes every character extracted. The entire sequence was wrong, and the error was invisible until I understood what hashing actually is: a contract. Both parties must agree byte-for-byte on what is being hashed.

## The Solution

\`\`\`python
import hashlib

def decode_ledger(file_path):
    sequence = []

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                if line.startswith("SYSTEM") or line.startswith("#"):
                    continue

                # Hash the line WITH its newline — do not strip
                hash_hex = hashlib.md5(line.encode('utf-8')).hexdigest()

                last_char = hash_hex[-1]

                if last_char.isdigit():
                    if len(line) > 6:
                        sequence.append(line[6])

        final_flag = "".join(sequence)
        print(f"--- RECOVERY COMPLETE ---")
        print(f"SECURITY SEQUENCE: {final_flag}")

    except FileNotFoundError:
        print("Error: ledger_data.txt not found.")

if __name__ == "__main__":
    decode_ledger('ledger_data.txt')
\`\`\`

Three things to notice:

- No .strip() — the newline is part of the contract
- Line-by-line processing — memory-efficient regardless of file size
- Zero-indexed access: "index 6" means the 7th character

## Why This Matters Beyond CTFs

MD5 hashing underpins a lot of real systems — file integrity verification, password storage, log auditing. A single byte difference produces a completely different hash. That property is the point. It means you can detect any modification, no matter how small.

The takeaway I bring to production code: whenever you're hashing something, be explicit about exactly what bytes you're hashing. Document it. The next engineer (or you, six months later) will thank you.
    `,
  },
  {
    title: "Django Explained End-to-End: Architecture, ORM, Security & Backend Design",
    category: "Backend Engineering",
    time: "11 min",
    date: "Feb 13, 2026",
    summary:
      "A backend engineer's mental model of Django — how it actually works, why it's still relevant in 2026, and what makes it different from a library.",
    content: `
What begins as a simple concept quickly becomes intricate: routing, authentication, databases, security, deployment. Django's value is that it handles this complexity through clear, opinionated structure — and understanding that structure makes you a significantly better backend engineer.

## Django for Modern Backend Development — Can It Compete in 2026?

The short answer: yes, decisively, for the right workloads.

### Batteries-Included Philosophy

Django ships with everything you need to build production systems: ORM, authentication, admin dashboard, form handling, validation, and security protections. This reduces decision fatigue and lets you focus on business logic instead of wiring together a stack of dependencies (each with their own breaking changes and maintenance burden).

### Security By Default

Django protects against SQL injection, XSS, CSRF, clickjacking, and session hijacking — all out of the box. For organizations handling sensitive data in healthcare, finance, or SaaS, these defaults matter.

### The Admin Interface: An Underrated Superpower

The Django admin interface (accessible at /admin) provides CRUD interfaces for all your models, role-based access controls, search, filters, and pagination — without writing a single line of frontend code. Early-stage startups regularly save weeks of development time here.

### Django in an Async & Microservices World

Despite perceptions of obsolescence, Django supports ASGI and async views, works seamlessly with Celery for background jobs, and integrates cleanly into microservice architectures. Many teams use Django for core business logic and internal tools while delegating high-throughput endpoints to async services.

When to look elsewhere: ultra-low latency APIs, real-time streaming, or async-first architectures where FastAPI or Go are better fits.

## Django Architecture: The Request–Response Lifecycle

Understanding how Django processes requests internally is the foundation for designing scalable, maintainable backend systems.

### Step 1: The Incoming HTTP Request

Every interaction starts with an HTTP request sent by a client. Django receives this through a web server (Nginx + Gunicorn is the standard production setup).

### Step 2: Middleware Processing

Before reaching application logic, requests pass through middleware — a layered system for cross-cutting concerns:

- Authentication checks
- Logging
- Session management
- Security filtering

Conceptually:

\`\`\`
Request → [Middleware 1] → [Middleware 2] → [Middleware 3] → URL Router
\`\`\`

For engineers coming from Spring Boot, middleware is the equivalent of filters and interceptors.

### Step 3: URL Resolution

Django matches the incoming URL against patterns defined in urls.py:

\`\`\`python
path("posts/", views.post_list, name="post_list")
\`\`\`

Centralised routing means predictable request mapping and easier debugging.

### Step 4: View Execution (Business Logic Layer)

The view is where core backend logic lives. Despite the name, it functions like a controller in MVC — orchestrating input validation, business logic, database interactions, and response generation:

\`\`\`python
def post_list(request):
    posts = Post.objects.all()
    return render(request, "posts.html", {"posts": posts})
\`\`\`

### Step 5: Model Interaction via ORM

When views need data, they communicate with the Model layer. Django's ORM translates Python to SQL:

\`\`\`
View → ORM → SQL Query → Database → ORM → View
\`\`\`

This abstraction provides database portability and automatic SQL injection protection. The N+1 problem is the most common ORM pitfall — always use select_related() and prefetch_related() for related data.

### Step 6: Returning the HTTP Response

Django constructs a response and sends it back through the middleware stack. This reverse traversal allows middleware to modify outgoing responses — adding headers, logging, etc.

## How Django's Flow Compares to Spring Boot

\`\`\`
Spring Boot:  Filter → DispatcherServlet → Controller → Service → Repository → Response
Django:       Middleware → URL Router → View → Model (ORM) → Response
\`\`\`

Both follow layered architecture principles. Django reduces boilerplate while preserving the same conceptual clarity.

## Separation of Concerns: Why This Architecture Scales

Django's strict layer separation means large teams can work independently without tight coupling:

- Database engineers focus on models
- Backend engineers design views and services
- Frontend engineers modify templates

That separation is what lets a codebase stay maintainable as the team grows from 2 to 20.
    `,
  },
  {
    title: "REST APIs Explained: How the Web Talks Behind the Scenes",
    category: "Backend Engineering",
    time: "10 min",
    date: "Feb 8, 2026",
    summary:
      "What REST actually is, how it works step-by-step, and the design principles that make APIs maintainable at scale.",
    content: `
REST is not a technology. It's not a framework. It's not a library. It's an architectural philosophy — and understanding it properly changes how you design systems, not just how you write endpoints.

## What Is an API?

Think of APIs as digital messengers. A client communicates through an intermediary rather than accessing backend systems directly. The API specifies what requests are permitted, how they must be formatted, and what responses look like.

The core benefit: APIs abstract complexity. Clients remain independent of your database choice, backend language, and internal business logic. You can change your entire infrastructure stack without breaking clients — as long as the API contract stays intact.

## The Evolution to REST

Before REST, systems used SOAP (Simple Object Access Protocol) with rigid XML messaging. In 2000, Roy Fielding introduced REST through his doctoral dissertation as a set of design principles inspired by how the web itself was architected.

REST revolves around resources — any piece of information: users, products, orders, documents. Each resource has a unique identifier (URI) and can be manipulated through standard HTTP methods.

## How REST APIs Work: The 4-Step Flow

1. Client sends request — with HTTP method, URL, headers, and optional body
2. Server validates and processes — authentication, business logic, database operations
3. Server sends response — HTTP status code plus response body
4. Data is transferred as a representation of resource state — typically JSON

## The 6 REST Constraints

These constraints define what makes an API RESTful:

- Statelessness: every request contains all the information needed to process it — no server-side session state
- Client-Server separation: frontend and backend evolve independently
- Uniform interface: consistent HTTP methods, URIs, and response formats
- Cacheability: responses explicitly marked as cacheable or non-cacheable
- Layered system: clients can't tell if they're talking to the origin server or a load balancer
- Code on demand (optional): servers can send executable code to clients

## REST API Design Best Practices

\`\`\`
GET    /api/v1/users          # list users
GET    /api/v1/users/123      # get specific user
POST   /api/v1/users          # create user
PUT    /api/v1/users/123      # update user
DELETE /api/v1/users/123      # delete user
\`\`\`

- Use nouns for resources, not verbs (/users not /getUsers)
- Use HTTP methods correctly — GET never modifies state
- Version your API (/api/v1/) before you have breaking changes, not after
- Return meaningful status codes — 201 for creation, 422 for validation errors, not everything as 200
- Paginate list endpoints — never return unbounded result sets
- Handle errors gracefully with consistent error response shapes

## Common Mistakes

The most frequent mistake I see in backend code reviews: using POST for everything because "it's simpler." It breaks cacheability, idempotency assumptions, and makes APIs much harder to reason about. Use the right method for the right operation.

Second most common: no versioning until a breaking change is required. By then it's too late to do cleanly. Version from day one.

REST remains the dominant API paradigm because it maps naturally to how the web works. GraphQL and gRPC solve specific problems well, but for most CRUD-heavy applications, a well-designed REST API is the right choice.
    `,
  },
  {
    title: "The Lifecycle of a Java Program: From Source Code to JVM Execution",
    category: "Backend Engineering",
    time: "9 min",
    date: "Feb 8, 2026",
    summary:
      "What actually happens when you run a Java program — from compilation through class loading, linking, and garbage collection.",
    content: `
Java remains one of the world's most popular languages nearly three decades after its creation. Understanding what happens between writing code and it executing on hardware explains both its portability and its performance characteristics.

## The 4-Stage Lifecycle

1. Write source code — human-readable .java files
2. Compile with javac — produces platform-independent bytecode (.class files)
3. JVM loads and verifies bytecode
4. JVM executes — converting bytecode to machine instructions at runtime

The key insight: bytecode is platform-independent. The same .class file runs on Windows, macOS, and Linux. The JVM handles the platform-specific translation. That's how Java achieves "Write Once, Run Anywhere."

## Stage 1: Compilation

When you run javac ProgramName.java, the compiler validates syntax, type-checks your code, and produces bytecode. If there are errors, compilation stops. If it succeeds, you get a .class file containing instructions the JVM understands — but no operating system does natively.

## Stage 2: Class Loading

The JVM loads classes on demand, not all at once. Three class loaders handle this:

- Bootstrap: loads core Java classes from rt.jar
- Extension: loads classes from the ext directory
- Application: loads your application classes from the classpath

For each class, loading performs three functions: creates a binary stream from the class file, parses binary data into internal data structures, and creates a java.lang.Class instance.

## Stage 3: Linking

Linking prepares a loaded class for execution through three steps:

Verification checks that the bytecode is well-formed and that code obeys Java language semantics — valid operation codes, correct method signatures, no security violations. This is the JVM's security boundary.

Preparation creates static fields and initializes them to default values. Memory is allocated but not yet populated with user-defined values.

Resolution checks symbolic references from one class to other classes and interfaces, loading them if necessary and verifying the references are correct.

## Stage 4: Initialization

Initialization assigns values to static fields and executes static blocks:

\`\`\`java
class Config {
    static int maxConnections = 100;
    static String dbUrl;

    static {
        dbUrl = System.getenv("DATABASE_URL");
    }
}
\`\`\`

Superclasses are always initialized before subclasses. A class initializes the first time it's actively used — instance creation, static method call, static field access (excluding constants).

## Garbage Collection

Java manages memory automatically. The GC identifies objects that are no longer reachable (no live references in the call stack or static fields) and reclaims their memory.

You can suggest a GC run with System.gc(), but you cannot force it. The JVM decides when to collect based on heap pressure and its own heuristics.

The practical implication: prefer short-lived objects that die in the young generation (cheap to collect) over long-lived objects that get promoted to the old generation (more expensive to collect).

## Class Unloading

Classes are only unloaded when their defining class loader becomes unreachable. Bootstrap-loaded classes are never unloaded. This matters primarily in application servers and plugin systems that load many classes dynamically — a memory leak in class loading can exhaust PermGen/Metaspace.

## Why This Matters for Backend Engineers

Understanding the lifecycle helps you debug real problems:

- ClassNotFoundException vs NoClassDefFoundError: the first means the class was never found; the second means it was found at compile time but not at runtime
- Static initializer failures cause ExceptionInInitializerError, which then causes NoClassDefFoundError for every subsequent load attempt
- Memory leaks in long-running services often come from class loaders not being released, not from object allocation

The JVM does substantial work on your behalf. Understanding it makes you better at debugging, profiling, and writing code that works with — not against — the runtime.
    `,
  },
];

const blogs = blogsRaw.map((blog) => ({
  ...blog,
  slug: toSlug(blog.title),
}));

export default blogs;
