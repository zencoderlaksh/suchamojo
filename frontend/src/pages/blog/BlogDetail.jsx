import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = useAppStore((state) => state.blogs.detail);
  const loading = useAppStore((state) => state.blogs.detailLoading);
  const error = useAppStore((state) => state.blogs.detailError);
  const loadBlogDetail = useAppStore((state) => state.loadBlogDetail);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      setNotFound(false);
      const response = await loadBlogDetail(slug);
      if (!response?.found && String(response?.error || '').toLowerCase().includes('not found')) {
        setNotFound(true);
      }
    };

    load();
  }, [slug, loadBlogDetail]);

  if (notFound) return <Navigate to="/blog" replace />;

  return (
    <section className="mx-auto w-full max-w-[980px] px-4 pb-14 pt-10 text-white sm:px-6 lg:px-8">
      {loading ? <p className="text-sm text-gray-300">Loading article...</p> : null}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      {!loading && !error && post ? (
        <article className="rounded-[2rem] border border-white/10 bg-[#0b0b0f] p-6 sm:p-8">
          <p className="font-body text-xs uppercase tracking-[0.16em] text-gray-400">
            {(post.author || 'Suchamojo').toUpperCase()} ·{' '}
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
          </p>
          <h1 className="mt-4 font-heading text-4xl uppercase tracking-[0.06em] sm:text-5xl">
            {post.title}
          </h1>
          {post.heroImage || post.coverImage ? (
            <img
              src={post.heroImage || post.coverImage}
              alt={post.title}
              loading="eager"
              decoding="async"
              className="mt-6 h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
            />
          ) : null}
          <div className="mt-8 whitespace-pre-wrap font-body text-sm leading-8 text-gray-200 sm:text-base">
            {post.content}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-flex text-xs uppercase tracking-[0.14em] text-cyan-300 hover:text-cyan-200"
          >
            Back to Blog
          </Link>
        </article>
      ) : null}
    </section>
  );
};

export default BlogDetail;
