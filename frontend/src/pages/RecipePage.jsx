import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";
import {
  getDifficultyLabel,
  getDifficultyColor,
} from "../utils/recipeHelpers";
import { formatQuantity } from "../utils/formatQuantity";

export default function RecipePage() {
  const { id } = useParams();
  const { theme } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(false);
    setRecipe(null);

    fetch(`${API_URL}/recipes/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se ha encontrado la receta");
        }
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const copyRecipeLink = async () => {
    const recipeUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(recipeUrl);
      setShareMessage("¡Enlace copiado!");
    } catch {
      setShareMessage(
        "No se pudo copiar automáticamente. Copia el enlace desde la barra del navegador."
      );
    }

    setTimeout(() => setShareMessage(""), 3000);
  };

  const shareWhatsApp = () => {
    const recipeUrl = window.location.href;
    const message = `¡Mira esta receta de JustOneMeal! 🍽️\n${recipe.title}\n${recipeUrl}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const buttonStyle = {
    padding: "11px 18px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        background: theme.gradient,
        color: theme.text,
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: "25px",
            color: theme.primary,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Volver a JustOneMeal
        </Link>

        {loading && <p>Cargando receta...</p>}

        {error && (
          <p>No se ha encontrado la receta. Comprueba el enlace.</p>
        )}

        {recipe && (
          <article
            style={{
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: theme.shadow,
            }}
          >
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "450px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "30px" }}>
              <h1 style={{ marginTop: 0 }}>{recipe.title}</h1>

              {recipe.description && (
                <p style={{ color: theme.secondaryText }}>
                  {recipe.description}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "18px",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                <span>⏱️ {recipe.time_minutes} min</span>
                <span>🔥 {recipe.calories ?? "—"} kcal</span>
                <span>❤️ {recipe.likes ?? 0}</span>

                <span
                  style={{
                    background: getDifficultyColor(recipe.difficulty),
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                  }}
                >
                  {getDifficultyLabel(recipe.difficulty)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <button
                  type="button"
                  onClick={copyRecipeLink}
                  style={{
                    ...buttonStyle,
                    background: theme.primary,
                    color: "white",
                  }}
                >
                  🔗 Copiar enlace
                </button>

                <button
                  type="button"
                  onClick={shareWhatsApp}
                  style={{
                    ...buttonStyle,
                    background: "#25D366",
                    color: "white",
                    border: "none",
                  }}
                >
                  📲 Compartir por WhatsApp
                </button>

                {shareMessage && (
                  <span
                    role="status"
                    style={{
                      color: theme.primary,
                      fontWeight: "bold",
                    }}
                  >
                    {shareMessage}
                  </span>
                )}
              </div>

              <hr
                style={{
                  border: "none",
                  borderTop: `1px solid ${theme.border}`,
                  marginBottom: "30px",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "35px",
                }}
              >
                <section>
                  <h2>🥖 Ingredientes</h2>

                  {recipe.ingredients?.length ? (
                    <ul style={{ paddingLeft: "22px", lineHeight: "2" }}>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.to_taste
                            ? `${ingredient.name} al gusto`
                            : ingredient.unit === "unit"
                              ? `${formatQuantity(ingredient.quantity)} ${ingredient.name}`
                              : `${formatQuantity(ingredient.quantity)} ${ingredient.unit_display} ${ingredient.name}`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Sin ingredientes.</p>
                  )}
                </section>

                <section>
                  <h2>👨‍🍳 Preparación</h2>

                  {recipe.instructions ? (
                    <ol style={{ paddingLeft: "22px", lineHeight: "1.9" }}>
                      {recipe.instructions
                        .split("\n")
                        .filter((step) => step.trim())
                        .map((step, index) => (
                          <li key={index} style={{ marginBottom: "12px" }}>
                            {step.replace(/^\s*\d+\s*[.)-]?\s*/, "")}
                          </li>
                        ))}
                    </ol>
                  ) : (
                    <p>Sin instrucciones.</p>
                  )}
                </section>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
