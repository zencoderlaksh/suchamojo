import React, { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

const Blog = () => {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') || '';
  const posts = useAppStore((state) => state.blogs.list);
  const loading = useAppStore((state) => state.blogs.listLoading);
  const error = useAppStore((state) => state.blogs.listError);
  const loadBlogs = useAppStore((state) => state.loadBlogs);

  useEffect(() => {
    loadBlogs(activeTag || undefined);
  }, [activeTag, loadBlogs]);

  const tags = useMemo(() => {
    const set = new Set();
    posts.forEach((post) => (post.tags || []).forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [posts]);

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-14 pt-10 text-white sm:px-6 lg:px-8">
      <div className="rounded-[2.2rem] border border-white/10 bg-[#0b0b0f] p-6 sm:p-8">
        <p className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-gray-400">Blog</p>
        <h1 className="mt-3 font-heading text-4xl uppercase tracking-[0.08em] sm:text-5xl">
          Latest Insights
        </h1>
        <p className="mt-4 max-w-[56ch] font-body text-sm text-gray-300 sm:text-base">
          Published articles are auto-listed from CMS and sorted by latest publish date.
        </p>

        {tags.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/blog"
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.16em] ${
                !activeTag
                  ? 'border-white bg-white text-black'
                  : 'border-white/20 text-gray-300 hover:border-white/40'
              }`}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.16em] ${
                  activeTag === tag
                    ? 'border-white bg-white text-black'
                    : 'border-white/20 text-gray-300 hover:border-white/40'
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}

        {loading ? <p className="mt-8 text-sm text-gray-300">Loading posts...</p> : null}
        {error ? <p className="mt-8 text-sm text-red-300">{error}</p> : null}

        {!loading && !error && !posts.length ? (
          <p className="mt-8 text-sm text-gray-300">No published posts yet.</p>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post._id} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="font-body text-xs uppercase tracking-[0.16em] text-gray-400">
                {(post.author || 'Suchamojo').toUpperCase()} ·{' '}
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
              </p>
              <h2 className="mt-3 font-heading text-2xl uppercase tracking-[0.06em]">{post.title}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-300">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-5 inline-flex text-xs uppercase tracking-[0.14em] text-cyan-300 hover:text-cyan-200"
              >
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
