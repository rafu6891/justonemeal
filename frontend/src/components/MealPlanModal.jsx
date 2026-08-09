import { useMealPlan } from "../context/MealPlanContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function MealPlanModal({ onClose }) {
  const { recipes, removeRecipe, clearPlan } = useMealPlan();
  const { theme } = useTheme();
  const [showShoppingList, setShowShoppingList] = useState(false);
  const shoppingList = {};
const pantryList = {};

recipes.forEach((recipe) => {
  recipe.ingredients?.forEach((ingredient) => {
    const list = ingredient.is_pantry_item
      ? pantryList
      : shoppingList;

    const key = `${ingredient.name}-${ingredient.unit}`;

    if (!list[key]) {
      list[key] = {
        ...ingredient,
      };
    } else if (!ingredient.to_taste) {
      list[key].quantity += ingredient.quantity;
    }
  });
});

const shoppingIngredients = Object.values(shoppingList);
const pantryIngredients = Object.values(pantryList);

if (showShoppingList) {
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
          🛒 Lista de la compra
        </h2>

        <h3>🛒 Compra</h3>

        {shoppingIngredients.length === 0 ? (
          <p>No hay ingredientes para comprar.</p>
        ) : (
          <ul
            style={{
              paddingLeft: "20px",
              lineHeight: "2",
            }}
          >
            {shoppingIngredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.to_taste
                  ? `${ingredient.name} al gusto`
                  : `${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`}
              </li>
            ))}
          </ul>
        )}

        {pantryIngredients.length > 0 && (
          <>
            <hr
              style={{
                margin: "25px 0",
              }}
            />

            <h3>🧂 Productos de despensa</h3>

            <ul
              style={{
                paddingLeft: "20px",
                lineHeight: "2",
              }}
            >
              {pantryIngredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.to_taste
                    ? `${ingredient.name} al gusto`
                    : `${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`}
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          onClick={() => setShowShoppingList(false)}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: theme.primary,
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ⬅ Volver al plan
        </button>
      </div>
    </div>
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
            
            <button
                onClick={() => setShowShoppingList(true)}
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