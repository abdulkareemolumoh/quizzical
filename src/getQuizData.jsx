function getRandomizedAnswers(items) {
  const answers = [...items.incorrect_answers, items.correct_answer];
  return answers.sort(() => Math.random() - 0.5);
}
export async function getQuizData() {
  const url = "https://opentdb.com/api.php?amount=5&difficulty=easy";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  let quizData = null;
  return (data) => {
    data.results.forEach((item) => {
      item.answers = getRandomizedAnswers(item);
    });
    quizData(data.results);
  };
  console.log(quizData);
}

// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }
