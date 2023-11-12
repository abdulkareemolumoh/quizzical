import React, { useState } from "react";
import { decode } from "html-entities";
import { getQuizData } from "../getQuizData";

export default function Main() {
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCategory, setQuizCategory] = useState();
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [selectCounter, setSelectCounter] = useState(0);

  function handleSelectedOption(selected, correctAnswer, index) {
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
    if (category && difficulty) {
      getQuizData(category, difficulty)
        .then((quizData) => {
          setQuizData(quizData);
          setStartQuiz(true);
        })
        .catch((error) => {
          console.error("Error fetching quiz data: ", error);
        });
    } else {
      alert("Select Category and Choose difficulty");
    }
  }

  function handleCheckAnswer() {
    if (selectCounter === quizData.length) {
      for (let i = 0; i < quizData.length; i++) {
        if (quizData[i].correct) {
          setScore((prevScore) => prevScore + 1);
        }
      }
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
    setDifficultyLevel();
    setQuizCategory();
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
    30: "Science: Gadgets",
  };

  const categoryButtons = Object.entries(categoryMap).map(([key, value]) => (
    <button
      key={key}
      className={
        quizCategory === Number(key)
          ? "p-1.5 m-1 sm:p-3 sm:m-2 sm:text-xl bg-blue-500 hover:bg-blue-400 gap-5 rounded-lg "
          : "p-1.5 m-1 sm:p-3 sm:m-2 sm:text-xl bg-gray-500 hover:bg-gray-400 gap-5 rounded-lg"
      }
      onClick={() => selectCategory(Number(key))}
    >
      {value}
    </button>
  ));

  const difficultyButtons = ["easy", "medium", "hard"].map((level) => (
    <button
      key={level}
      onClick={() => selectDifficulty(level)}
      className={
        difficultyLevel === level
          ? "p-1.5 m-1 sm:p-3 sm:m-2 sm:text-xl bg-blue-500 hover:bg-blue-400 gap-5  border border-gray-700 rounded-lg"
          : "p-1.5 m-1 sm:p-3 sm:m-2 sm:text-xl bg-gray-500 hover:bg-gray-400 gap-5 rounded-lg"
      }
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </button>
  ));

  const quiz = quizData.map((item, id) => {
    const isCorrect = item.selectedOption === item.correct_answer;
    return (
      <form>
        <p className="p-3 sm:p-8 text-xl sm:text-2xl font-semibold">
          {decode(item.question)} key={id}
        </p>
        <div className="flex flex-wrap justify-between sm:justify-evenly items-center gap-y-8 m-2">
          {item.answers.map((answer, answerIndex) => (
            <div>
              <input
                type="radio"
                name={`question_${id}`}
                required
                id={`question_${id}_${answerIndex}`}
                className="appearance-none peer "
                onClick={() =>
                  handleSelectedOption(answer, item.correct_answer, id)
                }
                disabled={showResults}
              />
              <label
                htmlFor={`question_${id}_${answerIndex}`}
                key={answerIndex}
                className={`cursor-pointer bg-gray-500 hover:bg-gray-400 peer-checked:bg-green-500 rounded-3xl px-4 py-2 sm:text-xl ${
                  showResults
                    ? item.selectedOption === answer
                      ? isCorrect
                        ? " !bg-green-500 "
                        : " !bg-red-500"
                      : item.correct_answer === answer
                      ? " !bg-green-500"
                      : ""
                    : ""
                }`}
              >
                {decode(answer)}
              </label>
            </div>
          ))}
        </div>
      </form>
    );
  });

  return (
    <div className="mt-12 min-h-screen ">
      <h1 className="text-center font-extrabold text-3xl p-4">Quizzical</h1>
      {!startQuiz && !showResults && (
        <>
          <h2 className="font-bold py-4 sm:text-xl">Select A Category:</h2>
          <div className="p-4">{categoryButtons}</div>
          <h2 className="font-bold py-4 sm:text-xl">Choose Difficulty Level:</h2>
          <div className="p-4">{difficultyButtons}</div>
        </>
      )}
      {(startQuiz || showResults) && (
        <div className="p-8 flex justify-between font-bold text-lg sm:text-2xl">
          <h2>Category: {categoryMap[quizCategory]}</h2>
          <h2>
            Level:
            {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
          </h2>
        </div>
      )}
      {startQuiz || showResults ? quiz : null}
      {!startQuiz && !showResults ? (
        <button
          className="flex mx-auto mt-16 mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-300 gap-5 rounded-lg sm:text-xl"
          onClick={() => handleStartQuiz(quizCategory, difficultyLevel)}
          disabled={startQuiz}
        >
          Start Quiz
        </button>
      ) : !startQuiz && showResults ? (
        <button
          className="flex mx-auto mt-16 mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-300 gap-5 rounded-lg sm:text-xl"
          onClick={restartGame}
        >
          Restart Game
        </button>
      ) : (
        <button
          className="flex mx-auto mt-16 mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-300 gap-5 rounded-lg sm:text-xl"
          onClick={handleCheckAnswer}
        >
          Submit
        </button>
      )}
      {showResults && (
        <div className="font-bold text-2xl my-4">
          <h2>
            Your Quiz Score: {score}/{quizData.length}
          </h2>
        </div>
      )}
    </div>
  );
}
