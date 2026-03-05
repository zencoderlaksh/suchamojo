import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Project from "../pages/project/Project";
import Journal from "../pages/journal/Journal";
import Services from "../pages/services/Services";
import Work from "../pages/work/Work";
import Contact from "../pages/contact/Contact";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Project />} />
          <Route path="journal" element={<Journal />} />
          <Route path="services" element={<Services />} />
          <Route path="work" element={<Work />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* Auth Routes - Outside Layout */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
