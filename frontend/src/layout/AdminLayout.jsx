import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/blogs", label: "Blogs" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/media", label: "Media Library" },
  { to: "/admin/seo", label: "SEO" },
  { to: "/admin/settings", label: "Settings" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate, token]);

  if (!token) {
    return <AdminLogin />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-xl p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                SuchaMojo CMS
              </span>
              <h2 className="text-lg font-black tracking-tight text-white mt-0.5">
                Admin Panel
              </h2>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-medium text-slate-400 hover:text-white uppercase tracking-wider transition"
              title="Open public website in a new tab"
            >
              Live Site ↗
            </a>
          </div>

          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs font-semibold tracking-wider uppercase">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition whitespace-nowrap ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-bold"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 hidden md:block">
          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition text-left"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
