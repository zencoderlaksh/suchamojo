import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const AdminPanel = () => {
  const settings = useAppStore((state) => state.settings);
  const saveAdminSettings = useAppStore((state) => state.saveAdminSettings);
  const adminCreateBlog = useAppStore((state) => state.adminCreateBlog);

  const [adminKey, setAdminKey] = useState('');
  const [ctaEnabled, setCtaEnabled] = useState(settings.cta.enabled);
  const [ctaLabel, setCtaLabel] = useState(settings.cta.label);
  const [ctaBody, setCtaBody] = useState(settings.cta.body);
  const [ctaLink, setCtaLink] = useState(settings.cta.link);
  const [calendarUrl, setCalendarUrl] = useState(settings.calendar.defaultUrl || '');
  const [status, setStatus] = useState('');

  const [blog, setBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: 'Branding',
    heroImage: '',
    status: 'draft',
  });

  const handleSaveSettings = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      await saveAdminSettings(adminKey, {
        cta: {
          enabled: ctaEnabled,
          label: ctaLabel,
          body: ctaBody,
          link: ctaLink,
        },
        calendar: {
          defaultUrl: calendarUrl,
        },
      });
      setStatus('Settings updated');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      await adminCreateBlog(adminKey, {
        ...blog,
        tags: blog.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      });
      setStatus('Blog created');
      setBlog({
        title: '',
        excerpt: '',
        content: '',
        tags: 'Branding',
        heroImage: '',
        status: 'draft',
      });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1080px] px-4 pb-14 pt-10 text-white sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0f] p-6 sm:p-8">
        <h1 className="font-heading text-4xl uppercase tracking-[0.08em]">Admin Control</h1>
        <p className="mt-3 text-sm text-gray-300">
          Manage CTA/copy/calendar and publish blogs from one place.
        </p>

        <label className="mt-6 block text-xs uppercase tracking-[0.16em] text-gray-400">
          Admin key
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
        </label>

        <form onSubmit={handleSaveSettings} className="mt-8 space-y-3 rounded-xl border border-white/10 p-4">
          <h2 className="text-sm uppercase tracking-[0.14em] text-gray-300">Site Settings</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ctaEnabled}
              onChange={(event) => setCtaEnabled(event.target.checked)}
            />
            CTA enabled
          </label>
          <input
            value={ctaLabel}
            onChange={(event) => setCtaLabel(event.target.value)}
            placeholder="CTA label"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
          <input
            value={ctaLink}
            onChange={(event) => setCtaLink(event.target.value)}
            placeholder="CTA link"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
          <textarea
            value={ctaBody}
            onChange={(event) => setCtaBody(event.target.value)}
            placeholder="CTA copy"
            className="h-20 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
          <input
            value={calendarUrl}
            onChange={(event) => setCalendarUrl(event.target.value)}
            placeholder="Default calendar URL"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
          <button className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.14em] text-black">
            Save Settings
          </button>
        </form>

        <form onSubmit={handleCreateBlog} className="mt-6 space-y-3 rounded-xl border border-white/10 p-4">
          <h2 className="text-sm uppercase tracking-[0.14em] text-gray-300">Add Blog</h2>
          <input
            value={blog.title}
            onChange={(event) => setBlog((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Title"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
            required
          />
          <input
            value={blog.excerpt}
            onChange={(event) => setBlog((prev) => ({ ...prev, excerpt: event.target.value }))}
            placeholder="Excerpt"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
            required
          />
          <textarea
            value={blog.content}
            onChange={(event) => setBlog((prev) => ({ ...prev, content: event.target.value }))}
            placeholder="Content"
            className="h-32 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
            required
          />
          <input
            value={blog.heroImage}
            onChange={(event) => setBlog((prev) => ({ ...prev, heroImage: event.target.value }))}
            placeholder="Hero image URL"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
          <input
            value={blog.tags}
            onChange={(event) => setBlog((prev) => ({ ...prev, tags: event.target.value }))}
            placeholder="Tags (comma separated)"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          />
          <select
            value={blog.status}
            onChange={(event) => setBlog((prev) => ({ ...prev, status: event.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.14em] text-black">
            Create Blog
          </button>
        </form>

        {status ? <p className="mt-4 text-sm text-cyan-300">{status}</p> : null}
      </div>
    </section>
  );
};

export default AdminPanel;
