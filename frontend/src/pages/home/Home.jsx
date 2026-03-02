import React from 'react'
import Landing from "../home/component/Landing";
import Consultation from "./component/Consultation";
import AboutCorousel from "./component/AboutCorousel";
import Feature from "./component/Feature";
import Blog from "./component/Blog";


const Home = () => {
  return (
    <>
      <Landing />
      <Consultation />
      <Feature />
      <AboutCorousel />

      <Blog />

    </>
  )
}

export default Home
