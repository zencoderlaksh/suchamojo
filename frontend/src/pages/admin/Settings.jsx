import React, { useState, useEffect } from "react";
import { fetchAdminSettings, updateAdminSettings } from "../../lib/api";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    cta: {
      enabled: true,
      label: "Book Your Free Call",
      body: "Start with a free 30-minute strategy call. No sales pitch. Just clarity.",
      link: "/book-a-call",
    },
    calendar: {
      defaultUrl: "https://topmate.io/shubham_gupta152",
    },
    social: {
      linkedin: "https://www.linkedin.com/in/suchamojo/",
      instagram: "https://www.instagram.com/suchamojo/?hl=en",
      youtube: "https://www.youtube.com/@suchamojo",
      x: "https://x.com/suchamojo_",
    },
  });

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminSettings();
      if (data) {
        setFormData({
          cta: {
            enabled: data.cta?.enabled ?? true,
            label: data.cta?.label || "Book Your Free Call",
            body: data.cta?.body || "Start with a free 30-minute strategy call. No sales pitch. Just clarity.",
            link: data.cta?.link || "/book-a-call",
          },
          calendar: {
            defaultUrl: data.calendar?.defaultUrl || "https://topmate.io/shubham_gupta152",
          },
          social: {
            linkedin: data.social?.linkedin || "https://www.linkedin.com/in/suchamojo/",
            instagram: data.social?.instagram || "https://www.instagram.com/suchamojo/?hl=en",
            youtube: data.social?.youtube || "https://www.youtube.com/@suchamojo",
            x: data.social?.x || "https://x.com/suchamojo_",
          },
        });
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError(err.message || "Failed to load site settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleCtaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      cta: {
        ...prev.cta,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleCalendarChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      calendar: {
        ...prev.calendar,
        [name]: value,
      },
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateAdminSettings(formData);
      setSuccess("Site settings updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading site settings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-white">
          Site Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage global conversion CTAs, calendar integrations, and branding defaults.
        </p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Global CTA Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Global Call to Action (CTA)
            </h2>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                name="enabled"
                checked={formData.cta.enabled}
                onChange={handleCtaChange}
                className="rounded border-white/20 bg-black/60 text-orange-500 focus:ring-0"
              />
              CTA Banner Enabled
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Button Label
            </label>
            <input
              type="text"
              name="label"
              value={formData.cta.label}
              onChange={handleCtaChange}
              placeholder="e.g. Book Your Free Call"
              required
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Supporting Copy / Body
            </label>
            <textarea
              name="body"
              rows={2}
              value={formData.cta.body}
              onChange={handleCtaChange}
              placeholder="Start with a free 30-minute strategy call..."
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Destination Link / Route
            </label>
            <input
              type="text"
              name="link"
              value={formData.cta.link}
              onChange={handleCtaChange}
              placeholder="/book-a-call"
              required
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Calendar Booking Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400 border-b border-white/10 pb-3">
            Calendar Booking Provider
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Default Booking URL (Calendly or Topmate)
            </label>
            <input
              type="url"
              name="defaultUrl"
              value={formData.calendar.defaultUrl}
              onChange={handleCalendarChange}
              placeholder="https://topmate.io/shubham_gupta152"
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Visitors booking a call are automatically directed to this schedule link.
            </p>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Social Media Links
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">
              Controls the official brand links rendered in the global website footer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.social?.linkedin || ""}
                onChange={handleSocialChange}
                placeholder="https://www.linkedin.com/in/suchamojo/"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.social?.instagram || ""}
                onChange={handleSocialChange}
                placeholder="https://www.instagram.com/suchamojo/?hl=en"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                YouTube Channel URL
              </label>
              <input
                type="url"
                name="youtube"
                value={formData.social?.youtube || ""}
                onChange={handleSocialChange}
                placeholder="https://www.youtube.com/@suchamojo"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                X (Twitter) Profile URL
              </label>
              <input
                type="url"
                name="x"
                value={formData.social?.x || ""}
                onChange={handleSocialChange}
                placeholder="https://x.com/suchamojo_"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;

