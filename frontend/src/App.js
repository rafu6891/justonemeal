import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  


  const fetchRecipes = () => {
    let url = "http://127.0.0.1:8000/api/recipes/?";

    const params = [];

    if (search) {
      params.push(`search=${search}`);
    }

    if (difficulty) {
      params.push(`difficulty=${difficulty}`);
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
  }, [search, difficulty]);


  return (
    <div style={{ padding: "20px" }}>


      
      {/* buscador + filtro */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Buscar receta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => fetchRecipes()}>
          Buscar
        </button>

        {/*filtro de dificultad */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Todas</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
      

      <h1>JustOneMeal 🍽️</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "0.2s",
              cursor: "pointer",
            }}
          >
            <h3>{recipe.title}</h3>

            <p>
              ⏱ {recipe.time_minutes} min | 📊 {recipe.difficulty}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;