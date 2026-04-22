import React, { useEffect, useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    registered: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    registered: "2024-01-14",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    registered: "2024-01-13",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    registered: "2024-01-12",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    registered: "2024-01-11",
  },
  {
    id: 6,
    name: "Diana Davis",
    email: "diana@example.com",
    registered: "2024-01-10",
  },
  {
    id: 7,
    name: "Eve Miller",
    email: "eve@example.com",
    registered: "2024-01-09",
  },
  {
    id: 8,
    name: "Frank Garcia",
    email: "frank@example.com",
    registered: "2024-01-08",
  },
  {
    id: 9,
    name: "Grace Lee",
    email: "grace@example.com",
    registered: "2024-01-07",
  },
  {
    id: 10,
    name: "Henry Taylor",
    email: "henry@example.com",
    registered: "2024-01-06",
  },
];

const AdminPanel = () => {
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const [leadsRes, blogsRes] = await Promise.all([
        fetch("http://localhost:5000/api/leads/consultation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:5000/api/blogs?includeDrafts=true", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!leadsRes.ok || !blogsRes.ok) throw new Error("Failed to fetch data");

      const leadsData = await leadsRes.json();
      const blogsData = await blogsRes.json();

      setLeads(leadsData);
      setBlogs(blogsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalLeads = leads.length;
  const totalBlogs = blogs.length;
  const totalUsers = mockUsers.length;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="text-white text-sm tracking-[0.2em] uppercase">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="text-red-400 text-sm">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
          <h3 className="text-4xl font-bold text-white mb-2">{totalLeads}</h3>
          <p className="text-gray-400 uppercase text-xs tracking-[0.2em]">
            Total Enquiries
          </p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
          <h3 className="text-4xl font-bold text-white mb-2">{totalBlogs}</h3>
          <p className="text-gray-400 uppercase text-xs tracking-[0.2em]">
            Total Blogs
          </p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
          <h3 className="text-4xl font-bold text-white mb-2">{totalUsers}</h3>
          <p className="text-gray-400 uppercase text-xs tracking-[0.2em]">
            Registered Users
          </p>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enquiries (Leads) */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg uppercase tracking-[0.1em] text-gray-300">
              Recent Enquiries
            </h2>
            <a
              href="/admin/leads"
              className="text-xs uppercase tracking-[0.15em] bg-white/20 px-3 py-1 rounded-xl hover:bg-white/30"
            >
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-[0.12em]">
              <thead className="text-gray-400">
                <tr>
                  <th className="pb-4 pr-4">Name</th>
                  <th className="pb-4 pr-4">Email</th>
                  <th className="pb-4">Category</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map((lead, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="py-3 pr-4">{lead.name || "N/A"}</td>
                    <td className="py-3 pr-4 max-w-xs truncate">
                      {lead.email || "N/A"}
                    </td>
                    <td className="py-3">{lead.category || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registered Users */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg uppercase tracking-[0.1em] text-gray-300">
              Recent Users
            </h2>
            <a
              href="/admin/users"
              className="text-xs uppercase tracking-[0.15em] bg-white/20 px-3 py-1 rounded-xl hover:bg-white/30"
            >
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-[0.12em]">
              <thead className="text-gray-400">
                <tr>
                  <th className="pb-4 pr-4">Name</th>
                  <th className="pb-4 pr-4">Email</th>
                  <th className="pb-4">Registered</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.slice(0, 5).map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="py-3 pr-4">{user.name}</td>
                    <td className="py-3 pr-4">{user.email}</td>
                    <td className="py-3">{user.registered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl lg:col-span-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg uppercase tracking-[0.1em] text-gray-300">
            Recent Blogs
          </h2>
          <a
            href="/admin/blogs"
            className="text-xs uppercase tracking-[0.15em] bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30"
          >
            Manage All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tracking-[0.12em]">
            <thead className="text-gray-400">
              <tr>
                <th className="pb-4 pr-4">Title</th>
                <th className="pb-4 pr-4">Status</th>
                <th className="pb-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {blogs.slice(0, 5).map((blog, idx) => (
                <tr
                  key={idx}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="py-3 pr-4 max-w-md truncate">{blog.title}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        blog.status === "published" ?
                          "bg-green-500/30 text-green-300 border border-green-500/50"
                        : "bg-gray-500/30 text-gray-300 border border-gray-500/50"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {new Date(blog.createdAt).toLocaleDateString()}
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

export default AdminPanel;
