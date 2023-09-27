import React, { useEffect, useState } from "react";
import Main from "../components/main";
import { getQuizData } from "../getQuizData";
import { useRouteLoaderData } from "react-router-dom";

// export function loader(){
//   return getQuizData()
// }

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // const quizData = useRouteLoaderData()

  const fetchQuizData = () => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
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
    setStartQuiz((prevState) => !prevState);
  }
  console.log(startQuiz);
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
    setStartQuiz((prevState) => !prevState);
  }

  function restartGame() {
    setAnsweredQuestions([]);
    setScore(0);
    setShowResults(false);
    setStartQuiz((prevState) => !prevState);
    console.log(startQuiz);
    setQuizData([]);
  }

  return (
    <div>
      {
        <section>
          <Main
            handleCheckAnswer={handleCheckAnswer}
            handleSelectedOption={handleSelectedOption}
            score={score}
            showResults={showResults}
            startQuiz={startQuiz}
            restartGame={restartGame}
            quizData={quizData}
            handleStartQuiz={handleStartQuiz}
          />
        </section>
      }
    </div>
  );
}

// function App() {
//   const [quizData, setQuizData] = useState([]);
//   const [startQuiz, setStartQuiz] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);
//   const [answeredQuestions, setAnsweredQuestions] = useState([]);

//   const fetchQuizData = () => {
//     fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
//       .then((res) => res.json())
//       .then((data) => {
//         data.results.forEach((item) => {
//           item.answers = getRandomizedAnswers(item);
//         });
//         setQuizData(data.results);
//       })
//       .catch((error) => console.error("Error fetching quiz data:", error));
//   };

//   useEffect(() => {
//     if (startQuiz) {
//       fetchQuizData();
//     }
//   }, [startQuiz]);

//   function getRandomizedAnswers(items) {
//     const answers = [...items.incorrect_answers, items.correct_answer];
//     return answers.sort(() => Math.random() - 0.5);
//   }

//   function handleStartQuiz() {
//     setStartQuiz(true);
//   }

//   function handleSelectedOption(selected, correctAnswer, index) {
//     setQuizData((prevData) => {
//       const newData = [...prevData];
//       newData[index].selectedOption = selected;
//       newData[index].correct = selected === correctAnswer;

//       return newData;
//     });

//     if (answeredQuestions.includes(index)) {
//       // Question has already been answered correctly, return early
//       return;
//     }

//     if (selected === correctAnswer) {
//       setScore((prevScore) => prevScore + 1);
//       setAnsweredQuestions((prevAnsweredQuestions) => [
//         ...prevAnsweredQuestions,
//         index,
//       ]);
//     }
//   }

//   function handleCheckAnswer() {
//     setShowResults(true);
//     setStartQuiz(false);
//   }

//   function restartGame() {
//     setAnsweredQuestions([]);
//     setScore(0);
//     setShowResults(false);
//     setStartQuiz(true);
//     setQuizData([]);
//   }

//   return (
//     <BrowserRouter>
//       <header>
//         <div class="navbar-container">
//           <Link class="navbar-item" to="/home">
//             Home
//           </Link>
//           <h1>Quizzical</h1>
//           <Link class="navbar-item" to="/quiz">
//             Start Quiz
//           </Link>
//         </div>
//       </header>
//       <Routes>
//         <Route
//           path="/home"
//           element={
//             <Start
//               handleStartQuiz={handleStartQuiz}
//               startQuiz={startQuiz}
//               showResults={showResults}
//             />
//           }
//         />
//         <Route
//           path="/quiz"
//           element={
//             <section>
//               <Main
//                 handleCheckAnswer={handleCheckAnswer}
//                 handleSelectedOption={handleSelectedOption}
//                 score={score}
//                 showResults={showResults}
//                 startQuiz={startQuiz}
//                 restartGame={restartGame}
//                 quizData={quizData}
//               />
//             </section>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
