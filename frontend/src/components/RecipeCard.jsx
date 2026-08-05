import {
  getDifficultyLabel,
  getDifficultyColor,
} from "../utils/recipeHelpers";

import { useTheme } from "../context/ThemeContext";

export default function RecipeCard({
  recipe,
  onOpen,
  likeRecipe,
  getCategoryIcon,
}) {
  const { theme } = useTheme();
  
  return (
    <div
      style={{
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "18px",
        padding: "20px",
        boxShadow: theme.shadow,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadow;
      }}
    >
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "170px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "15px",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "170px",
            backgroundColor: theme.surface,
            borderRadius: "12px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${theme.border}`,
          }}
        >
          <img
            src="/images/logo-jom-icon.png"
            alt="JustOneMeal"
            style={{
              height: "80px",
              opacity: 0.7,
            }}
          />
        </div>
      )}

      <h3
        style={{
          margin: "0 0 12px 0",
          fontSize: "24px",
          color: theme.text,
        }}
      >
        {recipe.title}
      </h3>

      <p
        style={{
          color: theme.secondaryText,
          marginBottom: "15px",
        }}
      >
        ⏱ {recipe.time_minutes} min
      </p>

      <p
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "999px",
          backgroundColor: getDifficultyColor(recipe.difficulty),
          color: "white",
          fontWeight: "bold",
        }}
      >
        {getDifficultyLabel(recipe.difficulty)}
      </p>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            cursor: "pointer",
            userSelect: "none",
            color: theme.text,
          }}
          onClick={(e) => {
            e.stopPropagation();
            likeRecipe(recipe.id);
          }}
        >
          ❤️ {recipe.likes}
        </div>

        <div
          style={{
            display: "flex",
            gap: "5px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {recipe.categories?.map((category) => (
            <span
              key={category}
              style={{
                padding: "4px 8px",
                borderRadius: "999px",
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                fontSize: "11px",
                fontWeight: "bold",
                color: theme.secondaryText,
              }}
            >
              {getCategoryIcon(category)} {category}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onOpen(recipe)}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "12px",
          backgroundColor: theme.primary,
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        🍽️ Ver receta
      </button>
    </div>
  );
}