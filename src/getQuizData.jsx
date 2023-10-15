export async function getQuizData() {
  const url = "https://opentdb.com/api.php?amount=10&difficulty=easy";
  const res = await fetch(url);
  const data = await res.json();
  //function to Randomized answers
  function getRandomizedAnswers(items) {
    const answers = [...items.incorrect_answers, items.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }
  // Implementation of randomization of answers
  data.results.forEach((element) => {
    element.answers = getRandomizedAnswers(element);
  });
  return data.results;
}

export function anyCategoryQuizLoader() {
  return getQuizData();
}

export async function getGeneralQuizData() {
  const url = "https://opentdb.com/api.php?amount=10&category=9";
  const res = await fetch(url);
  const data = await res.json();
  //function to Randomized answers
  function getRandomizedAnswers(items) {
    const answers = [...items.incorrect_answers, items.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }
  // Implementation of randomization of answers
  data.results.forEach((element) => {
    element.answers = getRandomizedAnswers(element);
  });
  return data.results;
}

export function generalQuizLoader() {
  return getGeneralQuizData();
}