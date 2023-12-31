import React from "react";
import { NavLink } from "react-router-dom";
import nobglg from "../assets/nobglg.png";
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav>
      <ul
        className={`flex justify-between items-center px-4 sm:px-8 w-full border-b-[0.0125rem] border-blue-500 font-medium text-2xl sm:text-4xl fixed z-20 ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-bold text-blue-500 hover:text-blue-300 underline"
                : "font-bold text-blue-500 hover:text-blue-300 "
            }
            to="/"
          >
            <li className="flex items-center ">
              <img src={nobglg} alt="logo" className="w-16" />
              <h2> Home</h2>
            </li>
          </NavLink>
        </div>

        <div className="flex items-center ">
          <NavLink
            to="quiz"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-blue-500 hover:text-blue-300 underline"
                : "font-bold text-blue-500 hover:text-blue-300"
            }
          >
            <li className="mr-4">Quiz</li>
          </NavLink>
          <div onClick={toggleTheme} className="mx-4">
            {darkMode ? (
              <FontAwesomeIcon icon={faToggleOff} size="xl" />
            ) : (
              <FontAwesomeIcon icon={faToggleOn} size="xl" />
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
}
