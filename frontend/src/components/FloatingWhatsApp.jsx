import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "../lib/motion";
import { useAppStore } from "../store/useAppStore";

const DEFAULT_PHONE = "8851258630";
const DEFAULT_MESSAGE = "Hi Shubham, I would like to enquire about your content & personal branding services.";

const normalizeWhatsAppNumber = (num) => {
  if (!num) return "918851258630";
  const digits = String(num).replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

const FloatingWhatsApp = () => {
  const [isHovered, setIsHovered] = useState(false);
  const settingsWhatsapp = useAppStore((state) => state.settings?.whatsapp);

  const isEnabled = settingsWhatsapp?.enabled ?? true;
  if (!isEnabled) return null;

  const rawNumber = settingsWhatsapp?.phoneNumber || DEFAULT_PHONE;
  const rawMessage = settingsWhatsapp?.defaultMessage || DEFAULT_MESSAGE;

  const phone = normalizeWhatsAppNumber(rawNumber);
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(rawMessage)}`;

  return (
    <div
      className="fixed bottom-24 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center gap-2.5 select-none print:hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Prompt bubble on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 10, scale: 0.95 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.95,
          pointerEvents: isHovered ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-body text-xs font-semibold text-slate-800 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </motion.div>

      {/* Main floating circle button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with Shubham Gupta"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className="group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.38)] transition duration-300 hover:bg-[#20bd5a] hover:shadow-[0_14px_32px_rgba(37,211,102,0.5)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {/* Subtle pulsing aura on initial idle */}
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-30 blur-md transition duration-300 group-hover:opacity-50" />

        <FaWhatsapp className="text-2xl sm:text-3xl text-white transition-transform duration-300 group-hover:scale-110" />

        {/* Online green indicator badge */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;

