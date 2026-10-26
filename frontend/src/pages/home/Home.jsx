import React, { useEffect } from "react";
import Landing from "./component/Landing";
import Clients from "./component/Clients";
import Feature from "./component/Feature";
import IndustriesServe from "./component/IndustriesServe";
import TrustStrip from "./component/TrustStrip";
import Testimonials from "./component/Testimonials";
import CtaBanner from "./component/CtaBanner";

const Home = () => {
  useEffect(() => {
    // SEO title requested by client
    document.title = "Everything Content | Personal Branding, Content Strategy & Team Training";

    const upsertMeta = (selector, attrs, value) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        Object.entries(attrs).forEach(([key, attrValue]) =>
          tag.setAttribute(key, attrValue),
        );
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    // Meta description requested by client
    upsertMeta(
      'meta[name="description"]',
      { name: "description" },
      "Build your personal brand, plan better content, train your team and find creative talent with Everything Content. Book a free discovery call.",
    );
  }, []);

  return (
    <div className="bg-[#fbfbfd] text-[#1b1b1f] min-h-screen pb-20 selection:bg-orange-500 selection:text-white">
      {/* 1. Sphere Digital 3D Parallax Interactive Hero Banner */}
      <Landing />

      {/* 2. Trusted By Forward-Thinking Brands Marquee */}
      <Clients />

      {/* 3. Capabilities / Core Solutions (Sphere Digital Pill Cards) */}
      <Feature />

      {/* 4. Industries We Work With (Sphere Digital Minimalist Artwork Shelf Cards) */}
      <IndustriesServe />

      {/* 5. Proven Impact & Execution Milestones (30k+ Creators, 400M+ Views) */}
      <TrustStrip />

      {/* 6. Authentic Client Words & Authority Testimonials */}
      <Testimonials />

      {/* 7. Final Powerhouse Call to Action */}
      <CtaBanner />
    </div>
  );
};

export default Home;
