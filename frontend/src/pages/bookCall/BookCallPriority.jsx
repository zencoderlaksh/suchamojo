import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "../../lib/motion";
import { FiArrowRight, FiCalendar, FiClock, FiVideo, FiCheckCircle, FiExternalLink } from "react-icons/fi";
import { useAppStore } from "../../store/useAppStore";
import Form from "../../components/Form";
import aboutImg from "../../assets/image/suchamojo_logo.png";
import { heroMedia } from "../../lib/imagekit";

const DEFAULT_TOPMATE_URL = "https://topmate.io/shubham_gupta152";

const BookCallPriority = () => {
  const settingsCalendarUrl = useAppStore((state) => state.settings?.calendar?.defaultUrl);
  const bookingUrl = settingsCalendarUrl?.trim() || DEFAULT_TOPMATE_URL;

  const isCalendly = bookingUrl.toLowerCase().includes("calendly.com");
  const isTopmate = bookingUrl.toLowerCase().includes("topmate.io");

  const [activeTab, setActiveTab] = useState("calendar"); // 'calendar' | 'form'

  const handleOpenTopmate = () => {
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative overflow-hidden bg-[#f7f1e8] text-slate-950 min-h-screen">
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,_rgba(218,119,72,0.25),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.9),_transparent_30%),linear-gradient(180deg,_#f8efe3_0%,_#f7f1e8_60%,_#f3ede5_100%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-32 h-72 w-72 rounded-full bg-[#d16c42]/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[-4rem] h-80 w-80 rounded-full bg-[#203a32]/10 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* Hero Title */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 font-body text-[0.7rem] uppercase tracking-[0.26em] font-bold text-[#b45833]">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Priority Booking
          </span>

          <h1 className="mt-5 font-heading text-4xl leading-[1.0] tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl font-black">
            Let&apos;s Talk About Your Brand.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-slate-600 sm:text-base">
            You have been thinking about this for a while. Maybe you know your story but are not sure how to tell it. Maybe you are showing up online but nothing is landing. Or maybe you are starting from scratch and need someone to help you see the clearest path.
          </p>

          <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-slate-600 sm:text-base font-medium">
            This call is 30 minutes. No slide decks, no aggressive sales pitches. Just an honest conversation about where you are, where you want to go, and whether Everything Content is the right partner to get you there.
          </p>
        </motion.div>

        {/* Booking Card & Mode Switcher */}
        <motion.div
          className="mx-auto mt-10 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        >
          <div className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/85 p-3 sm:p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <div className="rounded-[1.75rem] border border-[#eadfce] bg-[#fcfaf6] p-4 sm:p-7 space-y-6">
              
              {/* Top Selector Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eadfce] pb-4">
                <div>
                  <h2 className="font-heading text-xl font-black text-slate-900 tracking-tight">
                    Schedule Your Free 30-Min Strategy Call
                  </h2>
                  <p className="font-body text-xs text-slate-500 mt-0.5">
                    Select your slot via instant calendar or drop your details for a direct callback.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1 self-start sm:self-auto border border-slate-200/80">
                  <button
                    onClick={() => setActiveTab("calendar")}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                      activeTab === "calendar"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    📅 Live Calendar
                  </button>
                  <button
                    onClick={() => setActiveTab("form")}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                      activeTab === "form"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    ✉️ Request Callback
                  </button>
                </div>
              </div>

              {/* TAB 1: Live Calendar Booking */}
              {activeTab === "calendar" && (
                <div>
                  {isCalendly ? (
                    /* Native Calendly Iframe */
                    <div className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white">
                      <iframe
                        title="Book a call via Calendly"
                        src={bookingUrl}
                        className="h-[700px] w-full border-0"
                      />
                    </div>
                  ) : (
                    /* Topmate Interactive High-Converting Showcase Card */
                    <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 p-6 sm:p-8 space-y-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-200/50 pb-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={aboutImg}
                            alt="Shubham Gupta"
                            className="h-14 w-14 rounded-2xl object-cover border border-orange-500/30 shadow-md bg-white p-1"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-heading text-lg font-bold text-slate-900">
                                Shubham Gupta
                              </h3>
                              <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                                Topmate Host
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              Founder & Creative Director • Everything Content
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                          </span>
                          <span className="text-xs font-semibold text-emerald-800">
                            Calendar Open for New Bookings
                          </span>
                        </div>
                      </div>

                      {/* Call Specifications */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-xl border border-white bg-white/80 p-3.5 shadow-sm">
                          <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <FiClock className="text-sm" />
                            <span className="text-xs font-bold uppercase tracking-wider">Duration</span>
                          </div>
                          <p className="font-heading text-base font-bold text-slate-900">30 Minutes</p>
                          <p className="text-[11px] text-slate-500">1:1 dedicated session</p>
                        </div>

                        <div className="rounded-xl border border-white bg-white/80 p-3.5 shadow-sm">
                          <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <FiVideo className="text-sm" />
                            <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                          </div>
                          <p className="font-heading text-base font-bold text-slate-900">Google Meet</p>
                          <p className="text-[11px] text-slate-500">Video call link sent on booking</p>
                        </div>

                        <div className="rounded-xl border border-white bg-white/80 p-3.5 shadow-sm">
                          <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <FiCalendar className="text-sm" />
                            <span className="text-xs font-bold uppercase tracking-wider">Fee</span>
                          </div>
                          <p className="font-heading text-base font-bold text-emerald-700">Free / 100% Waived</p>
                          <p className="text-[11px] text-slate-500">Discovery & strategy fit</p>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div className="rounded-2xl border border-orange-200 bg-white p-6 text-center space-y-4 shadow-md">
                        <div>
                          <p className="font-heading text-lg font-black text-slate-900">
                            Ready to pick your preferred date and time?
                          </p>
                          <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                            Click below to open Shubham&apos;s live calendar on Topmate and reserve your slot instantly.
                          </p>
                        </div>

                        <div>
                          <button
                            onClick={handleOpenTopmate}
                            className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 px-8 py-4 font-body text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/40 active:translate-y-0"
                          >
                            <span>Open Topmate Calendar & Select Slot</span>
                            <FiExternalLink className="text-base" />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 pt-2">
                          <span className="inline-flex items-center gap-1">
                            <FiCheckCircle className="text-emerald-500" /> Instant calendar invitation
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FiCheckCircle className="text-emerald-500" /> Easy 1-click reschedule
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FiCheckCircle className="text-emerald-500" /> No slide decks or sales pitch
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Direct Contact Form */}
              {activeTab === "form" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 flex items-center justify-between">
                    <span>
                      Don&apos;t have time to browse the calendar? Leave your details and we will email you 2-3 tailored slots within 2 hours.
                    </span>
                    <button
                      onClick={() => setActiveTab("calendar")}
                      className="text-orange-600 font-bold hover:underline shrink-0 ml-4"
                    >
                      Use Calendar Instead →
                    </button>
                  </div>
                  <Form formId="book-call-priority" sourcePageOverride="book-a-call" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Trust Signals Section */}
        <motion.div
          className="mx-auto mt-10 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
        >
          <article className="rounded-[2rem] border border-white/80 bg-white/75 p-6 sm:p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <p className="font-body text-[0.72rem] font-bold uppercase tracking-[0.25em] text-orange-600">
              What To Expect From This Call
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm leading-relaxed text-slate-700">
              <div className="rounded-xl bg-slate-50/80 border border-slate-200/60 p-4">
                <span className="font-bold text-slate-900 block mb-1">✓ Personal Review</span>
                Every request is personally reviewed by Shubham Gupta prior to the call.
              </div>
              <div className="rounded-xl bg-slate-50/80 border border-slate-200/60 p-4">
                <span className="font-bold text-slate-900 block mb-1">✓ Transparent Fit</span>
                If we are not the right partner for your current stage, we will tell you directly and point you to the right resources.
              </div>
              <div className="rounded-xl bg-slate-50/80 border border-slate-200/60 p-4">
                <span className="font-bold text-slate-900 block mb-1">✓ Proven Authority</span>
                30,000+ creators and leaders trained, 400M+ organic views generated, and 7+ years of storytelling experience.
              </div>
            </div>
          </article>
        </motion.div>
      </section>
    </div>
  );
};

export default BookCallPriority;
