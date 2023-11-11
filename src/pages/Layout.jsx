import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";

export default function Layout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={` ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Header />
      <main className="px-8 pt-8 pb-44 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
