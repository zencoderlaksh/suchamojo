import React from "react";

const GlobalSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div className="relative">
      <div className="h-16 w-16 border-4 border-white/20 rounded-full animate-spin border-t-white/80"></div>
      <div className="absolute inset-0 h-16 w-16 border-4 border-transparent rounded-full bg-gradient-to-r from-orange-400 via-cyan-400 to-purple-400 blur-xl animate-pulse -z-10"></div>
      <p className="absolute bottom-[-2.5rem] text-center text-xs uppercase tracking-[0.25em] text-white font-semibold">
        Loading
      </p>
    </div>
  </div>
);

export default GlobalSpinner;
