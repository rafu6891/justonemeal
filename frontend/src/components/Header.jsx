import { useTheme } from "../context/ThemeContext";
import { useMealPlan } from "../context/MealPlanContext";

export default function Header({
    recipes,
    onOpenMealPlan,
}) {
  const { theme, darkMode, setDarkMode } = useTheme();
  const {
            recipes: mealPlan,
        } = useMealPlan();

  return (

    <div
      style={{
        position: "relative",
        maxWidth: "900px",
        margin: "0 auto 40px auto",
        padding: "35px 30px",
        textAlign: "center",
        backgroundImage: darkMode
          ? "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/texture-wood.jpg')"
          : "url('/images/texture-wood.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "24px",
        color: theme.text,
        textShadow: darkMode
          ? "0 1px 3px rgba(0,0,0,0.8)"
          : "0 1px 2px rgba(255,255,255,0.3)",
        boxShadow: theme.shadow,
      }}
    >

      <img
        src="/images/logo-jom-icon.png"
        alt="JustOneMeal"
        style={{
          height: "180px",
          marginBottom: "10px",
        }}
      />

      <h1
        style={{
          margin: 0,
          fontSize: "56px",
          color: theme.text,
          fontWeight: "700",
        }}
      >
        JustOneMeal
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginTop: "15px",
          marginBottom: "20px",
          color: theme.text,
          opacity: 0.95,
        }}
      >
        Recetas sencillas para cualquier día.
      </p>

<div
  style={{
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
  }}
>
      <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.25)",
            padding: "10px 18px",
            borderRadius: "999px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#3b2a1a",
          }}
        >
          {recipes.length} recetas disponibles
        </div>
      </div>
    </div>
  );
}