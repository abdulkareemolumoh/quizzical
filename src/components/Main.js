import React from "react";
import { decode } from "html-entities";

export default function Main(props) {
  const quiz = props.quizData.map((item, id) => {
    const isCorrect = item.selectedOption === item.correct_answer;
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
      <h1>Quizzical</h1>
      {props.startQuiz || props.showResults ? quiz : ""}
      {!props.startQuiz && !props.showResults ? (
        <button className="Check-Answer" onClick={props.handleStartQuiz}>
          Start Quiz
        </button>
      ) : !props.startQuiz && props.showResults ? (
        <button className="Check-Answer" onClick={props.restartGame}>
          Restart Game
        </button>
      ) : (
        <button className="Check-Answer" onClick={props.handleCheckAnswer}>
          Submit
        </button>
      )}
      {props.showResults && (
        <div className="Results">
          <h2>
            Your Quiz Score: {props.score}/{props.quizData.length}
          </h2>
        </div>
      )}
    </div>
  );
}
