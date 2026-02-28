import React from 'react'
import Landing from "../home/component/Landing";
import Consultation from "./component/Consultation";
import AboutCorousel from "./component/AboutCorousel";
import Feature from "./component/Feature";
import Clients from './component/Clients';

const Home = () => {
  return (
    <>
      <Landing />
      <Consultation />
      <Feature />
      <AboutCorousel />
      <Clients />
    </>
  )
}

export default Home
