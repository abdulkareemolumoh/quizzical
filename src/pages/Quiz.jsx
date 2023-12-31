import React, { useState } from "react";
import { decode } from "html-entities";
import { getQuizData } from "../api/getQuizData";
import { useAuth } from "../context/AuthContext";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { NavLink } from "react-router-dom";
import Avatar from "../assets/Avatar.jpg";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  formattedDate,
  handleCheckAnswer,
  handleSelectedOption,
  handleStartQuiz,
} from "../api/quizFunctions";
import {
  categoryButtons,
  categoryMap,
  difficultyButtons,
} from "../api/mockData";

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCategory, setQuizCategory] = useState();
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [selectCounter, setSelectCounter] = useState(0);

  const { logout, userData, user } = useAuth();

  function selectCategory(category) {
    setQuizCategory(category);
  }

  function selectDifficulty(difficulty) {
    setDifficultyLevel(difficulty);
  }

  if (showResults) {
    updateDoc(doc(db, "userData", user.uid), {
      "quizScoreData.quizScore": score,
      "quizScoreData.quizCategory": categoryMap[quizCategory],
      "quizScoreData.quizDifficulty": difficultyLevel,
      [`quizScoreData.quizScoreHistory.${formattedDate}`]: arrayUnion(
        formattedDate,
        score,
        categoryMap[quizCategory],
        difficultyLevel
      ),
    });
  }

  function restartGame() {
    setQuizData([]);
    setStartQuiz(false);
    setShowResults(false);
    setScore(0);
    setAnsweredQuestions([]);
    setDifficultyLevel(difficultyLevel);
    setQuizCategory(quizCategory);
    setSelectCounter(0);
  }

  const quiz = quizData.map((item, id) => {
    const isCorrect = item.selectedOption === item.correct_answer;
    return (
      <div key={id}>
        <p className="p-3 sm:p-8 text-xl sm:text-2xl font-semibold">
          {decode(item.question)}
        </p>
        <div className="flex flex-wrap justify-between sm:justify-evenly items-center gap-y-8 m-2">
          {item.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <input
                type="radio"
                name={`question_${id}`}
                required
                id={`question_${id}_${answerIndex}`}
                className="appearance-none peer "
                onClick={() =>
                  handleSelectedOption(
                    answer,
                    item.correct_answer,
                    id,
                    setQuizData,
                    setAnsweredQuestions,
                    setSelectCounter,
                    answeredQuestions
                  )
                }
                disabled={showResults}
              />
              <label
                htmlFor={`question_${id}_${answerIndex}`}
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
      </div>
    );
  });

  const handleLogOut = () => {
    logout();
  };

  const items = [
    {
      label: <NavLink to="/profilePage">Profile Page</NavLink>,
      key: "0",
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <h3 onClick={handleLogOut}>Log Out</h3>,
      key: "3",
      disabled: false,
    },
  ];

  return (
    <div className="mt-12 min-h-screen ">
      <div className="flex justify-end text-sm">
        <div className="flex gap-x-5">
          <h3>{`Hello ${userData ? userData.firstName : ""}`}</h3>
          <img
            src={userData ? userData.picture : Avatar}
            alt="profilePicture"
            className="rounded-full w-8 h-8"
          />
        </div>
        <h2 className="ml-2">
          <Dropdown
            menu={{
              items,
            }}
          >
            {/* <a onClick={(e) => e.preventDefault()}> */}
            <Space>
              Profile
              <DownOutlined />
            </Space>
            {/* </a> */}
          </Dropdown>
        </h2>
      </div>
      <h1 className="text-center font-extrabold text-3xl p-4">Quizzical</h1>
      {!startQuiz && !showResults && (
        <>
          <h2 className="font-bold py-4 sm:text-xl">Select A Category:</h2>
          <div className="p-4">
            {categoryButtons(quizCategory, selectCategory)}
          </div>
          <h2 className="font-bold py-4 sm:text-xl">
            Choose Difficulty Level:
          </h2>
          <div className="p-4">
            {difficultyButtons(selectDifficulty, difficultyLevel)}
          </div>
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
          onClick={() =>
            // handleStartQuiz(quizCategory, difficultyLevel)
            handleStartQuiz(
              quizCategory,
              difficultyLevel,
              getQuizData,
              setQuizData,
              setStartQuiz
            )
          }
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
          onClick={() =>
            handleCheckAnswer(
              score,
              quizData,
              setScore,
              setStartQuiz,
              setShowResults,
              selectCounter
            )
          }
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
