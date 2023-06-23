import React from "react";

export default function Start({ handleStartQuiz }) {
  return (
    <div className="Main-Body">
      <h1>Quizzical</h1>
      <button onClick={handleStartQuiz}>Start Quiz</button>{" "}
    </div>
  );
}
