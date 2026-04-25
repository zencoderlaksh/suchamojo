import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE_URL}/api/leads/consultation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Category", "SubmittedAt"];
    const rows = leads.map((l) => [
      l.name,
      l.email,
      l.phone,
      l.category,
      l.submittedAt,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-white text-sm tracking-[0.2em] uppercase animate-pulse">
          Loading leads...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-sm tracking-[0.2em] uppercase text-gray-300">
            Consultation Leads ({leads.length})
          </h1>
          <button
            onClick={exportCSV}
            className="text-xs uppercase tracking-[0.15em] bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
            disabled={leads.length === 0}
          >
            Export CSV
          </button>
        </div>

        {leads.length === 0 ?
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm uppercase tracking-[0.15em] mb-2">
              No leads yet
            </p>
            <p className="text-xs">
              Leads from form submissions will appear here.
            </p>
          </div>
        : <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-[0.12em]">
              <thead className="text-gray-400">
                <tr>
                  <th className="pb-4 pr-4 font-medium">Name</th>
                  <th className="pb-4 pr-4">Email</th>
                  <th className="pb-4 pr-4">Phone</th>
                  <th className="pb-4 pr-4 min-w-[120px]">Category</th>
                  <th className="pb-4 min-w-[140px]">Submitted</th>
                  <th className="pb-4 pr-4">Qualification</th>
                  <th className="pb-4">Email Sent</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 pr-4 font-medium">{lead.name}</td>
                    <td className="py-4 pr-4 max-w-xs truncate">
                      {lead.email}
                    </td>
                    <td className="py-4 pr-4">{lead.phone || "N/A"}</td>
                    <td className="py-4 pr-4">{lead.category}</td>
                    <td className="py-4 pr-4 text-xs text-gray-400">
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lead.qualificationTier === "high" ?
                            "bg-green-500/20 text-green-400 border border-green-500/30"
                          : lead.qualificationTier === "medium" ?
                            "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}
                      >
                        {lead.qualificationTier || "low"}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lead.emailStatus?.user === "sent" ?
                            "bg-green-500/20 text-green-400 border border-green-500/30"
                          : lead.emailStatus?.user === "failed" ?
                            "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}
                        title={
                          lead.emailStatus?.user === "failed" ?
                            "Check backend logs for error"
                          : ""
                        }
                      >
                        {lead.emailStatus?.user || "disabled"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default Leads;
