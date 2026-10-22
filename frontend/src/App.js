
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import RecipePage from "./pages/RecipePage";
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
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [difficulty, setDifficulty] = useState("");
  const [order, setOrder] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [category, setCategory] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { theme } = useTheme();

  const fetchRecipes = (page = null) => {
    let url;

    if (typeof page === "string") {
      url = page;
    } else {
      url = `${API_URL}/recipes/`;

      const params = [];

      if (page) {
        params.push(`page=${page}`);
      }

      if (search) {
        params.push(`search=${encodeURIComponent(search)}`);
        params.push(`search_type=${searchType}`);
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar las recetas");
        }
        return res.json();
      })
      .then((data) => {
        setRecipes(data.results || []);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setTotalPages(Math.ceil((data.count || 0) / PAGE_SIZE));
      })
      .catch((err) => console.error(err));
  };

  const likeRecipe = (recipeId) => {
    fetch(`${API_URL}/recipes/${recipeId}/like/`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al dar me gusta");
        }
        return res.json();
      })
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
  }, [search, searchType, difficulty, category, order]);

  const clearFilters = () => {
    setSearch("");
    setSearchType("name");
    setDifficulty("");
    setCategory("");
    setOrder("");
    setPageNumber(1);
  };

  const HomePage = () => (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: theme.gradient,
        color: theme.text,
        fontFamily: "Arial",
      }}
    >
      <TopBar onOpenMealPlan={() => setShowMealPlan(true)} />

      <Header recipes={recipes} />

      <Filters
        search={search}
        setSearch={setSearch}
        searchType={searchType}
        setSearchType={setSearchType}
        fetchRecipes={fetchRecipes}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        category={category}
        setCategory={setCategory}
        order={order}
        setOrder={setOrder}
        onClearFilters={clearFilters}
      />

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
            onOpen={() => navigate(`/receta/${recipe.id}`)}
            likeRecipe={likeRecipe}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>

      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        previousPage={previousPage}
        nextPage={nextPage}
        fetchRecipes={fetchRecipes}
        setPageNumber={setPageNumber}
      />

      {showMealPlan && (
        <MealPlanModal
          onClose={() => setShowMealPlan(false)}
          onOpenRecipe={(recipe) => {
            setShowMealPlan(false);
            navigate(`/receta/${recipe.id}`);
          }}
        />
      )}

      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/receta/:id" element={<RecipePage />} />
    </Routes>
  );
}

export default App;
