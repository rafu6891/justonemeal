import { useEffect, useState } from "react";
import { formatQuantity } from "../utils/formatQuantity";
import {
  getDifficultyLabel,
  getDifficultyColor,
} from "../utils/recipeHelpers";

export default function RecipeModal({ recipe, onClose }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "15px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "white",
          width: "900px",
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,.25)",
        }}
      >
        {/* Imagen */}
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{
              width: "100%",
              height: isMobile ? "220px" : "350px",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: isMobile ? "220px" : "320px",
              background:
                "linear-gradient(135deg, #f7f2ea, #efe4d3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <img
              src="/images/logo-jom.png"
              alt="JustOneMeal"
              style={{
                width: isMobile ? "160px" : "220px",
                opacity: 0.9,
              }}
            />
          </div>
        )}

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: isMobile ? "12px" : "20px",
            right: isMobile ? "12px" : "20px",
            width: "42px",
            height: "42px",
            border: "none",
            borderRadius: "50%",
            background: "white",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,.2)",
          }}
        >
          ✕
        </button>

        {/* Contenido */}
        <div
          style={{
            padding: isMobile ? "20px" : "30px",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: "15px",
              fontSize: isMobile ? "28px" : "34px",
              color: "#333",
            }}
          >
            {recipe.title}
          </h1>

          {/* Información */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
              }}
            >
              ❤️ {recipe.likes}
            </span>

            <span
              style={{
                fontWeight: "600",
              }}
            >
              ⏱ {recipe.time_minutes} min
            </span>

            <span
              style={{
                backgroundColor: getDifficultyColor(
                  recipe.difficulty
                ),
                color: "white",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {getDifficultyLabel(recipe.difficulty)}
            </span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              marginBottom: "30px",
            }}
          />

          {/* Ingredientes + Preparación */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "300px 1fr",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* Ingredientes */}
            <div>
              <h3
                style={{
                  marginTop: 0,
                }}
              >
                🥖 Ingredientes
              </h3>

              {recipe.ingredients?.length > 0 ? (
                <ul
                  style={{
                    paddingLeft: "20px",
                    lineHeight: "2",
                  }}
                >
                  {recipe.ingredients.map(
                    (ingredient, index) => (
                      <li key={index}>
                        {ingredient.to_taste ? (
                          <>
                            {ingredient.name} al gusto
                          </>
                        ) : ingredient.unit === "unit" ? (
                          <>
                            {formatQuantity(
                              ingredient.quantity
                            )}{" "}
                            {ingredient.name}
                          </>
                        ) : (
                          <>
                            {formatQuantity(
                              ingredient.quantity
                            )}{" "}
                            {ingredient.unit_display}{" "}
                            {ingredient.name}
                          </>
                        )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>Sin ingredientes.</p>
              )}
            </div>

            {/* Preparación */}
            <div>
              <h3
                style={{
                  marginTop: 0,
                }}
              >
                👨‍🍳 Preparación
              </h3>

              {recipe.instructions ? (
                <ol
                  style={{
                    paddingLeft: "22px",
                    lineHeight: "1.9",
                    color: "#555",
                  }}
                >
                  {recipe.instructions
                    .split("\n")
                    .filter((step) => step.trim())
                    .map((step, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "12px",
                        }}
                      >
                        {step}
                      </li>
                    ))}
                </ol>
              ) : (
                <p>Sin instrucciones.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}