import { useEffect, useState } from "react";
import RecipeModal from "./components/RecipeModal";
import {getDifficultyLabel, getDifficultyColor,} from "./utils/recipeHelpers";
import RecipeCard from "./components/RecipeCard";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [order, setOrder] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
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

  const getCategoryIcon = (category) => {
    if (category === "Desayuno") return "🍳";
    if (category === "Comida") return "🍝";
    if (category === "Cena") return "🌙";
    if (category === "Postre") return "🍰";
    if (category === "Snack") return "🥪";

    return "🍽️";
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
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onOpen={setSelectedRecipe}
            likeRecipe={likeRecipe}
            getCategoryIcon={getCategoryIcon}
          />
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

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default App;