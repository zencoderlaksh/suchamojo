import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    status: "draft",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/blogs?includeDrafts=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
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
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newBlog,
          tags: newBlog.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to create blog");
      setNewBlog({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        status: "draft",
      });
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update blog");
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setEditForm({
      title: blog.title,
      excerpt: blog.excerpt,
      status: blog.status,
    });
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl tracking-[0.2em] uppercase text-gray-300 mb-6">
          Blog Management
        </h1>
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-300 text-sm mb-4">
            {error}
          </div>
        )}
      </div>

      {/* New Blog Form */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 mb-8">
        <h2 className="text-lg uppercase tracking-[0.1em] mb-4 text-gray-300">
          Add New Blog
        </h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            placeholder="Title"
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm"
            required
          />
          <input
            value={newBlog.excerpt}
            onChange={(e) =>
              setNewBlog({ ...newBlog, excerpt: e.target.value })
            }
            placeholder="Excerpt"
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm"
            required
          />
          <input
            value={newBlog.tags}
            onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
            placeholder="Tags (comma separated)"
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm md:col-span-2"
          />
          <textarea
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            placeholder="Content (markdown/HTML)"
            className="p-3 h-24 bg-white/5 border border-white/20 rounded-xl text-sm md:col-span-2"
            required
          />
          <select
            value={newBlog.status}
            onChange={(e) => setNewBlog({ ...newBlog, status: e.target.value })}
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            type="submit"
            className="md:col-span-2 bg-white text-black px-6 py-3 rounded-xl uppercase text-xs tracking-[0.15em] font-bold hover:bg-gray-200"
          >
            Create Blog
          </button>
        </form>
      </div>

      {/* Blogs List */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg uppercase tracking-[0.1em] text-gray-300">
            All Blogs ({blogs.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tracking-[0.12em]">
            <thead className="text-gray-400">
              <tr>
                <th className="pb-4 pr-4 w-64">Title</th>
                <th className="pb-4 pr-4">Excerpt</th>
                <th className="pb-4 pr-4">Status</th>
                <th className="pb-4 pr-4">Tags</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="py-3 pr-4 font-medium max-w-xs truncate">
                    {editingId === blog._id ?
                      <input
                        value={editForm.title || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="p-1 bg-transparent border-b border-white/50 w-full text-white"
                      />
                    : blog.title}
                  </td>
                  <td className="py-3 pr-4 max-w-md truncate">
                    {editingId === blog._id ?
                      <input
                        value={editForm.excerpt || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, excerpt: e.target.value })
                        }
                        className="p-1 bg-transparent border-b border-white/50 w-full text-white"
                      />
                    : blog.excerpt}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        blog.status === "published" ?
                          "bg-green-500/30 text-green-300 border border-green-500/50"
                        : "bg-gray-500/30 text-gray-300 border border-gray-500/50"
                      }`}
                    >
                      {editingId === blog._id ?
                        <select
                          value={editForm.status || blog.status}
                          onChange={(e) =>
                            setEditForm({ ...editForm, status: e.target.value })
                          }
                          className="bg-transparent border border-white/50 rounded text-xs p-1"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      : blog.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{blog.tags?.join(", ") || ""}</td>
                  <td className="py-3">
                    {editingId === blog._id ?
                      <>
                        <button
                          onClick={() => handleUpdate(blog._id)}
                          className="mr-2 text-green-400 hover:text-green-300 text-xs uppercase tracking-wider"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-400 hover:text-gray-300 text-xs uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      </>
                    : <>
                        <button
                          onClick={() => startEdit(blog)}
                          className="mr-2 text-blue-400 hover:text-blue-300 text-xs uppercase tracking-wider"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-400 hover:text-red-300 text-xs uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
