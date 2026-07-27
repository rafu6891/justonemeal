import { useEffect, useState } from "react";
import RecipeModal from "./components/RecipeModal";
import {getDifficultyLabel, getDifficultyColor,} from "./utils/recipeHelpers";
import RecipeCard from "./components/RecipeCard";
import Header from "./components/Header";
import Filters from "./components/Filters";


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
      <Header recipes={recipes} />


      {/* 🔹 buscador + filtros */}
      <Filters
        search={search}
        setSearch={setSearch}
        fetchRecipes={fetchRecipes}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        category={category}
        setCategory={setCategory}
        order={order}
        setOrder={setOrder}
      />
      
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