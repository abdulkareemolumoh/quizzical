import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul className="navbar-container">
        <Link to="/" className="">
          <li className="navbar-item">🤖 Quizzical</li>
        </Link>
        <Link to="/" className="">
          <li className="navbar-item">🤖</li>
        </Link>
        <Link to="quiz" className="">
          <li className="navbar-item">Quiz</li>
        </Link>
      </ul>
    </nav>
  );
}
