import React from 'react'
import Landing from "../home/component/Landing";
import Consultation from "./component/Consultation";
import AboutCorousel from "./component/AboutCorousel";
import Feature from "./component/Feature";
import Clients from './component/Clients';
import ServicesSection from './component/ServicesSection';
import MilestonesSection from './component/MilestonesSection';
import Blog from "./component/Blog";

const Home = () => {
  return (
    <>
      <Landing />
      <Consultation />
      <Feature />
       <Clients />
        <section className="mx-auto mt-8 w-full max-w-310 px-4 sm:mt-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            <ServicesSection split />
            <MilestonesSection split />
          </div>
        </section>
      <AboutCorousel />
      <Blog />

    </>
  )
}

export default Home
