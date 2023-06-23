import React, { useState, useEffect } from "react";
import Main from "./components/main";
import Start from "./components/Start";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);

  function fetchQuizData() {
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        data.results.map((item) => {
          item["answers"] = getRandomizedAnswers(item);
        });
        setQuizData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }

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

  function handleSelectedAnswer(ans) {
    setSelectedAnswer(ans);
  }

  return (
    <div>
      <header>
        <Start handleStartQuiz={handleStartQuiz} />
      </header>
      <section>
        <Main quizData={quizData} handleSelectedAnswer={handleSelectedAnswer} />
      </section>
    </div>
  );
}

export default App;
