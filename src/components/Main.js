import React from "react";
import { decode } from "html-entities";

export default function Main({ quizData, handleSelectedAnswer }) {
  const quiz = quizData.map((items, index) => {
    return (
      <form key={index}>
        <p className="Question">{decode(items.question)}</p>
        <div className="Answers">
          {items.answers.map((ans, id) => (
            <label key={id} className="radio-button">
              <input
                type="radio"
                onChange={() => handleSelectedAnswer(ans)}
                name="answer"
                id={id}
                className="radio-input"
              />
              <span className="radio-label" htmlFor={ans}>
                {decode(ans)}
              </span>
            </label>
          ))}
        </div>
      </form>
    );
  });

  return (
    <div className="Main-Body">
      {quiz}
      <button className="Check-Answer">Check-Answer</button>
    </div>
  );
}
