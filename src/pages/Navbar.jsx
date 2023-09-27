import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav >
      <ul className="nav justify-content-center">
        <li className="nav-item ">
          <Link to="/" className="nav-link">🤖 Quizzical</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">🤖</Link>
        </li>
        <li className="nav-item">
          <Link to="quiz" className="nav-link">Quiz</Link>
        </li>
      </ul>
    </nav>
  );
}
