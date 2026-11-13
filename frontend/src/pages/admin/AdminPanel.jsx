import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdminLeads, fetchAdminBlogs, fetchAdminTestimonials, fetchMediaAssets } from "../../lib/api";

const mockUsers = [
  { id: 1, name: "Shubham Gupta", email: "websiteshubham8@gmail.com", role: "SuperAdmin" },
];

const AdminPanel = () => {
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [mediaCount, setMediaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [leadsRes, blogsRes, testRes, mediaRes] = await Promise.allSettled([
        fetchAdminLeads(),
        fetchAdminBlogs(),
        fetchAdminTestimonials(),
        fetchMediaAssets({ path: "all", limit: 100 }),
      ]);

      if (leadsRes.status === "fulfilled" && Array.isArray(leadsRes.value)) {
        setLeads(leadsRes.value);
      }
      if (blogsRes.status === "fulfilled" && Array.isArray(blogsRes.value)) {
        setBlogs(blogsRes.value);
      }
      if (testRes.status === "fulfilled" && Array.isArray(testRes.value)) {
        setTestimonials(testRes.value);
      }
      if (mediaRes.status === "fulfilled" && mediaRes.value?.data) {
        setMediaCount(mediaRes.value.count || mediaRes.value.data.length || 0);
      }

      // If both primary resources failed, show error banner
      if (leadsRes.status === "rejected" && blogsRes.status === "rejected") {
        setError(leadsRes.reason?.message || blogsRes.reason?.message || "Failed to connect to backend");
      }
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalLeads = leads.length;
  const totalBlogs = blogs.length;
  const totalTestimonials = testimonials.length;

  // Compute category distribution
  const categoryCounts = leads.reduce((acc, lead) => {
    const cat = lead.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System overview, recent enquiries, content status, and media synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs text-slate-300 transition"
          >
            ↻ Refresh Metrics
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 flex items-center justify-between">
          <span>Error loading live data: {error}</span>
          <button
            onClick={fetchDashboardData}
            className="underline font-bold hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/leads"
          className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/50 hover:bg-white/10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-orange-400">
            Total Enquiries
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            {loading ? "..." : totalLeads}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Form submissions</p>
        </Link>

        <Link
          to="/admin/blogs"
          className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/50 hover:bg-white/10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-orange-400">
            Articles & Blogs
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            {loading ? "..." : totalBlogs}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Published & drafts</p>
        </Link>

        <Link
          to="/admin/testimonials"
          className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/50 hover:bg-white/10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-orange-400">
            Testimonials
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            {loading ? "..." : totalTestimonials}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Client reviews</p>
        </Link>

        <Link
          to="/admin/media"
          className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/50 hover:bg-white/10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-orange-400">
            Media CDN Assets
          </p>
          <h3 className="text-3xl font-black text-white mt-2">
            {loading ? "..." : mediaCount}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">ImageKit CDN hosted</p>
        </Link>
      </div>

      {/* Category Breakdown Strip */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Enquiry Breakdown by Category
          </span>
          <Link to="/admin/leads" className="text-xs text-orange-400 hover:underline">
            View All Leads →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {Object.entries(categoryCounts).length === 0 ? (
            <span className="text-xs text-slate-500">No leads captured yet.</span>
          ) : (
            Object.entries(categoryCounts).map(([cat, count]) => (
              <div
                key={cat}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs"
              >
                <span className="text-slate-300 font-medium">{cat}:</span>
                <span className="rounded-md bg-orange-500/20 px-2 py-0.5 text-[11px] font-bold text-orange-400">
                  {count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tables: Recent Enquiries & Recent Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Recent Enquiries
            </h2>
            <Link
              to="/admin/leads"
              className="text-[11px] uppercase tracking-wider text-orange-400 hover:underline"
            >
              View All ({totalLeads})
            </Link>
          </div>

          {leads.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-500">
              No consultation requests yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] uppercase text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="pb-2.5">Name</th>
                    <th className="pb-2.5">Category</th>
                    <th className="pb-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.slice(0, 5).map((lead, idx) => (
                    <tr key={lead._id || idx} className="hover:bg-white/5">
                      <td className="py-2.5 pr-2">
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {lead.email}
                        </div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <span className="rounded-md bg-orange-500/10 px-2 py-0.5 text-[10px] font-medium text-orange-400">
                          {lead.category || "General"}
                        </span>
                      </td>
                      <td className="py-2.5 text-[10px] text-slate-400">
                        {lead.submittedAt
                          ? new Date(lead.submittedAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Blogs */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Recent Blog Posts
            </h2>
            <Link
              to="/admin/blogs"
              className="text-[11px] uppercase tracking-wider text-orange-400 hover:underline"
            >
              Manage ({totalBlogs})
            </Link>
          </div>

          {blogs.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-500">
              No blog posts published yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] uppercase text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="pb-2.5">Title</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogs.slice(0, 5).map((blog, idx) => (
                    <tr key={blog._id || idx} className="hover:bg-white/5">
                      <td className="py-2.5 pr-2 font-medium text-white truncate max-w-[180px]">
                        {blog.title}
                      </td>
                      <td className="py-2.5 pr-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                            blog.status === "published"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-[10px] text-slate-400">
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
