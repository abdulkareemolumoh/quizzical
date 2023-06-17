import React from "react";
import Main from "./components/Main";
import Start from "./components/Start";

function App() {
  const [formData, setFormData] = React.useState([]);
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (startQuiz) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((res) => res.json())
        .then((data) => setFormData(data.results));
    }
  }, [startQuiz]);

  function handleStartQuiz() {
    setStartQuiz(true);
  }

  function handleScore(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
  }

  return (
    <div>
      <Start handleStartQuiz={handleStartQuiz} />
      <Main formData={formData} handleScore={handleScore} score={score} />
    </div>
  );
}

export default App;
