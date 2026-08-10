import { createContext, useContext, useEffect, useState } from "react";

const MealPlanContext = createContext();

export function MealPlanProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("mealPlan");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    // Compatibilidad con recetas que ya estaban guardadas
    return parsed.map((recipe) => ({
      ...recipe,
      servings: recipe.servings || 1,
    }));
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

      return [
        ...prev,
        {
          ...recipe,
          servings: 1,
        },
      ];
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

  const updateServings = (recipeId, servings) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              servings: Math.max(1, Math.min(servings, 6)),
            }
          : recipe
      )
    );
  };

  return (
    <MealPlanContext.Provider
      value={{
        recipes,
        addRecipe,
        removeRecipe,
        clearPlan,
        updateServings,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  return useContext(MealPlanContext);
}