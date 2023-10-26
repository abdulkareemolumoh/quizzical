import React, { useState } from "react";
import { decode } from "html-entities";
import { getQuizData } from "../getQuizData";

export default function Main() {
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCategory, setQuizCategory] = useState(9);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [selectCounter, setSelectCounter] = useState(0);

  function handleSelectedOption(
    selected,
    correctAnswer,
    index
  ) {
    setQuizData((prevData) => {
      const newData = [...prevData];
      newData[index].selectedOption = selected;
      newData[index].correct = selected === correctAnswer;

      return newData;
    });

    if (!answeredQuestions.includes(index)) {
      setAnsweredQuestions((prevAnsweredQuestions) => [
        ...prevAnsweredQuestions,
        index,
      ]);
      setSelectCounter((prevState) => prevState + 1);
    }
  }

  function selectCategory(category) {
    setQuizCategory(category);
  }

  function selectDifficulty(difficulty) {
    setDifficultyLevel(difficulty);
  }

  function handleStartQuiz(category, difficulty) {
    getQuizData(category, difficulty)
      .then((quizData) => {
        setQuizData(quizData);
        setStartQuiz(true);
      })
      .catch((error) => {
        console.error("Error fetching quiz data: ", error);
      });
  }

  function handleCheckAnswer() {
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].correct) {
        setScore((prevScore) => prevScore + 1);
      }
    }
    if (selectCounter === quizData.length) {
      setShowResults(true);
      setStartQuiz((prevState) => !prevState);
    } else {
      alert(
        `Answer all questions!!!\n\n You have ${
          quizData.length - selectCounter
        } unanswered questions`
      );
    }
  }

  function restartGame() {
    setQuizData([]);
    setStartQuiz(false);
    setShowResults(false);
    setScore(0);
    setAnsweredQuestions([]);
    setDifficultyLevel("easy");
    setQuizCategory(9);
    setSelectCounter(0);
  }

  const categoryMap = {
    9: "General Knowledge",
    17: "Science & Nature",
    20: "Mythology",
    21: "Sports",
    22: "Geography",
    23: "History",
    24: "Politics",
    25: "Art",
    26: "Celebrities",
    27: "Animals",
    28: "Vehicles",
  };

  const difficultyButtons = ["easy", "medium", "hard"].map((level) => (
    <button
      key={level}
      onClick={() => selectDifficulty(level)}
      className={
        difficultyLevel === level
          ? "active-container-item"
          : "inactive-container-item"
      }
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </button>
  ));

  const categoryButtons = Object.entries(categoryMap).map(([key, value]) => (
    <button
      key={key}
      className={
        quizCategory === Number(key)
          ? "active-container-item"
          : "inactive-container-item"
      }
      onClick={() => selectCategory(Number(key))}
    >
      {value}
    </button>
  ));

  const quiz = quizData.map((item, id) => {
    const isCorrect = item.selectedOption === item.correct_answer;
    return (
      <form key={id}>
        <p className="Question">{decode(item.question)}</p>
        <div className="Answers">
          {item.answers.map((answer, answerIndex) => (
            <label
              key={answerIndex}
              className={`radio-button ${
                showResults
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
                required
                id={`question_${id}_${answerIndex}`}
                className="radio-input"
                onClick={() =>
                  handleSelectedOption(answer, item.correct_answer, id)
                }
                disabled={showResults}
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
    <div className="Main-Quiz">
      <h1>Quizzical</h1>
      {!startQuiz && !showResults && (
        <>
          <div className="Quiz-Category-Container">{categoryButtons}</div>
          <div>{difficultyButtons}</div>
        </>
      )}
      {(startQuiz || showResults) && (
        <div className="Quiz-info">
          <h2>Category: {categoryMap[quizCategory]}</h2>
          <h2>
            Level:
            {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
          </h2>
        </div>
      )}
      {startQuiz || showResults ? quiz : ""}
      {!startQuiz && !showResults ? (
        <button
          className="Check-Answer"
          onClick={() => handleStartQuiz(quizCategory, difficultyLevel)}
        >
          Start Quiz
        </button>
      ) : !startQuiz && showResults ? (
        <button className="Check-Answer" onClick={restartGame}>
          Restart Game
        </button>
      ) : (
        <button className="Check-Answer" onClick={handleCheckAnswer}>
          Submit
        </button>
      )}

      {showResults && (
        <div className="Results">
          <h2>
            Your Quiz Score: {score}/{quizData.length}
          </h2>
        </div>
      )}
    </div>
  );
}
