import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export function Quiz() {
  return (
    <div>
      <NavLink
        to="anyCategoryQuiz"
        className={({ isActive }) =>
          isActive ? "active-navbar-item" : "navbar-item"
        }
      >
        <button>Any Category</button>
      </NavLink>
      <Outlet />
    </div>
  );
}
