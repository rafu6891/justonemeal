import { formatQuantity } from "../utils/formatQuantity";
import { getDifficultyLabel, getDifficultyColor,} from "../utils/recipeHelpers";

export default function RecipeModal({ recipe, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
            position: "relative",
            backgroundColor: "white",
            width: "900px",
            maxWidth: "95%",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "20px",
        }}
      >
        {recipe.image && (
            <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                }}
            />
            )}

            <div
            style={{
                padding: "30px",
            }}
            >
            <h1
                style={{
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "34px",
                color: "#333",
                }}
            >
                {recipe.title}
            </h1>
            <div
            style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                alignItems: "center",
                flexWrap: "wrap",
            }}
            >
            <span>❤️ {recipe.likes}</span>

            <span>⏱️ {recipe.time_minutes} min</span>

            <span
                style={{
                display: "inline-block",
                backgroundColor: getDifficultyColor(recipe.difficulty),
                color: "white",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "bold",
                }}
            >
                {getDifficultyLabel(recipe.difficulty)}
            </span>
            </div>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: "40px",
                alignItems: "start",
            }}
            >
            <div>
                <h3>🥖 Ingredientes</h3>

                {recipe.ingredients?.length > 0 ? (
                <ul
                    style={{
                    paddingLeft: "20px",
                    lineHeight: "2",
                    }}
                >
                    {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.to_taste ? (
                        <>
                            {ingredient.name} al gusto
                        </>
                        ) : ingredient.unit === "unit" ? (
                        <>
                            {formatQuantity(ingredient.quantity)} {ingredient.name}
                        </>
                        ) : (
                        <>
                            {formatQuantity(ingredient.quantity)}{" "}
                            {ingredient.unit_display} {ingredient.name}
                        </>
                        )}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>Sin ingredientes</p>
                )}
            </div>

            <div>
                {/* Aquí irá la preparación */}
            </div>
            </div>

            <button
                onClick={onClose}
                style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,.15)",
                }}
            >
                ✕
            </button>
            </div>
      </div>
    </div>
  );
}