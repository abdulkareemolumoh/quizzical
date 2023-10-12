import React from "react";
import { NavLink } from "react-router-dom";
import nobglg from "../assets/nobglg.png";

export default function Nav() {
  // const timer = () => {
  //   let d = new Date().toString();
  //   console.log(d);
  //   return d;
  // };

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
        <NavLink
          to="quiz"
          className={({ isActive }) =>
            isActive ? "active-navbar-item" : "navbar-item"
          }
        >
          <li>Quiz</li>
        </NavLink>
        {/* <li>{timer()}</li> */}
      </ul>
    </nav>
  );
}
