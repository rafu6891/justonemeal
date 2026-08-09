import { useEffect, useState } from "react";
import RecipeModal from "./components/RecipeModal";
import RecipeCard from "./components/RecipeCard";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import { API_URL, PAGE_SIZE } from "./config";
import { getCategoryIcon } from "./utils/recipeHelpers";
import { useTheme } from "./context/ThemeContext";
import MealPlanModal from "./components/MealPlanModal";
import TopBar from "./components/TopBar";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [order, setOrder] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [category, setCategory] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchRecipes = (page = null) => {
    let url;

    // Si recibimos una URL (nextPage o previousPage)
    if (typeof page === "string") {
      url = page;
    } else {
      // URL base
      url = `${API_URL}/recipes/`;

      const params = [];

      if (page) {
        params.push(`page=${page}`);
      }

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
        url += `?${params.join("&")}`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.results || []);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setTotalPages(Math.ceil(data.count / PAGE_SIZE));
      })
      .catch((err) => console.error(err));
  };


  const likeRecipe = (recipeId) => {
  fetch(`${API_URL}/recipes/${recipeId}/like/`, {
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

  useEffect(() => {
    fetchRecipes(1);
    setPageNumber(1);
  }, [search, difficulty, category, order]);

  const { theme, darkMode, setDarkMode } = useTheme();


  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: theme.gradient,
        color: theme.text,
        fontFamily: "Arial",
      }}
    >
      <TopBar
        onOpenMealPlan={() => setShowMealPlan(true)}
      />

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

      {/* 🔹 paginacion */}
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        previousPage={previousPage}
        nextPage={nextPage}
        fetchRecipes={fetchRecipes}
        setPageNumber={setPageNumber}
      />

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showMealPlan && (
          <MealPlanModal
              onClose={() => setShowMealPlan(false)}
          />
      )}
    </div>
  );
}

export default App;