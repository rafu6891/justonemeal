export const getDifficultyLabel = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "🟢 Fácil";
    case "medium":
      return "🟠 Media";
    case "hard":
      return "🔴 Difícil";
    default:
      return difficulty;
  }
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "#4CAF50";
    case "medium":
      return "#FF9800";
    case "hard":
      return "#F44336";
    default:
      return "#999";
  }
};