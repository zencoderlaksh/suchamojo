import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/api";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filterTab, setFilterTab] = useState("all"); // 'all' | 'published' | 'draft'
  const [searchQuery, setSearchQuery] = useState("");

  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    coverImage: "",
    author: "Shubham Gupta",
    status: "published",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE_URL}/api/blogs?includeDrafts=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        throw new Error(
          "Admin session expired or unauthorized. Please re-login with websiteshubham8@gmail.com."
        );
      }

      const data = await res.json().catch(() => ([]));
      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch blogs from server");
      }

      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      setSuccessMsg("");

      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("No active admin session found. Please log in first.");
      }

      const parsedTags =
        typeof newBlog.tags === "string"
          ? newBlog.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

      const payload = {
        title: newBlog.title.trim(),
        excerpt: newBlog.excerpt.trim(),
        content: newBlog.content.trim(),
        coverImage: newBlog.coverImage.trim(),
        heroImage: newBlog.coverImage.trim(),
        author: newBlog.author.trim() || "Shubham Gupta",
        tags: parsedTags,
        status: newBlog.status,
      };

      const res = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to publish blog");
      }

      setSuccessMsg(
        `✓ Blog "${data.title}" successfully ${
          data.status === "published" ? "published live" : "saved as draft"
        }!`
      );

      // Reset form
      setNewBlog({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        coverImage: "",
        author: "Shubham Gupta",
        status: "published",
      });

      // Refresh list
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Failed to create blog");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccessMsg("");

      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to update blog");

      setSuccessMsg(`✓ Blog "${data.title || "Post"}" updated successfully!`);
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || "this blog"}"?`)) {
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to delete blog");

      setSuccessMsg("✓ Blog post deleted successfully.");
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Failed to delete blog");
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setEditForm({
      title: blog.title,
      excerpt: blog.excerpt,
      status: blog.status,
      author: blog.author || "Shubham Gupta",
      coverImage: blog.coverImage || "",
    });
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filterTab === "published" && blog.status !== "published") return false;
    if (filterTab === "draft" && blog.status !== "draft") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (blog.title || "").toLowerCase().includes(q);
      const matchExcerpt = (blog.excerpt || "").toLowerCase().includes(q);
      const matchTags = (blog.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchExcerpt || matchTags;
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Blog Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish articles, write case studies, and manage editorial status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/blog"
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300 transition"
          >
            View Live Blog Page ↗
          </Link>
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300 transition"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span>{error}</span>
          {(error.includes("expired") || error.includes("unauthorized") || error.includes("token")) && (
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
              }}
              className="rounded-lg bg-red-500/30 hover:bg-red-500/50 px-3 py-1.5 text-xs font-bold text-white transition whitespace-nowrap"
            >
              Log In Again →
            </button>
          )}
        </div>
      )}

      {successMsg && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          {successMsg}
        </div>
      )}

      {/* Add New Blog Form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-orange-400 mb-4 flex items-center gap-2">
          <span>✍</span> Create New Article / Case Study
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                placeholder="e.g. How Founder-Led Video Converts 3x Higher"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                placeholder="Shubham Gupta"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Excerpt / Short Summary *
            </label>
            <input
              type="text"
              value={newBlog.excerpt}
              onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
              placeholder="A brief 1-2 sentence hook displayed on blog cards and search engines"
              className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newBlog.tags}
                onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                placeholder="Personal Branding, Video Production, MFDs"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Cover Image URL (ImageKit or web link)
              </label>
              <input
                type="url"
                value={newBlog.coverImage}
                onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                placeholder="https://ik.imagekit.io/zyekgh52m/..."
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Full Content (HTML or Markdown) *
            </label>
            <textarea
              rows={8}
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              placeholder="Write or paste your article content here..."
              className="w-full rounded-xl border border-white/10 bg-black/60 p-4 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-sans leading-relaxed"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-300">Publishing Status:</label>
              <select
                value={newBlog.status}
                onChange={(e) => setNewBlog({ ...newBlog, status: e.target.value })}
                className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="published">🟢 Published (Live immediately)</option>
                <option value="draft">🟡 Draft (Hidden from public site)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition disabled:opacity-50 shadow-lg shadow-orange-500/20"
            >
              {submitting ? "Publishing..." : newBlog.status === "published" ? "Publish Article Live" : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>

      {/* Blogs List */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: `All (${blogs.length})` },
              { id: "published", label: `Published (${blogs.filter((b) => b.status === "published").length})` },
              { id: "draft", label: `Drafts (${blogs.filter((b) => b.status === "draft").length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  filterTab === tab.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title or tag..."
            className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 w-full sm:w-64"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            Loading articles from database...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No articles found matching filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="pb-3 pr-4">Title & Slug</th>
                  <th className="pb-3 pr-4">Excerpt</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Tags</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 pr-4 max-w-xs">
                      {editingId === blog._id ? (
                        <input
                          type="text"
                          value={editForm.title || ""}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full rounded border border-white/20 bg-black/60 px-2 py-1 text-xs text-white"
                        />
                      ) : (
                        <div>
                          <div className="font-semibold text-white truncate max-w-xs">{blog.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-xs">
                            /blog/{blog.slug}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 pr-4 max-w-xs">
                      {editingId === blog._id ? (
                        <textarea
                          rows={2}
                          value={editForm.excerpt || ""}
                          onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                          className="w-full rounded border border-white/20 bg-black/60 px-2 py-1 text-xs text-white"
                        />
                      ) : (
                        <p className="text-slate-300 text-[11px] line-clamp-2">{blog.excerpt}</p>
                      )}
                    </td>

                    <td className="py-3.5 pr-4">
                      {editingId === blog._id ? (
                        <select
                          value={editForm.status || "draft"}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="rounded border border-white/20 bg-black/60 px-2 py-1 text-xs text-white"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            blog.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              blog.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                          {blog.status}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 pr-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {(blog.tags || []).slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 pr-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString()
                        : new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === blog._id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(blog._id)}
                              disabled={submitting}
                              className="rounded-lg bg-orange-500 hover:bg-orange-600 px-3 py-1 text-[11px] font-bold text-white transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-300 transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-300 transition"
                              title="View on live website"
                            >
                              View ↗
                            </a>
                            <button
                              onClick={() => startEdit(blog)}
                              className="rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] text-slate-300 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id, blog.title)}
                              className="rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2.5 py-1 text-[11px] transition"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
