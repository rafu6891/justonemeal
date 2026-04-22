import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");


  const fetchRecipes = (customToken = token) => {
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

    fetch(url, {
      headers: customToken
        ? {
            Authorization: `Token ${customToken}`,
          }
        : {},
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.results || data);
      })
      .catch((err) => console.error(err));
    };  


  useEffect(() => {
    fetchRecipes();
  }, [token, search, difficulty]);

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("LOGIN RESPONSE:", data);
        setToken(data.token);
        localStorage.setItem("token", data.token);

        setUser(username);
        localStorage.setItem("user", username);

        setUsername("");
        setPassword("");

        fetchRecipes(data.token);
      })
      .catch((err) => console.error(err));
  };

  const toggleFavorite = (recipe) => {
    const url = `http://127.0.0.1:8000/api/favorites/${recipe.id}/`;

    const method = recipe.is_favorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
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

      {token ? (
        <p>👤 {user}</p>
      ) : (
        <p>❌ No logueado</p>
      )}
      {!token && (
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
        
      )}
      {token && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken("");
            setUser("");
          }}
        >
          Logout
        </button>
      )}

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

            <span
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => toggleFavorite(recipe)}
            >
              {recipe.is_favorite ? "❤️" : "🤍"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;