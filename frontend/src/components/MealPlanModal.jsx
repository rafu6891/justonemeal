import { useState } from "react";
import { useMealPlan } from "../context/MealPlanContext";
import { useTheme } from "../context/ThemeContext";
import ShoppingList from "./ShoppingList";

export default function MealPlanModal({ onClose }) {
  const {
    recipes,
    removeRecipe,
    clearPlan,
    updateServings,
  } = useMealPlan();

  const { theme } = useTheme();

  const [showShoppingList, setShowShoppingList] =
    useState(false);

  if (showShoppingList) {
    return (
      <ShoppingList
        recipes={recipes}
        theme={theme}
        onBack={() => setShowShoppingList(false)}
        onClose={onClose}
      />
    );
  }

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
          maxHeight: "90vh",
          overflowY: "auto",
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
                  padding: "12px 0",
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {recipe.title}
                  </span>

                  <button
                    onClick={() =>
                      removeRecipe(recipe.id)
                    }
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

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: theme.secondaryText,
                    }}
                  >
                    👥 Personas:
                  </span>

                  <button
                    onClick={() =>
                      updateServings(
                        recipe.id,
                        (recipe.servings || 1) - 1
                      )
                    }
                    disabled={
                      (recipe.servings || 1) <= 1
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "none",
                      borderRadius: "8px",
                      background: theme.surface,
                      color: theme.text,
                      cursor:
                        (recipe.servings || 1) > 1
                          ? "pointer"
                          : "default",
                      opacity:
                        (recipe.servings || 1) > 1
                          ? 1
                          : 0.5,
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      minWidth: "25px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {recipe.servings || 1}
                  </span>

                  <button
                    onClick={() =>
                      updateServings(
                        recipe.id,
                        (recipe.servings || 1) + 1
                      )
                    }
                    disabled={
                      (recipe.servings || 1) >= 6
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "none",
                      borderRadius: "8px",
                      background: theme.surface,
                      color: theme.text,
                      cursor:
                        (recipe.servings || 1) < 6
                          ? "pointer"
                          : "default",
                      opacity:
                        (recipe.servings || 1) < 6
                          ? 1
                          : 0.5,
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </button>
                </div>
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

            <button
              onClick={() =>
                setShowShoppingList(true)
              }
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: theme.primary,
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              🛒 Generar lista de la compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}