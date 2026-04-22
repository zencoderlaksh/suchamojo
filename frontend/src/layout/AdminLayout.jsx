import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminLogin from "../pages/admin/AdminLogin";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 p-4">
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-4 h-full">
          <h2 className="text-xs tracking-[0.2em] uppercase text-gray-300 mb-6">
            Admin
          </h2>

          <nav className="flex flex-col gap-4 text-[10px] tracking-[0.15em] uppercase">
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/leads">Leads</Link>
            <Link to="/admin/blogs">Blogs</Link>
            <Link to="/admin/seo">SEO</Link>
            <Link to="/admin/settings">Settings</Link>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin";
              }}
              className="mt-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-left"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
