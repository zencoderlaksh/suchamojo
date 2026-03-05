import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema, serviceInterests } from "../../lib/validationSchemas";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch: _watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const _password = _watch("password");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setApiError("");

      // Prepare data for submission (remove confirmPassword and termsAccepted)
      const {
        confirmPassword: _confirmPassword,
        termsAccepted: _termsAccepted,
        ...submitData
      } = data;

      // Add metadata
      const submitPayload = {
        ...submitData,
        sourcePage: "signup-page",
        timestamp: new Date().toISOString(),
        deviceType: getDeviceType(),
      };

      // TODO: Replace with your actual signup API endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const result = await response.json();
      // Handle successful signup - show success message and redirect
      console.log("Signup successful:", result);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setApiError(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/mobile|android|iphone|ipad|tablet/i.test(ua)) return "mobile";
    return "desktop";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#111317] via-[#1a1d24] to-[#111317] px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Background blur effects */}
        <div className="pulse-soft pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="pulse-soft pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Form Container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#111317] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          {/* Decorative blurs */}
          <div className="absolute -top-20 -left-12 h-40 w-40 rounded-full bg-orange-400/25 blur-3xl opacity-50" />
          <div className="absolute -right-12 -bottom-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl opacity-50" />

          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-sm text-gray-400">
                Join us to start your learning journey
              </p>
            </div>

            {/* API Error */}
            {apiError && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {apiError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
                    errors.fullName ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
                    errors.email ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Username{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  {...register("username")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
                    errors.username ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                />
                {errors.username && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
                    errors.password ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  Password must be 8+ characters with uppercase, lowercase,
                  number & special character
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
                    errors.confirmPassword ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Phone Number{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (___) ___-____"
                  {...register("phone")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
                    errors.phone ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Service Interest Dropdown */}
              <div>
                <label
                  htmlFor="serviceInterest"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  What service interest you most? *
                </label>
                <select
                  id="serviceInterest"
                  {...register("serviceInterest")}
                  className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] appearance-none cursor-pointer ${
                    errors.serviceInterest ?
                      "border-red-500/50 focus:border-red-500/50"
                    : "border-white/15 focus:border-white/40 focus:bg-white/10"
                  }`}
                >
                  <option value="" className="bg-[#111317] text-white">
                    Select a service...
                  </option>
                  {serviceInterests.map((service) => (
                    <option
                      key={service.value}
                      value={service.value}
                      className="bg-[#111317] text-white"
                    >
                      {service.label}
                    </option>
                  ))}
                </select>
                {errors.serviceInterest && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.serviceInterest.message}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start pt-2">
                <input
                  id="termsAccepted"
                  type="checkbox"
                  {...register("termsAccepted")}
                  className="h-4 w-4 mt-0.5 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none cursor-pointer"
                />
                <label
                  htmlFor="termsAccepted"
                  className="ml-2 text-sm text-gray-300"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-orange-400 hover:text-orange-300 transition"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-orange-400 hover:text-orange-300 transition"
                  >
                    Privacy Policy
                  </Link>
                  *
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-xs text-red-400">
                  {errors.termsAccepted.message}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 rounded-full bg-linear-to-r from-orange-400 to-orange-500 px-6 py-2.5 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:from-orange-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-4 text-xs text-gray-400">OR</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Social Signup Buttons (optional) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 transition duration-300"
              >
                Google
              </button>
              <button
                type="button"
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 transition duration-300"
              >
                GitHub
              </button>
            </div>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:text-orange-300 font-medium transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
