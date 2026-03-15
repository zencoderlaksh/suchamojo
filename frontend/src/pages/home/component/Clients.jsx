import React, { useEffect, useRef, useState } from "react"
import ct1 from "../../../assets/image/ct-1.svg"
import ct2 from "../../../assets/image/ct-2.svg"
import ct3 from "../../../assets/image/ct-3.svg"
import ct4 from "../../../assets/image/ct-4.svg"


const logos = [
  { name: "Client 1", logo: ct1 },
  { name: "Client 2", logo: ct2 },
  { name: "Client 3", logo: ct3 },
  { name: "Client 4", logo: ct4 },

]

const Clients = () => {
  const trackRef = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2)
    }
  }, [])

  return (
    <section className="relative mx-auto mt-12 w-full max-w-[1240px] overflow-hidden rounded-[40px] border border-white/10 bg-[#0b0b0f] px-6 py-16 font-body shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_60px_rgba(0,0,0,0.55)] sm:px-8 sm:py-20">

      <div className="relative z-10">
        <header className="mb-9 grid gap-5 md:grid-cols-[1fr_400px] md:items-end">
          <h2 className="font-heading text-4xl font-normal uppercase tracking-[0.25em] text-white sm:text-5xl">
            CLIENTS
          </h2>
          <p className="max-w-[38ch] font-body text-sm leading-relaxed text-slate-400 md:justify-self-end">
            Collaborations built around clarity, growth, and sharp positioning.
          </p>
        </header>

        <div className="relative overflow-hidden">
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0b0b0f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0b0b0f] to-transparent" />

          <div
            className="flex"
            style={{
              animation: width
                ? `scroll ${width / 50}s linear infinite`
                : "none",
            }}
          >
            <div ref={trackRef} className="flex gap-6 pr-6">
              {[...logos, ...logos].map((client, i) => (
                <div
                  key={i}
                  className="flex h-[170px] w-[240px] shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-slate-800/35 to-slate-900/45 p-6 opacity-60 transition duration-300 hover:opacity-100"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-10 w-[120px] object-contain brightness-[2] grayscale"
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
  )
}

export default Clients
