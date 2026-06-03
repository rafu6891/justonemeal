import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [order, setOrder] = useState("");
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  
  
  const fetchRecipes = () => {
    let url = "http://127.0.0.1:8000/api/recipes/?";

    const params = [];

    if (search) {
      params.push(`search=${search}`);
    }

    if (difficulty) {
      params.push(`difficulty=${difficulty}`);
    }

    if (order) {
      params.push(`order=${order}`);
    }

    if (params.length > 0) {
      url += params.join("&");
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.results || data);
      })
      .catch((err) => console.error(err));
  };  


  useEffect(() => {
    fetchRecipes();
  }, [search, difficulty, order]);

  const likeRecipe = (recipeId) => {
  fetch(`http://127.0.0.1:8000/api/recipes/${recipeId}/like/`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, likes: data.likes }
            : recipe
        )
      );
    })
    .catch((err) => console.error(err));
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "easy") return "#4CAF50";
    if (difficulty === "medium") return "#FF9800";
    if (difficulty === "hard") return "#F44336";
    return "#999";
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty === "easy") return "Fácil";
    if (difficulty === "medium") return "Media";
    if (difficulty === "hard") return "Difícil";
    return difficulty;
  };

  const getCategoryLabel = (category) => {
    if (category === "breakfast") return "🍳 Desayuno";
    if (category === "lunch") return "🍝 Comida";
    if (category === "dinner") return "🌙 Cena";
    if (category === "dessert") return "🍰 Postre";
    if (category === "snack") return "🥪 Snack";

    return category;
  };


  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "42px",
          color: "#333",
        }}
      >
        JustOneMeal 🍽️
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "18px",
          marginTop: "-15px",
          marginBottom: "30px",
        }}
      >
        Recetas sencillas para cualquier día.
      </p>
      <p
        style={{
          textAlign: "center",
          color: "#888",
          marginBottom: "40px",
        }}
      >
        {recipes.length} recetas disponibles
      </p>


      {/* 🔹 buscador + filtros */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "40px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >

        <input
          placeholder="Buscar receta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            minWidth: "220px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={() => fetchRecipes()}
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#ff7043",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Buscar
        </button>

        {/* 🔹 filtro dificultad */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Todas</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>

        {/* 🔹 ordenar */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Ordenar</option>
          <option value="-likes">Más likes ❤️</option>
          <option value="time_minutes">Menos tiempo ⏱</option>
          <option value="title">Título A-Z</option>
        </select>
      </div>

      {/* 🔹 recetas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
          alignItems: "start",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              backgroundColor: 
                expandedRecipe === recipe.id
                  ? "#ffffff"
                  : "#fafafa",
              borderRadius: "18px",
              padding: "20px",
              boxShadow: 
                expandedRecipe === recipe.id
                  ? "0 12px 30px rgba(0,0,0,0.15)"
                  : "0 6px 18px rgba(0,0,0,0.12)",
              transition: "all 0.2s ease",
            }}
           onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
            }}

            onClick={() =>
              setExpandedRecipe(
                expandedRecipe === recipe.id
                  ? null
                  : recipe.id
              )
            }
          >
            <h3
              style={{
                marginBottom: "12px",
                fontSize: "24px",
                color: "#222",
              }}
            >
              {recipe.title}
              {" "}
              {expandedRecipe === recipe.id ? "🔼" : "🔽"}
            </h3>

            <p
              style={{
                color: "#666",
                fontSize: "15px",
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
                fontSize: "14px",
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
                }}
                onClick={() => likeRecipe(recipe.id)}
              >
                ❤️ {recipe.likes} likes
              </div>

              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: "#f0f0f0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#666",
                }}
              >
                {getCategoryLabel(recipe.category)}
              </div>
            </div>

            {expandedRecipe === recipe.id && (
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "15px",
                  borderTop: "1px solid #eee",
                }}
              >
                <h4
                  style={{
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  🥖 Ingredientes
                </h4>

                {recipe.ingredients?.length > 0 ? (
                  <ul
                    style={{
                      paddingLeft: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Sin ingredientes</p>
                )}

                <h4
                  style={{
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  📝 Descripción
                </h4>

                <p
                  style={{
                    color: "#555",
                    lineHeight: "1.6",
                  }}
                >
                  {recipe.description || "Sin descripción"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;