import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/recipes/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data.results || data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (recipe) => {
    const url = `http://127.0.0.1:8000/api/favorites/${recipe.id}/`;

    const method = recipe.is_favorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // luego añadiremos token aquí
      },
    })
      .then(() => {
        // actualizar estado local
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === recipe.id
              ? { ...r, is_favorite: !r.is_favorite }
              : r
          )
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>JustOneMeal 🍽️</h1>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          {recipe.title} - {recipe.time_minutes} min

          <span
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={() => toggleFavorite(recipe)}
          >
            {recipe.is_favorite ? "❤️" : "🤍"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;