import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={` ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Header />
      <main className="px-8 sm:px-24 pt-8  h-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
