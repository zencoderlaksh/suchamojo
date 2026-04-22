import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

const SERVICE_OPTIONS = [
  "1:1 Consulting",
  "Team Training",
  "Cohort",
  "MFD Branding",
];

const getDeviceType = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("ipad") || ua.includes("tablet")) return "tablet";
  if (ua.includes("mobile") || ua.includes("iphone") || ua.includes("android"))
    return "mobile";
  return "desktop";
};

const Form = ({
  formId = "default",
  sourcePageOverride,
  hiddenAudience = "",
  hiddenOffer = "",
  showSebiField = false,
}) => {
  const location = useLocation();
  const [redirectPending, setRedirectPending] = useState(false);

  const form = useAppStore(
    (state) => state.forms[formId] || state.forms.default,
  );
  const setFormField = useAppStore((state) => state.setFormField);
  const submitForm = useAppStore((state) => state.submitForm);

  const sourcePage = useMemo(() => {
    if (sourcePageOverride) return sourcePageOverride;
    if (location.pathname === "/") return "homepage";
    return location.pathname.replace(/^\//, "") || "unknown";
  }, [location.pathname, sourcePageOverride]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField(formId, name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await submitForm({
      formId,
      sourcePage,
      hiddenAudience,
      hiddenOffer,
      deviceType: getDeviceType(),
    });

    if (response?.redirectToCalendar && response?.redirectUrl) {
      setRedirectPending(true);
      setTimeout(() => {
        window.location.href = response.redirectUrl;
      }, 600);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/20 bg-[#111317] p-4 font-body text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-5">
      <div className="pulse-soft pointer-events-none absolute -top-14 -left-10 h-44 w-44 rounded-full bg-orange-400/35 blur-3xl" />
      <div className="pulse-soft pointer-events-none absolute -right-8 -bottom-12 h-48 w-48 rounded-full bg-cyan-400/25 blur-3xl" />

      <div className="relative">
        <p className="mb-6 text-center font-body text-xs font-semibold tracking-[0.24em] text-gray-300">
          CONTACT US.25
        </p>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block font-body text-sm font-medium text-gray-100"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              value={form.values.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <p className="mt-1.5 font-body text-xs text-gray-400">
              How you&apos;d like to be addressed.
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-body text-sm font-medium text-gray-100"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={form.values.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <p className="mt-1.5 font-body text-xs text-gray-400">
              Where I can reach you.
            </p>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block font-body text-sm font-medium text-gray-100"
            >
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 _________"
              value={form.values.phone}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter exactly 10 digits"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-400 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            />
            <p className="mt-1.5 font-body text-xs text-gray-400">
              Only if you prefer a quick call.
            </p>
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block font-body text-sm font-medium text-gray-100"
            >
              Service Interest
            </label>
            <select
              id="category"
              name="category"
              value={form.values.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none transition duration-300 focus:-translate-y-0.5 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[#111317]">
                  {option}
                </option>
              ))}
            </select>
          </div>

          {showSebiField ?
            <label className="flex items-center gap-2 text-xs text-gray-300">
              <input
                type="checkbox"
                name="sebiRegistered"
                checked={Boolean(form.values.sebiRegistered)}
                onChange={(event) =>
                  setFormField(formId, "sebiRegistered", event.target.checked)
                }
                className="h-4 w-4 rounded border-white/30 bg-white/10"
              />
              SEBI registration completed
            </label>
          : null}

          <input
            type="text"
            tabIndex="-1"
            autoComplete="off"
            name="website"
            value={form.values.website}
            onChange={handleChange}
            className="hidden"
            aria-hidden="true"
          />

          {form.error ?
            <p className="text-center text-xs text-red-300">{form.error}</p>
          : null}
          {form.successMessage ?
            <p className="text-center text-xs text-emerald-300">
              {form.successMessage}
            </p>
          : null}

          <button
            type="submit"
            disabled={form.submitting || redirectPending}
            className="mt-1 block w-full rounded-full bg-linear-to-r from-white to-gray-100 px-6 py-2 text-center font-body text-sm font-semibold tracking-wide text-[#111317] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:from-gray-100 hover:to-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.submitting ? "Submitting..." : "Schedule Free Consultation"}
          </button>

          <div className="pt-0.5 text-center font-body text-xs text-gray-400">
            <p>I personally review every request.</p>
            <p>If we&apos;re not a fit, I&apos;ll tell you honestly.</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
