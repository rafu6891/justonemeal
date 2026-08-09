import { useTheme } from "../context/ThemeContext";
import { useMealPlan } from "../context/MealPlanContext";

export default function TopBar({ onOpenMealPlan }) {
  const {
    theme,
    darkMode,
    setDarkMode,
  } = useTheme();

  const {
    recipes: mealPlan,
  } = useMealPlan();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto 20px auto",

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "12px",
      }}
    >
              <button
        onClick={onOpenMealPlan}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",

          border: "none",
          borderRadius: "999px",

          padding: "10px 18px",

          background: theme.primary,
          color: "white",

          cursor: "pointer",

          fontWeight: "bold",

          boxShadow: theme.shadow,
        }}
      >
        📅 Mi plan

        {mealPlan.length > 0 && (
          <span
            style={{
              width: "24px",
              height: "24px",

              borderRadius: "50%",

              background: "white",

              color: theme.primary,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {mealPlan.length}
          </span>
        )}
      </button>
      
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          border: "none",
          borderRadius: "999px",
          padding: "10px 16px",

          background: theme.card,
          color: theme.text,

          cursor: "pointer",

          boxShadow: theme.shadow,

          fontSize: "18px",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}