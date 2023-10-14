import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function Layout() {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header />
      <main className={"Main-Body"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
