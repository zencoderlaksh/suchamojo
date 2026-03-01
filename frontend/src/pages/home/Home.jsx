import React from 'react'
import Landing from "../home/component/Landing";
import Consultation from "./component/Consultation";
import AboutCorousel from "./component/AboutCorousel";
import Feature from "./component/Feature";
import Blog from "./component/Blog";
import GetInTouch from "./component/GetInTouch";


const Home = () => {
  return (
    <>
      <Landing />
      <Consultation />
      <Feature />
      <AboutCorousel />

      <Blog />
      <GetInTouch />

    </>
  )
}

export default Home
