import React, { useEffect } from "react";
import Landing from "./component/Landing";
import TrustStrip from "./component/TrustStrip";
import TheProblem from "./component/TheProblem";
import Feature from "./component/Feature";
import AboutSection from "./component/AboutSection";
import Clients from "./component/Clients";
import Consultation from "./component/Consultation";
import MilestonesSection from "./component/MilestonesSection";
import IndustriesServe from "./component/IndustriesServe";
import HowItWorks from "./component/HowItWorks";
import WhySuchaMojo from "./component/WhySuchaMojo";
import Testimonials from "./component/Testimonials";
import Faq from "./component/Faq";
import CtaBanner from "./component/CtaBanner";
import Blog from "./component/Blog";
import GetInTouch from "./component/GetInTouch";
import AboutCorousel from "./component/AboutCorousel";

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
    <>
      <Landing />
      <TrustStrip />
      <TheProblem />
      <Feature />
      <AboutSection />
      <Clients />
      <Consultation />
      <section className="mx-auto mt-8 w-full max-w-310 px-4 sm:mt-12 sm:px-6 lg:px-8">
        <MilestonesSection split />
      </section>
      <IndustriesServe />
      <HowItWorks />
      <WhySuchaMojo />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <GetInTouch />
      <AboutCorousel />
      <Blog />
    </>
  );
};

export default Home;
