import { toSlug } from "../utils/helpers";

const blogsRaw = [
  {
    title: "How I Designed a Rate Limiter from Scratch",
    category: "System Design",
    time: "8 min",
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
    summary:
      "Frameworks and patterns for writing technical documentation that developers actually want to read.",
    content: `
Most technical documentation is written for the author, not the reader. After producing 50+ technical articles and documentation sets, here are the patterns that consistently produce docs developers actually reference.

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
    summary:
      "SEO strategies specifically for developer content — from keyword research to technical on-page optimization.",
    content: `
I've written 50+ technical articles, and the ones that rank share specific patterns. Here's what I've learned about SEO for developer content that most technical writers miss.

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
];

const blogs = blogsRaw.map((blog) => ({
  ...blog,
  slug: toSlug(blog.title),
}));

export default blogs;
