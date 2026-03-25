import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user") || "");


  const fetchRecipes = (customToken = token) => {
    fetch("http://127.0.0.1:8000/api/recipes/", {
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
  }, [token]);

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