import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouch from "../pages/home/component/GetInTouch";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow pb-28">
        <Outlet />
      </main>
      <div className="bg-black">
        <GetInTouch />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
