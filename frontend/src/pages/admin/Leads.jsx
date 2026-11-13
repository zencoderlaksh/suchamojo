import React, { useEffect, useState } from "react";
import { fetchAdminLeads, deleteAdminLead } from "../../lib/api";

const PRESET_CATEGORIES = [
  "All",
  "1:1 Consulting",
  "Team Training",
  "Cohort",
  "MFD Branding",
];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [search, setSearch] = useState("");
  const [activeLead, setActiveLead] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminLeads();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError(err.message || "Failed to fetch consultation leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDeleteLead = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete lead from "${name}"?`)) {
      return;
    }
    try {
      setError("");
      await deleteAdminLead(id);
      setSuccessMsg(`Deleted lead from "${name}"`);
      setLeads((prev) => prev.filter((l) => (l._id || l.id) !== id));
      if ((activeLead?._id || activeLead?.id) === id) setActiveLead(null);
    } catch (err) {
      setError(err.message || "Failed to delete lead");
    }
  };

  // Derive unique categories from actual data
  const dynamicCategories = Array.from(
    new Set(
      leads
        .map((l) => l.category)
        .filter(Boolean)
        .filter((c) => !PRESET_CATEGORIES.includes(c))
    )
  );

  const allCategoryTabs = [...PRESET_CATEGORIES, ...dynamicCategories];

  // Filtering
  const filteredLeads = leads.filter((lead) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (lead.category || "").toLowerCase() === selectedCategory.toLowerCase();

    const matchesTier =
      selectedTier === "All" ||
      (lead.qualificationTier || "medium").toLowerCase() === selectedTier.toLowerCase();

    const query = search.toLowerCase();
    const matchesSearch =
      (lead.name || "").toLowerCase().includes(query) ||
      (lead.email || "").toLowerCase().includes(query) ||
      (lead.phone || "").toLowerCase().includes(query) ||
      (lead.sourcePage || "").toLowerCase().includes(query) ||
      (lead.quickSummary || "").toLowerCase().includes(query);

    return matchesCategory && matchesTier && matchesSearch;
  });

  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Category",
      "ServiceInterest",
      "SourcePage",
      "TargetAudience",
      "Offer",
      "SebiRegistered",
      "DeviceType",
      "QualificationTier",
      "SubmittedAt",
    ];

    const rows = filteredLeads.map((l) => [
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.category || "").replace(/"/g, '""')}"`,
      `"${(l.serviceInterest || "").replace(/"/g, '""')}"`,
      `"${(l.sourcePage || "").replace(/"/g, '""')}"`,
      `"${(l.audience || "").replace(/"/g, '""')}"`,
      `"${(l.offer || "").replace(/"/g, '""')}"`,
      l.sebiRegistered ? "Yes" : l.sebiRegistered === false ? "No" : "N/A",
      `"${l.deviceType || ""}"`,
      `"${l.qualificationTier || ""}"`,
      `"${l.submittedAt || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `suchamojo-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Consultation Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Total submissions collected: <span className="text-orange-400 font-bold">{leads.length}</span> ({filteredLeads.length} matching filters)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs text-slate-300 transition"
            title="Refresh Leads"
          >
            ↻ Refresh
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredLeads.length === 0}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition disabled:opacity-50"
          >
            Export CSV ({filteredLeads.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          {successMsg}
        </div>
      )}

      {/* Filter Bar: Category Tabs */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Filter by Service Category
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allCategoryTabs.map((category) => {
            const count =
              category === "All"
                ? leads.length
                : leads.filter((l) => (l.category || "").toLowerCase() === category.toLowerCase()).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected ? "bg-black/30 text-white" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Tier Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-white/10">
          <div className="sm:col-span-8">
            <input
              type="text"
              placeholder="Search leads by name, email, phone, or page..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-white outline-none focus:border-orange-500"
            >
              <option value="All">Tier: All Qualifications</option>
              <option value="high">Tier: High Priority</option>
              <option value="medium">Tier: Medium Priority</option>
              <option value="low">Tier: Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            Loading leads data...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            No consultation leads found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400 uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Source Page</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => {
                  const leadId = lead._id || lead.id;
                  return (
                    <tr
                      key={leadId}
                      className="hover:bg-white/5 transition cursor-pointer"
                      onClick={() => setActiveLead(lead)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-[11px] text-slate-400">{lead.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {lead.phone || "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block rounded-lg bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 text-[11px] font-medium text-orange-400">
                          {lead.category || "General"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        /{lead.sourcePage || "unknown"}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-400">
                        {lead.submittedAt
                          ? new Date(lead.submittedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            lead.qualificationTier === "high"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : lead.qualificationTier === "medium"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                          }`}
                        >
                          {lead.qualificationTier || "medium"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setActiveLead(lead)}
                            className="rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1 text-[11px] text-white transition"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleDeleteLead(leadId, lead.name)}
                            className="rounded-lg bg-red-500/10 hover:bg-red-500 p-1.5 text-red-400 hover:text-white transition"
                            title="Delete Lead"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {activeLead && (
        <div
          onClick={() => setActiveLead(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#121216] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Lead Details: {activeLead.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submitted: {activeLead.submittedAt ? new Date(activeLead.submittedAt).toLocaleString() : "N/A"}
                </p>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Email</span>
                  <a href={`mailto:${activeLead.email}`} className="text-orange-400 hover:underline">
                    {activeLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Phone</span>
                  <a href={`tel:${activeLead.phone}`} className="text-white hover:underline">
                    {activeLead.phone || "Not provided"}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                  <span className="font-semibold text-white">{activeLead.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Source Page</span>
                  <span className="font-mono text-slate-300">/{activeLead.sourcePage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Device</span>
                  <span className="text-slate-300 capitalize">{activeLead.deviceType || "Desktop"}</span>
                </div>
              </div>

              {activeLead.audience && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase mb-1">Target Audience</span>
                  <p className="text-slate-200">{activeLead.audience}</p>
                </div>
              )}

              {activeLead.offer && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase mb-1">Current Offer / Service</span>
                  <p className="text-slate-200">{activeLead.offer}</p>
                </div>
              )}

              {activeLead.quickSummary && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase mb-1">System Summary</span>
                  <p className="text-slate-300 leading-relaxed">{activeLead.quickSummary}</p>
                </div>
              )}

              {activeLead.sebiRegistered !== null && activeLead.sebiRegistered !== undefined && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase mb-1">SEBI Registered</span>
                  <span className={activeLead.sebiRegistered ? "text-emerald-400 font-bold" : "text-slate-400"}>
                    {activeLead.sebiRegistered ? "Yes" : "No"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <a
                href={`mailto:${activeLead.email}?subject=Regarding your consultation request with SuchaMojo`}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2 text-xs font-bold uppercase text-white transition"
              >
                Reply via Email ✉
              </a>

              <button
                onClick={() => handleDeleteLead(activeLead._id || activeLead.id, activeLead.name)}
                className="rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-2 text-xs text-red-400 transition"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
