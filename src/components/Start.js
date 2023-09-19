import React from "react";
import { Link } from "react-router-dom";

export default function Start({ handleStartQuiz }) {
  return (
    <div>
      <div className="Main-Body">
        <h1>Quizzical</h1>

        <Link onClick={handleStartQuiz} className="Start-Btn" to="/quiz">
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
