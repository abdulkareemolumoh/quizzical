import React, { useState, useEffect } from "react";
import Main from "./components/main";
import Start from "./components/Start";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const quizAPI = "https://opentdb.com/api.php?amount=5&difficulty=easy";
  const fetchQuizData = () => {
    fetch(quizAPI)
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((item) => {
          item.answers = getRandomizedAnswers(item);
        });
        setQuizData(data.results);
      })
      .catch((error) => console.error("Error fetching quiz data:", error));
  };

  useEffect(() => {
    if (startQuiz) {
      fetchQuizData();
    }
  }, [startQuiz]);

  function getRandomizedAnswers(items) {
    const answers = [...items.incorrect_answers, items.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }

  function handleStartQuiz() {
    setStartQuiz(true);
  }

  function handleSelectedOption(selected, correctAnswer, index) {
    setQuizData((prevData) => {
      const newData = [...prevData];
      newData[index].selectedOption = selected;
      newData[index].correct = selected === correctAnswer;

      return newData;
    });

    if (answeredQuestions.includes(index)) {
      // Question has already been answered correctly, return early
      return;
    }

    if (selected === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setAnsweredQuestions((prevAnsweredQuestions) => [
        ...prevAnsweredQuestions,
        index,
      ]);
    }
  }

  function handleCheckAnswer() {
    setShowResults(true);
    setStartQuiz(false);
  }

  function restartGame() {
    setAnsweredQuestions([]);
    setScore(0);
    setShowResults(false);
    setStartQuiz(true);
    setQuizData([]);
  }

  return (
    <div>
      <header>
        <Start
          handleStartQuiz={handleStartQuiz}
          startQuiz={startQuiz}
          showResults={showResults}
        />
      </header>
      <section>
        <Main
          handleCheckAnswer={handleCheckAnswer}
          handleSelectedOption={handleSelectedOption}
          score={score}
          showResults={showResults}
          startQuiz={startQuiz}
          restartGame={restartGame}
          quizData={quizData}
        />
      </section>
    </div>
  );
}

export default App;
