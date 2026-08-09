import { createContext, useContext, useEffect, useState } from "react";

const MealPlanContext = createContext();

export function MealPlanProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("mealPlan");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "mealPlan",
      JSON.stringify(recipes)
    );
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes((prev) => {
      if (prev.some((r) => r.id === recipe.id)) {
        return prev;
      }

      return [...prev, recipe];
    });
  };

  const removeRecipe = (recipeId) => {
    setRecipes((prev) =>
      prev.filter((recipe) => recipe.id !== recipeId)
    );
  };

  const clearPlan = () => {
    setRecipes([]);
  };

  return (
    <MealPlanContext.Provider
      value={{
        recipes,
        addRecipe,
        removeRecipe,
        clearPlan,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  return useContext(MealPlanContext);
}