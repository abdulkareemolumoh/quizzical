export const categoryMap = {
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

  export const categoryButtons = (quizCategory, selectCategory) => (Object.entries(categoryMap).map(([key, value]) => (
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
  )));

  export const difficultyButtons = (selectDifficulty, difficultyLevel) => ( ["easy", "medium", "hard"].map((level) => (
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
  )));