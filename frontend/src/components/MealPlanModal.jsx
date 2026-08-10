import { useMealPlan } from "../context/MealPlanContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function MealPlanModal({ onClose }) {
  const {
  recipes,
  removeRecipe,
  clearPlan,
  updateServings,
} = useMealPlan();
  const { theme } = useTheme();
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const shoppingList = {};
const pantryList = {};

recipes.forEach((recipe) => {
  const servings = recipe.servings || 1;

  recipe.ingredients?.forEach((ingredient) => {
    const list = ingredient.is_pantry_item
      ? pantryList
      : shoppingList;

    const key = `${ingredient.name}-${ingredient.unit}`;

    // Los productos de despensa NO se multiplican
    const quantity = ingredient.is_pantry_item
      ? ingredient.quantity
      : ingredient.quantity * servings;

    if (!list[key]) {
      list[key] = {
        ...ingredient,
        quantity: quantity,
      };
    } else if (!ingredient.to_taste) {
      list[key].quantity += quantity;
    }
  });
});

const shoppingIngredients = Object.values(shoppingList);
const pantryIngredients = Object.values(pantryList);

const shareShoppingList = async () => {
  const shoppingText = shoppingIngredients
    .map((ingredient) =>
      ingredient.to_taste
        ? `• ${ingredient.name} al gusto`
        : `• ${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`
    )
    .join("\n");

  const pantryText = pantryIngredients
    .map((ingredient) =>
      ingredient.to_taste
        ? `• ${ingredient.name} al gusto`
        : `• ${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`
    )
    .join("\n");

  let text = "🛒 Lista de la compra\n\n";

  if (shoppingText) {
    text += `🛒 Compra\n${shoppingText}`;
  }

  if (pantryText) {
    text += `\n\n🧂 Productos de despensa\n${pantryText}`;
  }

  if (navigator.share) {
    await navigator.share({
      title: "Lista de la compra - JustOneMeal",
      text: text,
    });
  } else {
    await navigator.clipboard.writeText(text);
    alert("Lista copiada al portapapeles");
  }
};

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
              <li
                key={index}
                style={{
                  listStyle: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                  textDecoration: checkedIngredients[`shopping-${index}`]
                    ? "line-through"
                    : "none",
                  opacity: checkedIngredients[`shopping-${index}`]
                    ? 0.5
                    : 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={!!checkedIngredients[`shopping-${index}`]}
                  onChange={() =>
                    setCheckedIngredients((prev) => ({
                      ...prev,
                      [`shopping-${index}`]:
                        !prev[`shopping-${index}`],
                    }))
                  }
                />

                <span>
                  {ingredient.to_taste
                    ? `${ingredient.name} al gusto`
                    : `${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`}
                </span>
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
                <li
                  key={index}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                    textDecoration: checkedIngredients[`pantry-${index}`]
                      ? "line-through"
                      : "none",
                    opacity: checkedIngredients[`pantry-${index}`]
                      ? 0.5
                      : 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedIngredients[`pantry-${index}`]}
                    onChange={() =>
                      setCheckedIngredients((prev) => ({
                        ...prev,
                        [`pantry-${index}`]:
                          !prev[`pantry-${index}`],
                      }))
                    }
                  />

                  <span>
                    {ingredient.to_taste
                      ? `${ingredient.name} al gusto`
                      : `${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          onClick={shareShoppingList}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: theme.card,
            color: theme.text,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: theme.shadow,
          }}
        >
          📤 Compartir lista
        </button>

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
                disabled={(recipe.servings || 1) <= 1}
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
                disabled={(recipe.servings || 1) >= 6}
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