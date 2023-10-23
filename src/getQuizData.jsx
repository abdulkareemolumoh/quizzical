export async function getQuizData(category, difficulty) {
  const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`;

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
