

export function handleSelectedOption(selected, correctAnswer, index, setQuizData, setAnsweredQuestions, setSelectCounter, answeredQuestions) {
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

  export function handleStartQuiz(category, difficulty, getQuizData, setQuizData, setStartQuiz) {
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

  function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0

    const yyyy = today.getFullYear();

    const hh = String(today.getHours()).padStart(2, "0");
    const min = String(today.getMinutes()).padStart(2, "0");
    const ss = String(today.getSeconds()).padStart(2, "0");

    const formattedDate = `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
    return formattedDate;
  }

  export const formattedDate = getFormattedDate();

 export async function handleCheckAnswer(score, quizData, setScore, setStartQuiz, setShowResults, selectCounter) {
    let newScore = score;
    if (selectCounter === quizData.length) {
      for (let i = 0; i < quizData.length; i++) {
        if (quizData[i].correct) {
          newScore = newScore + 1;
        }
      }

      setScore(newScore);
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
