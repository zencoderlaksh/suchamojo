import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../lib/validationSchemas";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setApiError("");

      // TODO: Replace with your actual login API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      // Handle successful login - store token, redirect, etc.
      console.log("Login successful:", result);
      navigate("/dashboard"); // Redirect to dashboard or home
    } catch (error) {
      setApiError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#111317] via-[#1a1d24] to-[#111317] px-4 py-8">
      <div className="w-full max-w-md">
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
                Welcome Back
              </h1>
              <p className="text-sm text-gray-400">
                Sign in to your account to continue
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
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email Address
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

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-orange-400 hover:text-orange-300 transition"
                  >
                    Forgot?
                  </Link>
                </div>
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-300"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 rounded-full bg-linear-to-r from-orange-400 to-orange-500 px-6 py-2.5 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:from-orange-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-4 text-xs text-gray-400">OR</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Social Login Buttons (optional) */}
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

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-400 hover:text-orange-300 font-medium transition"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
