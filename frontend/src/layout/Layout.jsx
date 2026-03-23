import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GetInTouch from "../pages/home/component/GetInTouch";

const Layout = () => {
  const { pathname } = useLocation();
  const isPriorityPage = pathname === "/book-a-call";

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header minimal={isPriorityPage} />
      <main className={isPriorityPage ? "grow" : "grow pb-28"}>
        <Outlet />
      </main>
      {!isPriorityPage && (
        <div className="bg-black">
          <GetInTouch />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
