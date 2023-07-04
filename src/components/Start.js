import React from "react";

export default function Start({ handleStartQuiz, startQuiz, showResults }) {
  return (
    <div>
      {!startQuiz && !showResults && (
        <div className="Main-Body">
          <h1>Quizzical</h1>
          <button className="Start-Btn" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}
