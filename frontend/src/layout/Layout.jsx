import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow pb-28">
        <Outlet />
      </main>
      <Footer />
      {/* Header is fixed-bottom, rendered last so it overlays everything */}
      <Header />
    </div>
  );
};

export default Layout;
