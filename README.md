# Kunal Kejriwal — Portfolio (Next.js)

Migrated from React SPA (Vite + React Router) to Next.js App Router with zero design changes.

## Quick Start

```bash
cd nextjs-portfolio
npm install
npm run dev
```

Site runs at `http://localhost:3000`.

## Folder Structure

```
nextjs-portfolio/
├── app/                          # Next.js App Router (replaces react-router-dom)
│   ├── layout.jsx                # Root layout: fonts, metadata, ThemeProvider shell
│   ├── page.jsx                  # / → Homepage (all sections)
│   ├── not-found.jsx             # Custom 404 page
│   └── blog/
│       ├── layout.jsx            # Blog metadata (server component)
│       ├── page.jsx              # /blog → Blog list with filters
│       └── [slug]/
│           ├── page.jsx          # /blog/:slug → Server component with generateMetadata
│           └── BlogPostClient.jsx # Client component rendering the blog post
│
├── components/                   # UNCHANGED component architecture
│   ├── icons/index.jsx           # All SVG icons (unchanged)
│   ├── layout/
│   │   ├── Navbar.jsx            # MIGRATED: next/link + next/navigation
│   │   ├── Footer.jsx            # MIGRATED: next/link
│   │   ├── ThemeProvider.jsx     # NEW: client wrapper for dark/light theme state
│   │   └── index.js
│   ├── sections/                 # ALL UNCHANGED (only added "use client" where needed)
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── BlogPreview.jsx
│   │   ├── Experience.jsx
│   │   ├── Testimonials.jsx
│   │   ├── ExperienceAndTestimonials.jsx
│   │   ├── CTA.jsx
│   │   ├── Contact.jsx
│   │   └── index.js
│   └── ui/
│       ├── Reveal.jsx            # UNCHANGED (added "use client")
│       ├── SectionHeader.jsx     # UNCHANGED
│       ├── BlogCard.jsx          # MIGRATED: next/link
│       └── index.js
│
├── data/                         # UNCHANGED
│   ├── blogs.js
│   ├── projects.js
│   ├── testimonials.js
│   ├── skills.js
│   └── experience.js
│
├── hooks/
│   └── useInView.js              # UNCHANGED (added "use client")
│
├── styles/
│   └── globals.css               # UNCHANGED (added html/body reset)
│
├── utils/
│   ├── helpers.js                # UNCHANGED
│   └── theme.js                  # UNCHANGED
│
├── package.json
├── next.config.js
├── jsconfig.json
├── vercel.json
├── .eslintrc.json
└── .gitignore
```

## What Changed (Migration Map)

### Deleted (no longer needed)
| Old File | Why |
|----------|-----|
| `src/App.jsx` | Replaced by `app/layout.jsx` + `ThemeProvider.jsx` |
| `src/main.jsx` | Next.js has its own entry point |
| `src/pages/Home.jsx` | Replaced by `app/page.jsx` |
| `src/pages/Blog.jsx` | Replaced by `app/blog/page.jsx` |
| `src/pages/BlogPost.jsx` | Replaced by `app/blog/[slug]/page.jsx` + `BlogPostClient.jsx` |
| `src/components/layout/ScrollToTop.jsx` | Next.js scrolls to top on navigation automatically |
| `vite.config.js` | Replaced by `next.config.js` |
| `index.html` | Next.js generates HTML via `layout.jsx` |

### Modified (router migration)
| File | Change |
|------|--------|
| `Navbar.jsx` | `react-router-dom` → `next/link` + `next/navigation` |
| `Footer.jsx` | `Link from react-router-dom` → `Link from next/link` |
| `BlogCard.jsx` | `Link to=` → `Link href=` |

### Added
| File | Purpose |
|------|---------|
| `components/layout/ThemeProvider.jsx` | Client component wrapping Navbar + Footer + theme state |
| `app/layout.jsx` | Root layout with metadata + fonts + ThemeProvider |
| `app/blog/layout.jsx` | Blog-specific metadata |
| `app/blog/[slug]/page.jsx` | Server component with `generateMetadata()` + `generateStaticParams()` |
| `app/blog/[slug]/BlogPostClient.jsx` | Client component with blog post rendering |
| `app/not-found.jsx` | Custom 404 page |

### Only Added "use client" (zero logic changes)
- `hooks/useInView.js`
- `components/ui/Reveal.jsx`
- `components/sections/Hero.jsx`
- `components/sections/CTA.jsx`
- `components/sections/Contact.jsx`
- `components/sections/BlogPreview.jsx`

### Completely Unchanged (copied as-is)
- All icons (`components/icons/index.jsx`)
- All data files (`data/*.js`)
- All utils (`utils/*.js`)
- `About.jsx`, `Skills.jsx`, `Projects.jsx`, `Experience.jsx`, `Testimonials.jsx`, `ExperienceAndTestimonials.jsx`
- `SectionHeader.jsx`
- `globals.css` (only added html/body reset at top)

## SEO: What You Get Now

| Feature | Old (Vite SPA) | New (Next.js) |
|---------|---------------|---------------|
| Homepage `<title>` | Static in index.html | Dynamic via `metadata` in layout.jsx |
| Blog post `<title>` | Same for all pages | Unique per post via `generateMetadata()` |
| Blog post `<meta description>` | None | Auto-generated from `blog.summary` |
| OpenGraph tags | Single set | Unique per blog post |
| Static HTML | Empty `<div>` | Full pre-rendered content |
| Blog pages at build time | Client-rendered | Pre-built via `generateStaticParams()` |
| Scroll-to-top | Manual ScrollToTop component | Automatic (Next.js default) |
| 404 page | Generic browser 404 | Custom branded page |

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Next.js portfolio"
git remote add origin https://github.com/kunalkejriwal/portfolio.git
git push -u origin main

# 2. Go to vercel.com → Import → Select repo → Deploy
# 3. Add domain: Settings → Domains → kunalkejriwal.com
```

## Adding Blog Posts

Same as before — add to `data/blogs.js`:

```javascript
{
  title: "Your New Post",
  category: "Backend Engineering",
  time: "7 min",
  summary: "One-liner for cards and meta description.",
  content: `Your markdown-like content here...`,
},
```

The post automatically appears on the homepage, /blog page, and gets its own URL with unique SEO metadata.

## Future: Migrate to MDX (Without Breaking Anything)

When ready, you can move blog content from `data/blogs.js` to individual `.mdx` files:

### Step 1: Install MDX support
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

### Step 2: Create content directory
```
content/
  blog/
    rate-limiter-from-scratch.mdx
    vector-databases-ai-search.mdx
```

### Step 3: Each .mdx file uses frontmatter
```markdown
---
title: "How I Designed a Rate Limiter from Scratch"
summary: "A deep dive into token bucket algorithms..."
category: "System Design"
date: "2025-03-15"
readTime: "8 min"
---

Your actual content with **real Markdown**, code blocks, images, etc.
```

### Step 4: Update `app/blog/[slug]/page.jsx` to read from `.mdx` files instead of `data/blogs.js`

The component architecture (BlogCard, BlogPreview, BlogPostClient) stays identical — only the data source changes. You can even keep `data/blogs.js` as a fallback index while migrating posts one at a time.
