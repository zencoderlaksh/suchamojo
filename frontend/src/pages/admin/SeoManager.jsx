import React, { useState, useEffect } from "react";
import { fetchAdminSeoPages, upsertPageSeo, deletePageSeo } from "../../lib/api";

const PRESET_PAGES = [
  {
    slug: "home",
    name: "Home / Landing Page",
    path: "/",
    defaultTitle: "SuchaMojo | Story-Led Personal Branding & Content Architecture",
    defaultDesc: "Transform your authority. We help founders, executives, and leaders build iconic personal brands rooted in identity, clarity, and long-term trust.",
  },
  {
    slug: "personal-branding",
    name: "Personal Branding",
    path: "/personal-branding",
    defaultTitle: "Personal Branding for Founders & Leaders | SuchaMojo",
    defaultDesc: "Command industry respect with end-to-end personal branding. Strategic positioning, narrative architecture, and executive content engines.",
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    path: "/content-creation",
    defaultTitle: "High-Impact Content Creation & Video Engine | SuchaMojo",
    defaultDesc: "Cinematic short-form reels, narrative podcasts, and premium visual assets that capture attention, build trust, and drive business conversion.",
  },
  {
    slug: "team-training",
    name: "Team Training",
    path: "/team-training",
    defaultTitle: "In-House Storytelling & Content Workshops | SuchaMojo",
    defaultDesc: "Empower your corporate teams and leadership with battle-tested mobile storytelling, video creation systems, and audience growth playbooks.",
  },
  {
    slug: "about",
    name: "About Us",
    path: "/about",
    defaultTitle: "About SuchaMojo | The Story Behind The Agency",
    defaultDesc: "From frontline mobile journalism to training 30,000+ creators, learn how SuchaMojo redefines digital identity for high-agency professionals.",
  },
  {
    slug: "services",
    name: "Services Overview",
    path: "/services",
    defaultTitle: "Our Services | Strategic Personal Branding & Media Production",
    defaultDesc: "Explore our core offerings: 1:1 Executive Branding, Full-Stack Content Production, and Corporate Storytelling Workshops.",
  },
  {
    slug: "industries",
    name: "Industries",
    path: "/industries",
    defaultTitle: "Industry Solutions | Fintech, Tech, D2C & Professional Services",
    defaultDesc: "Custom content and authority strategies tailored for tech founders, finance leaders, creators, and consulting executives.",
  },
  {
    slug: "blog",
    name: "Journal / Insights",
    path: "/blog",
    defaultTitle: "Journal & Insights | Personal Branding Playbooks | SuchaMojo",
    defaultDesc: "Deep dives on content strategy, creator economics, founder branding, and algorithms from SuchaMojo's practitioners.",
  },
  {
    slug: "contact",
    name: "Contact Us",
    path: "/contact",
    defaultTitle: "Contact SuchaMojo | Start Your Brand Transformation",
    defaultDesc: "Get in touch with SuchaMojo for brand consultations, media partnerships, speaking engagements, and workshop inquiries.",
  },
  {
    slug: "book-a-call",
    name: "Priority Call Booking",
    path: "/book-a-call",
    defaultTitle: "Book a Strategic Clarity Call | SuchaMojo",
    defaultDesc: "Schedule a private 30-minute consultation. No slide decks, no sales scripts — just an honest conversation about where your brand can go.",
  },
  {
    slug: "mfd-page",
    name: "MFD Personal Branding",
    path: "/mfd-page",
    defaultTitle: "Personal Branding for Mutual Fund Distributors | SuchaMojo",
    defaultDesc: "Build digital trust, educate investors compliant with SEBI regulations, and attract high-net-worth clients effortlessly.",
  },
];

const DOMAIN = "https://everythingcontent.in";

const SeoManager = () => {
  const [seoList, setSeoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("home");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [customSlugInput, setCustomSlugInput] = useState("");
  const [showAddCustom, setShowAddCustom] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    slug: "home",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
  });

  const loadSeoPages = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminSeoPages();
      const list = Array.isArray(data) ? data : [];
      setSeoList(list);

      // Populate form for selectedSlug
      populateFormForSlug(selectedSlug, list);
    } catch (err) {
      console.error("Failed to load SEO pages:", err);
      setError(err.message || "Failed to load SEO settings");
    } finally {
      setLoading(false);
    }
  };

  const populateFormForSlug = (slug, list = seoList) => {
    const existing = list.find((item) => item.slug.toLowerCase() === slug.toLowerCase());
    const preset = PRESET_PAGES.find((p) => p.slug === slug);

    if (existing) {
      setFormData({
        slug: existing.slug,
        metaTitle: existing.metaTitle || "",
        metaDescription: existing.metaDescription || "",
        canonicalUrl: existing.canonicalUrl || `${DOMAIN}/${existing.slug === "home" ? "" : existing.slug}`,
        ogTitle: existing.ogTitle || existing.metaTitle || "",
        ogDescription: existing.ogDescription || existing.metaDescription || "",
        ogImage: existing.ogImage || "https://ik.imagekit.io/zyekgh52m/suchamojo/hero/Hero_Banner_-Updated.png",
        status: existing.status || "published",
      });
    } else if (preset) {
      setFormData({
        slug: preset.slug,
        metaTitle: preset.defaultTitle,
        metaDescription: preset.defaultDesc,
        canonicalUrl: `${DOMAIN}${preset.path}`,
        ogTitle: preset.defaultTitle,
        ogDescription: preset.defaultDesc,
        ogImage: "https://ik.imagekit.io/zyekgh52m/suchamojo/hero/Hero_Banner_-Updated.png",
        status: "published",
      });
    } else {
      setFormData({
        slug,
        metaTitle: "",
        metaDescription: "",
        canonicalUrl: `${DOMAIN}/${slug}`,
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        status: "published",
      });
    }
  };

  useEffect(() => {
    loadSeoPages();
  }, []);

  const handleSelectSlug = (slug) => {
    setSelectedSlug(slug);
    populateFormForSlug(slug);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Mirror meta to OG if OG is empty or identical
      ...(name === "metaTitle" && (!prev.ogTitle || prev.ogTitle === prev.metaTitle)
        ? { ogTitle: value }
        : {}),
      ...(name === "metaDescription" &&
      (!prev.ogDescription || prev.ogDescription === prev.metaDescription)
        ? { ogDescription: value }
        : {}),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.metaTitle.trim()) {
      setError("Meta Title is required");
      return;
    }
    if (!formData.metaDescription.trim()) {
      setError("Meta Description is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        metaTitle: formData.metaTitle.trim(),
        metaDescription: formData.metaDescription.trim(),
        canonicalUrl: formData.canonicalUrl.trim() || `${DOMAIN}/${selectedSlug === "home" ? "" : selectedSlug}`,
        ogTitle: formData.ogTitle.trim() || formData.metaTitle.trim(),
        ogDescription: formData.ogDescription.trim() || formData.metaDescription.trim(),
        ogImage: formData.ogImage.trim(),
        status: formData.status,
      };

      const updated = await upsertPageSeo(selectedSlug, payload);
      setSuccess(`SEO settings for "${selectedSlug}" saved successfully!`);

      // Update local list
      setSeoList((prev) => {
        const idx = prev.findIndex((item) => item.slug === selectedSlug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = updated;
          return next;
        }
        return [...prev, updated];
      });
    } catch (err) {
      setError(err.message || "Failed to save SEO settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSeedAllDefaults = async () => {
    if (!window.confirm("Seed recommended SEO metadata for all standard pages? This will populate pages that haven't been configured yet.")) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      for (const preset of PRESET_PAGES) {
        const payload = {
          metaTitle: preset.defaultTitle,
          metaDescription: preset.defaultDesc,
          canonicalUrl: `${DOMAIN}${preset.path}`,
          ogTitle: preset.defaultTitle,
          ogDescription: preset.defaultDesc,
          ogImage: "https://ik.imagekit.io/zyekgh52m/suchamojo/hero/Hero_Banner_-Updated.png",
          status: "published",
        };
        await upsertPageSeo(preset.slug, payload);
      }

      setSuccess("Successfully seeded recommended SEO configuration for all standard pages!");
      await loadSeoPages();
    } catch (err) {
      setError(err.message || "Failed to seed defaults");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCustomSlug = (e) => {
    e.preventDefault();
    const clean = customSlugInput.toLowerCase().trim().replace(/^\//, "").replace(/[^a-z0-9-_]/g, "");
    if (!clean) return;
    setCustomSlugInput("");
    setShowAddCustom(false);
    handleSelectSlug(clean);
  };

  const selectedPreset = PRESET_PAGES.find((p) => p.slug === selectedSlug);
  const isCustomSlug = !selectedPreset;

  const titleLength = formData.metaTitle.length;
  const descLength = formData.metaDescription.length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            SEO Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Google search metadata, social sharing cards (Open Graph), and canonical URLs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSeedAllDefaults}
            disabled={saving}
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 px-3.5 py-2 text-xs font-semibold text-orange-400 transition"
          >
            ⚡ Seed Recommended SEO
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          {success}
        </div>
      )}

      {/* Page Tabs */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Select Page to Configure ({PRESET_PAGES.length} Core Pages)
          </span>

          <button
            onClick={() => setShowAddCustom(!showAddCustom)}
            className="text-xs text-orange-400 hover:text-orange-300 font-medium"
          >
            {showAddCustom ? "Cancel" : "+ Custom Route"}
          </button>
        </div>

        {showAddCustom && (
          <form onSubmit={handleAddCustomSlug} className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="e.g. services/branding or webinars"
              value={customSlugInput}
              onChange={(e) => setCustomSlugInput(e.target.value)}
              className="flex-1 rounded-xl border border-white/20 bg-black/60 px-3 py-1.5 text-xs text-white outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-bold"
            >
              Add Page
            </button>
          </form>
        )}

        <div className="flex flex-wrap gap-2">
          {PRESET_PAGES.map((page) => {
            const isConfigured = seoList.some((s) => s.slug === page.slug);
            const isSelected = selectedSlug === page.slug;

            return (
              <button
                key={page.slug}
                onClick={() => handleSelectSlug(page.slug)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{page.name}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isConfigured ? "bg-emerald-400" : "bg-slate-500"
                  }`}
                  title={isConfigured ? "Configured in Database" : "Using Default"}
                />
              </button>
            );
          })}

          {/* Any custom slugs not in presets */}
          {seoList
            .filter((item) => !PRESET_PAGES.some((p) => p.slug === item.slug))
            .map((item) => (
              <button
                key={item.slug}
                onClick={() => handleSelectSlug(item.slug)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  selectedSlug === item.slug
                    ? "bg-orange-500 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>/{item.slug}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </button>
            ))}
        </div>
      </div>

      {/* Main Grid: Form + Live Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Editing: <span className="text-orange-400">/{selectedSlug}</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Target URL: {DOMAIN}{selectedPreset ? selectedPreset.path : `/${selectedSlug}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white outline-none focus:border-orange-500"
                >
                  <option value="published">Status: Published</option>
                  <option value="draft">Status: Draft</option>
                </select>
              </div>
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Meta Title <span className="text-red-400">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    titleLength >= 50 && titleLength <= 60
                      ? "text-emerald-400"
                      : titleLength > 60
                      ? "text-amber-400"
                      : "text-slate-400"
                  }`}
                >
                  {titleLength} / 60 chars (Recommended 50–60)
                </span>
              </div>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                placeholder="Page Title — SuchaMojo"
                required
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Meta Description <span className="text-red-400">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    descLength >= 140 && descLength <= 160
                      ? "text-emerald-400"
                      : descLength > 160
                      ? "text-amber-400"
                      : "text-slate-400"
                  }`}
                >
                  {descLength} / 160 chars (Recommended 140–160)
                </span>
              </div>
              <textarea
                name="metaDescription"
                rows={3}
                value={formData.metaDescription}
                onChange={handleInputChange}
                placeholder="Concise summary for search engines and social cards..."
                required
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Canonical URL
              </label>
              <input
                type="url"
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleInputChange}
                placeholder={`${DOMAIN}/page`}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
              />
            </div>

            {/* Open Graph Image */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  Open Graph (OG) Image URL
                </label>
                <span className="text-[10px] text-slate-400">1200×630 recommended</span>
              </div>
              <input
                type="url"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleInputChange}
                placeholder="https://ik.imagekit.io/.../image.png"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
              />
            </div>

            {/* OG Title & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Social Title (og:title)
                </label>
                <input
                  type="text"
                  name="ogTitle"
                  value={formData.ogTitle}
                  onChange={handleInputChange}
                  placeholder="Defaults to Meta Title"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Social Description (og:description)
                </label>
                <input
                  type="text"
                  name="ogDescription"
                  value={formData.ogDescription}
                  onChange={handleInputChange}
                  placeholder="Defaults to Meta Description"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => populateFormForSlug(selectedSlug)}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                Reset to Preset
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save SEO Settings"}
              </button>
            </div>
          </form>
        </div>

        {/* Live Previews */}
        <div className="lg:col-span-5 space-y-6">
          {/* Google Search SERP Preview */}
          <div className="rounded-2xl border border-white/10 bg-[#202124] p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Google Search Preview
              </span>
            </div>

            {/* Simulated Google Result */}
            <div className="bg-[#1f1f1f] rounded-xl p-4 border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-[#bdc1c6]">
                <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white">
                  S
                </div>
                <div className="truncate">
                  <span>everythingcontent.in</span>
                  <span className="text-slate-500"> › {selectedSlug === "home" ? "" : selectedSlug}</span>
                </div>
              </div>

              <h3 className="text-[#8ab4f8] text-sm hover:underline cursor-pointer line-clamp-1 font-medium leading-snug">
                {formData.metaTitle || "Page Title — SuchaMojo"}
              </h3>

              <p className="text-[#bdc1c6] text-xs line-clamp-2 leading-relaxed">
                {formData.metaDescription || "Add a meta description to see how this page appears in Google search engine results."}
              </p>
            </div>
          </div>

          {/* Social Card Preview */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-3">
              Social Card Preview (LinkedIn / Twitter / Facebook)
            </span>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
              {/* OG Image */}
              <div className="relative aspect-[1200/630] w-full bg-black/80 flex items-center justify-center overflow-hidden">
                {formData.ogImage ? (
                  <img
                    src={formData.ogImage}
                    alt="OG Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="text-center p-6 text-slate-500 text-xs">
                    No OG image provided
                  </div>
                )}
              </div>

              <div className="p-3.5 space-y-1">
                <p className="text-[10px] uppercase font-mono text-slate-400">
                  everythingcontent.in
                </p>
                <p className="text-xs font-bold text-white line-clamp-1">
                  {formData.ogTitle || formData.metaTitle || "SuchaMojo"}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {formData.ogDescription || formData.metaDescription || "Story-led personal branding."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoManager;

