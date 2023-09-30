import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="Main-Body"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
