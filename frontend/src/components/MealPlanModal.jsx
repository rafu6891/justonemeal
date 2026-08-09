import { useMealPlan } from "../context/MealPlanContext";
import { useTheme } from "../context/ThemeContext";

export default function MealPlanModal({ onClose }) {
  const { recipes, removeRecipe, clearPlan } = useMealPlan();
  const { theme } = useTheme();

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: theme.modalOverlay,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "600px",
          maxWidth: "100%",
          background: theme.card,
          borderRadius: "20px",
          padding: "30px",
          color: theme.text,
          boxShadow: theme.shadow,
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          📅 Mi plan
        </h2>

        {recipes.length === 0 ? (
          <p>No has añadido ninguna receta.</p>
        ) : (
          <>
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <span>{recipe.title}</span>

                <button
                  onClick={() => removeRecipe(recipe.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={clearPlan}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: theme.danger,
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Vaciar plan
            </button>
          </>
        )}
      </div>
    </div>
  );
}