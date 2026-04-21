import React, { useEffect } from "react";
import Landing from "../home/component/Landing";
import Consultation from "./component/Consultation";
import AboutCorousel from "./component/AboutCorousel";
import Feature from "./component/Feature";
import Clients from "./component/Clients";
import ServicesSection from "./component/ServicesSection";
import MilestonesSection from "./component/MilestonesSection";
import IndustriesServe from "./component/IndustriesServe";
import HowItWorks from "./component/HowItWorks";
import WhySuchaMojo from "./component/WhySuchaMojo";
import Testimonials from "./component/Testimonials";
import CtaBanner from "./component/CtaBanner";
import Blog from "./component/Blog";
import GetInTouch from "./component/GetInTouch";

const Home = () => {
  useEffect(() => {
    document.title = "Personal Branding Consultant India | SuchaMojo";

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

    upsertMeta(
      'meta[name="description"]',
      { name: "description" },
      "SuchaMojo helps founders, creators, and professionals build personal brands that earn trust, attract clients, and drive real growth. Book a free strategy call today.",
    );
  }, []);

  return (
    <>
      <Landing />
      <Consultation />
      <Feature />
      <Clients />
      <section className="mx-auto mt-8 w-full max-w-310 px-4 sm:mt-12 sm:px-6 lg:px-8">
        <MilestonesSection split />
      </section>
      <IndustriesServe />
      <HowItWorks />
      <WhySuchaMojo />
      <Testimonials />
      <CtaBanner />
      <GetInTouch />
      <AboutCorousel />
      <Blog />
    </>
  );
};

export default Home;
