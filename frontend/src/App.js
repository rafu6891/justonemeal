import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [order, setOrder] = useState("");
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [category, setCategory] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  
  const fetchRecipes = (customUrl = null) => {
    let url = customUrl || "http://127.0.0.1:8000/api/recipes/?";

    const params = [];

    if (search) {
      params.push(`search=${search}`);
    }

    if (difficulty) {
      params.push(`difficulty=${difficulty}`);
    }

    if (category) {
      params.push(`category=${category}`);
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
        setRecipes(data.results || []);

        setNextPage(data.next);
        setTotalPages(
          Math.ceil(data.count / 15)
        );
        setPreviousPage(data.previous);
      })
      .catch((err) => console.error(err));
  };  


  useEffect(() => {
    fetchRecipes();
  }, [search, difficulty, category, order]);

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

  const getCategoryIcon = (category) => {
    if (category === "Desayuno") return "🍳";
    if (category === "Comida") return "🍝";
    if (category === "Cena") return "🌙";
    if (category === "Postre") return "🍰";
    if (category === "Snack") return "🥪";

    return "🍽️";
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
        background: "linear-gradient(180deg, #f8f1e7 0%, #f4ece1 100%)",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 40px auto",
          padding: "35px 30px",
          textAlign: "center",
          backgroundImage: "url('/images/texture-wood.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "24px",
          color: "#3b2a1a",
          textShadow: "0 1px 2px rgba(255,255,255,0.3)",
          boxShadow: "0 6px 18px rgba(60,40,20,0.12)",
        }}
      >

        <img
          src="/images/logo-jom-icon.png"
          alt="JustOneMeal"
          style={{
            height: "180px",
            marginBottom: "10",
          }}
        />

        <h1
          style={{
            margin: 0,
            fontSize: "56px",
            color: "#3b2a1a",
            fontWeight: "700",
          }}
        >
          JustOneMeal
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginTop: "15px",
            marginBottom: "20px",
            opacity: "0.95",
          }}
        >
          Recetas sencillas para cualquier día.
        </p>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.25)",
            padding: "10px 18px",
            borderRadius: "999px",

            fontSize: "20px",
            fontWeight: "600",
            color: "#3b2a1a",
          }}
        >
          <span>
            {recipes.length} recetas disponibles
          </span>
        </div>
      </div>


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
            padding: "12px 16px",
            borderRadius: "14px",
            border: "1px solid #ddd",
            backgroundColor: "white",
            fontWeight: "600",
          }}
        >
          <option value="">Dificultad</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>

        {/* 🔹 filtro categoria */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "14px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            backgroundColor: "white",
            fontWeight: "600",
          }}
        >
          <option value="">🍽️ Categorias</option>
          <option value="Desayuno">🍳 Desayuno</option>
          <option value="Comida">🍝 Comida</option>
          <option value="Cena">🌙 Cena</option>
          <option value="Postre">🍰 Postre</option>
          <option value="Snack">🥪 Snack</option>
        </select>

        {/* 🔹 ordenar */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "14px",
            border: "1px solid #ddd",
            backgroundColor: "white",
            fontWeight: "600",
          }}
        >
          <option value="">Ordenar</option>
          <option value="-likes">Más likes ❤️</option>
          <option value="time_minutes">Tiempo preparacion ⏱</option>
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
                  backgroundColor: "#f0f0f0",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: "40px",
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "#222",
                }}
              >
                {recipe.title}
              </h3>

              <button
                style={{
                  width: "40px",
                  height: "40px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor:
                    expandedRecipe === recipe.id
                      ? "#ff7043"
                      : "white",

                  color:
                    expandedRecipe === recipe.id
                      ? "white"
                      : "#333",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {expandedRecipe === recipe.id ? "▲" : "▼"}
              </button>
            </div>

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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      borderRadius: "999px",
                      backgroundColor: "#f0f0f0",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#666",
                    }}
                  >
                    {getCategoryIcon(category)} {category}
                  </span>
                ))}
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
                <h4
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  👨‍🍳 Preparación
                </h4>

                {recipe.instructions ? (
                  <ol
                    style={{
                      paddingLeft: "20px",
                      color: "#555",
                      lineHeight: "1.8",
                    }}
                  >
                    {recipe.instructions
                      .split("\n")
                      .filter(step => step.trim())
                      .map((step, index) => (
                        <li key={index}>
                          {step}
                        </li>
                      ))}
                  </ol>
                ) : (
                  <p>Sin instrucciones</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "40px",
        }}
      >
        <button
          disabled={!previousPage}
          onClick={() => {
            fetchRecipes(previousPage);
            setPageNumber((p) => p - 1);
          }}
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "white",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          ◀
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => {
                fetchRecipes(
                  `http://127.0.0.1:8000/api/recipes/?page=${index + 1}`
                );
                setPageNumber(index + 1);
              }}
              style={{
                minWidth: "40px",
                height: "40px",
                border: "none",
                borderRadius: "12px",
                backgroundColor:
                  pageNumber === index + 1
                    ? "#ff7043"
                    : "white",
                color:
                  pageNumber === index + 1
                    ? "white"
                    : "#333",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={!nextPage}
          onClick={() => {
            fetchRecipes(nextPage);
            setPageNumber((p) => p + 1);
          }}
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "white",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default App;