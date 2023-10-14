import React from "react";
import { NavLink } from "react-router-dom";
import nobglg from "../assets/nobglg.png";
import { useTheme } from "../components/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <nav>
      <ul className="navbar-container">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-navbar-item" : "navbar-item"
          }
          to="/"
        >
          <li> Home</li>
        </NavLink>
        <li className="navbar-item">
          <img src={nobglg} alt="logo" className="home-image" />
        </li>
        <div className="navbar-item1">
          <NavLink
            to="quiz"
            className={({ isActive }) =>
              isActive ? "active-navbar-item" : "navbar-item"
            }
          >
            <li>Quiz</li>
          </NavLink>
          <div onClick={toggleTheme}>
            {darkMode ? (
              <FontAwesomeIcon icon={faToggleOff} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faToggleOn} size="2x" />
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
}
