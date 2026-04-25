import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";

const Testimonials = () => {
  const {
    adminTestimonials,
    loadAdminTestimonials,
    createAdminTestimonial,
    updateAdminTestimonial,
    deleteAdminTestimonial,
  } = useAppStore();

  const { list: testimonials, loading } = adminTestimonials;

  const [form, setForm] = useState({
    name: "",
    role: "",
    industry: "",
    quote: "",
    rating: 5,
    tone: "from-white/22 via-white/8 to-transparent",
    status: "published",
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAdminTestimonials();
  }, [loadAdminTestimonials]);

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      industry: "",
      quote: "",
      rating: 5,
      tone: "from-white/22 via-white/8 to-transparent",
      status: "published",
      featured: false,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createAdminTestimonial(form);
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to create testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id) => {
    setSubmitting(true);
    setError("");
    try {
      await updateAdminTestimonial(id, editForm);
      setEditingId(null);
    } catch (err) {
      setError(err.message || "Failed to update testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteAdminTestimonial(id);
    } catch (err) {
      setError(err.message || "Failed to delete testimonial");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      name: item.name,
      role: item.role,
      industry: item.industry,
      quote: item.quote,
      rating: item.rating,
      tone: item.tone,
      status: item.status,
      featured: item.featured,
    });
  };

  const toneOptions = [
    { label: "Default", value: "from-white/22 via-white/8 to-transparent" },
    {
      label: "Warm",
      value: "from-orange-500/20 via-amber-500/10 to-transparent",
    },
    { label: "Cool", value: "from-cyan-500/20 via-blue-500/10 to-transparent" },
    { label: "Rose", value: "from-rose-500/20 via-pink-500/10 to-transparent" },
    {
      label: "Emerald",
      value: "from-emerald-500/20 via-green-500/10 to-transparent",
    },
  ];

  if (loading && testimonials.length === 0) {
    return (
      <div className="p-8 text-white text-sm tracking-[0.2em] uppercase animate-pulse">
        Loading testimonials...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl tracking-[0.2em] uppercase text-gray-300 mb-6">
          Testimonial Management
        </h1>
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-300 text-sm mb-4">
            {error}
          </div>
        )}
      </div>

      {/* Create Form */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 mb-8">
        <h2 className="text-lg uppercase tracking-[0.1em] mb-4 text-gray-300">
          Add New Testimonial
        </h2>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white"
            required
          />
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Role / Designation"
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white"
            required
          />
          <input
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            placeholder="Industry"
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white"
            required
          />
          <select
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r} className="bg-black">
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <select
            value={form.tone}
            onChange={(e) => setForm({ ...form, tone: e.target.value })}
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white"
          >
            {toneOptions.map((t) => (
              <option key={t.value} value={t.value} className="bg-black">
                {t.label}
              </option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white"
          >
            <option value="draft" className="bg-black">
              Draft
            </option>
            <option value="published" className="bg-black">
              Published
            </option>
          </select>
          <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-white"
            />
            Featured
          </label>
          <textarea
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            placeholder="Testimonial quote"
            className="p-3 h-24 bg-white/5 border border-white/20 rounded-xl text-sm text-white md:col-span-2"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 bg-white text-black px-6 py-3 rounded-xl uppercase text-xs tracking-[0.15em] font-bold hover:bg-gray-200 disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Testimonial"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg uppercase tracking-[0.1em] text-gray-300">
            All Testimonials ({testimonials.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tracking-[0.12em]">
            <thead className="text-gray-400">
              <tr>
                <th className="pb-4 pr-4">Name</th>
                <th className="pb-4 pr-4">Role</th>
                <th className="pb-4 pr-4">Industry</th>
                <th className="pb-4 pr-4">Rating</th>
                <th className="pb-4 pr-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="py-3 pr-4 font-medium">
                    {editingId === item._id ?
                      <input
                        value={editForm.name || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="p-1 bg-transparent border-b border-white/50 w-full text-white"
                      />
                    : item.name}
                  </td>
                  <td className="py-3 pr-4">
                    {editingId === item._id ?
                      <input
                        value={editForm.role || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="p-1 bg-transparent border-b border-white/50 w-full text-white"
                      />
                    : item.role}
                  </td>
                  <td className="py-3 pr-4">
                    {editingId === item._id ?
                      <input
                        value={editForm.industry || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, industry: e.target.value })
                        }
                        className="p-1 bg-transparent border-b border-white/50 w-full text-white"
                      />
                    : item.industry}
                  </td>
                  <td className="py-3 pr-4">
                    {editingId === item._id ?
                      <select
                        value={editForm.rating || 5}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            rating: Number(e.target.value),
                          })
                        }
                        className="bg-transparent border border-white/50 rounded text-xs p-1 text-white"
                      >
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r} className="bg-black">
                            {r}
                          </option>
                        ))}
                      </select>
                    : <span className="text-[#ffcc68]">
                        {"★".repeat(item.rating)}
                      </span>
                    }
                  </td>
                  <td className="py-3 pr-4">
                    {editingId === item._id ?
                      <select
                        value={editForm.status || item.status}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            status: e.target.value,
                          })
                        }
                        className="bg-transparent border border-white/50 rounded text-xs p-1 text-white"
                      >
                        <option value="draft" className="bg-black">
                          Draft
                        </option>
                        <option value="published" className="bg-black">
                          Published
                        </option>
                      </select>
                    : <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "published" ?
                            "bg-green-500/30 text-green-300 border border-green-500/50"
                          : "bg-gray-500/30 text-gray-300 border border-gray-500/50"
                        }`}
                      >
                        {item.status}
                      </span>
                    }
                  </td>
                  <td className="py-3">
                    {editingId === item._id ?
                      <>
                        <button
                          onClick={() => handleUpdate(item._id)}
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
                          onClick={() => startEdit(item)}
                          className="mr-2 text-blue-400 hover:text-blue-300 text-xs uppercase tracking-wider"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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
          {testimonials.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm uppercase tracking-[0.15em] mb-2">
                No testimonials yet
              </p>
              <p className="text-xs">
                Create your first testimonial using the form above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
