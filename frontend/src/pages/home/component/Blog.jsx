import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";

const Blog = () => {
  const blogPostsRaw = useAppStore((state) => state.blogs.list);
  const error = useAppStore((state) => state.blogs.listError);
  const loadBlogs = useAppStore((state) => state.loadBlogs);
  const blogPosts = useMemo(() => blogPostsRaw.slice(0, 3), [blogPostsRaw]);

  useEffect(() => {
    if (!blogPostsRaw.length) {
      loadBlogs();
    }
  }, [blogPostsRaw.length, loadBlogs]);

  return (
    <section className="relative px-4 py-16 font-body sm:px-6 lg:px-8">
      <style>
        {`
          @keyframes blogFadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes blogPulse {
            0%, 100% { transform: scale(1); opacity: 0.55; }
            50% { transform: scale(1.15); opacity: 0.85; }
          }
          .blog-reveal {
            opacity: 0;
            animation: blogFadeUp 0.75s ease forwards;
          }
        `}
      </style>

      <div className="pulse-soft pointer-events-none absolute -top-12 left-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl"
        style={{ animation: "blogPulse 5s ease-in-out infinite" }}
      />

      <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-[#101114] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)] sm:p-10">
        <div className="blog-reveal mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text font-heading text-4xl font-black uppercase tracking-[0.2em] text-transparent sm:text-5xl">
            Journal
          </h2>
          <p className="max-w-xl font-body text-sm leading-relaxed text-gray-400 sm:text-base">
            Practical ideas on personal branding, visual storytelling, and
            design strategy to help you build a clear and trusted digital
            presence.
          </p>
        </div>

        {error ? <p className="mb-4 text-sm text-red-300">{error}</p> : null}

        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug}`}
              className="blog-reveal group block overflow-hidden rounded-4xl border border-white/10 bg-[#191b20] transition duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)]"
              style={{ animationDelay: `${index * 0.14 + 0.12}s` }}
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <img
                  src={post.heroImage || post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/0 via-transparent to-orange-300/0 transition duration-500 group-hover:from-cyan-500/20 group-hover:to-orange-300/20" />
                <span className="absolute top-4 left-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
                  FEATURED
                </span>
              </div>

              <div className="space-y-2.5 p-4 sm:p-5">
                <p className="font-body text-[0.68rem] font-semibold tracking-[0.18em] text-gray-400">
                  {post.tags?.[0] || "INSIGHTS"}
                </p>
                <h3 className="font-heading text-lg font-semibold leading-tight text-white sm:text-[1.25rem]">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="font-body text-xs tracking-wide text-gray-400">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
                  </p>
                  <span className="font-body text-xs font-semibold tracking-[0.12em] text-cyan-300 transition group-hover:text-cyan-200">
                    READ NOW
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!blogPosts.length && !error ? (
          <p className="mt-5 text-sm text-gray-400">Published posts will appear here automatically.</p>
        ) : null}
      </div>
    </section>
  );
};

export default Blog;
