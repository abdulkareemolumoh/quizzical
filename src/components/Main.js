import React from "react";
import { decode } from "html-entities";

export default function Main(props) {
  const shuffleArray = (array) => {
    if (props.startQuiz) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    return array;
  };

  const handleAnswerClick = (selectedAnswer, correctAnswer, event) => {
    event.preventDefault(); // Prevents form submission and page refresh
    props.handleScore(selectedAnswer, correctAnswer);
  };

  const quiz = props.formData.map((items, index) => {
    const answers = shuffleArray([
      ...items.incorrect_answers,
      items.correct_answer,
    ]);
    return (
      <form key={index}>
        <label className="Question">{decode(items.question)}</label>
        <div className="Answers">
          {answers.map((ans, ansIndex) => (
            <button
              key={ansIndex}
              className="Answers-Btn"
              onClick={(event) =>
                handleAnswerClick(ans, items.correct_answer, event)
              }
            >
              {decode(ans)}
            </button>
          ))}
        </div>
      </form>
    );
  });

  return (
    <div className="Main-Body">
      <h2>{quiz}</h2>
      <p>
        Score: {props.score}/{props.formData.length}
      </p>
      <button className="Check-Answer">Start Quiz</button>
    </div>
  );
}
