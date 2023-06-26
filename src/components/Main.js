import React from "react";
import { decode } from "html-entities";

export default function Main(props) {
  const quiz = props.quizData.map((item, id) => {
    const isCorrect = item.selectedOption === item.correct_answer;
    const isNotCorrect = item.selectedOption !== item.correct_answer;
    return (
      <form key={id}>
        <p className="Question">{decode(item.question)}</p>
        <div className="Answers">
          {item.answers.map((answer, answerIndex) => (
            <label
              key={answerIndex}
              className={`radio-button ${
                props.showResults
                  ? item.selectedOption === answer
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : item.correct_answer === answer
                    ? "correct"
                    : ""
                  : ""
              }`}
            >
              <input
                type="radio"
                name={`question_${id}`}
                id={`question_${id}_${answerIndex}`}
                className="radio-input"
                onClick={() =>
                  props.handleSelectedOption(answer, item.correct_answer, id)
                }
                disabled={props.showResults}
              />
              <span
                className="radio-label"
                htmlFor={`question_${id}_${answerIndex}`}
              >
                {decode(answer)}
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

      <button
        className="Check-Answer"
        onClick={props.handleCheckAnswer}
        disabled={props.showResults}
      >
        Check Answer
      </button>
      {props.showResults && (
        <div className="Results">
          <h2>Quiz Score:</h2>
          <p>
            {props.score}/{props.quizData.length}
          </p>
        </div>
      )}
    </div>
  );
}
