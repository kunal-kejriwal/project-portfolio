import BlogPostClient from "./BlogPostClient";
import blogs from "../../../data/blogs";

// Generate static pages for all blog slugs at build time
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Dynamic SEO metadata per blog post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: `${blog.title} | Kunal Kejriwal`,
      description: blog.summary,
      type: "article",
      url: `https://www.kunalkejriwal.com/blog/${blog.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
    },
    alternates: {
      canonical: `https://www.kunalkejriwal.com/blog/${blog.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
