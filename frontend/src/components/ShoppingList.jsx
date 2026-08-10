import { useEffect, useState } from "react";

export default function ShoppingList({
  recipes,
  theme,
  onBack,
  onClose,
}) {
  const [checkedIngredients, setCheckedIngredients] = useState(() => {
    const saved = localStorage.getItem("checkedIngredients");

    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(
      "checkedIngredients",
      JSON.stringify(checkedIngredients)
    );
  }, [checkedIngredients]);

  const shoppingList = {};
  const pantryList = {};

  recipes.forEach((recipe) => {
    const servings = recipe.servings || 1;

    recipe.ingredients?.forEach((ingredient) => {
      const list = ingredient.is_pantry_item
        ? pantryList
        : shoppingList;

      const key = `${ingredient.name}-${ingredient.unit}`;

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
            {shoppingIngredients.map((ingredient) => {
              const ingredientKey = `shopping-${ingredient.name}-${ingredient.unit}`;

              return (
                <li
                  key={ingredientKey}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                    textDecoration:
                      checkedIngredients[ingredientKey]
                        ? "line-through"
                        : "none",
                    opacity:
                      checkedIngredients[ingredientKey]
                        ? 0.5
                        : 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedIngredients[ingredientKey]}
                    onChange={() =>
                      setCheckedIngredients((prev) => ({
                        ...prev,
                        [ingredientKey]:
                          !prev[ingredientKey],
                      }))
                    }
                  />

                  <span>
                    {ingredient.to_taste
                      ? `${ingredient.name} al gusto`
                      : `${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`}
                  </span>
                </li>
              );
            })}
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
              {pantryIngredients.map((ingredient) => {
                const ingredientKey = `pantry-${ingredient.name}-${ingredient.unit}`;

                return (
                  <li
                    key={ingredientKey}
                    style={{
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                      textDecoration:
                        checkedIngredients[ingredientKey]
                          ? "line-through"
                          : "none",
                      opacity:
                        checkedIngredients[ingredientKey]
                          ? 0.5
                          : 1,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        !!checkedIngredients[
                          ingredientKey
                        ]
                      }
                      onChange={() =>
                        setCheckedIngredients((prev) => ({
                          ...prev,
                          [ingredientKey]:
                            !prev[ingredientKey],
                        }))
                      }
                    />

                    <span>
                      {ingredient.to_taste
                        ? `${ingredient.name} al gusto`
                        : `${ingredient.quantity} ${ingredient.unit_display} ${ingredient.name}`}
                    </span>
                  </li>
                );
              })}
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
          onClick={onBack}
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