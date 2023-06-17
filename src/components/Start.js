import React from "react";

export default function Start(props) {
    
  return (
    <div>
      <h1>Quizzical</h1>
      <button onClick={props.handleStartQuiz}>Start Quiz</button>{" "}
    </div>
  );
}
