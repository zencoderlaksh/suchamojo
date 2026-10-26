import React, { useEffect, useRef, useState } from "react";
import client1 from "../../../assets/image/client1.jpeg";
import client2 from "../../../assets/image/client2.jpeg";
import client3 from "../../../assets/image/client3.png";

const logos = [
  { name: "Client 1", logo: client1 },
  { name: "Client 2", logo: client2 },
  { name: "Client 3", logo: client3 },
];

const Clients = () => {
  const trackRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <section id="our-work" className="relative mx-auto mt-10 sm:mt-14 w-full max-w-[1440px] px-4 font-body sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-slate-200/80 bg-white px-6 py-10 sm:px-10 sm:py-12 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-6">
          <p className="font-body text-xs sm:text-[0.78rem] font-bold uppercase tracking-[0.24em] text-slate-500">
            TRUSTED BY FORWARD-THINKING BRANDS & FOUNDERS
          </p>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline-block">
            Collaborations Built on Authority
          </span>
        </div>

        {/* Marquee Track */}
        <div className="relative overflow-hidden py-2">
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            className="flex"
            style={{
              animation: width ? `scroll ${Math.max(15, width / 45)}s linear infinite` : "none",
            }}
          >
            <div ref={trackRef} className="flex gap-6 pr-6">
              {[...logos, ...logos, ...logos].map((client, i) => (
                <div
                  key={i}
                  className="flex h-[110px] sm:h-[125px] w-[200px] sm:w-[230px] shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-[#f8fafc] p-5 opacity-80 transition duration-300 hover:opacity-100 hover:border-slate-300 hover:shadow-sm hover:scale-[1.02]"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-${width}px,0,0); }
        }
      `}</style>
    </section>
  );
};

export default Clients;
